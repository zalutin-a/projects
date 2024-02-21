import { firebaseApp } from "src/firebase";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User } from "firebase/auth";
import { API_URL, AppUserProfile, BehaviorEmitter, Emitter, getHTTPService, PermissionService, UserShort } from "src/shared/index";

export class UserService {
  user: User = null;
  userShort: UserShort = null;
  updatingState: 'pending' | 'done';
  private permissionService: PermissionService;
  private userEmmiter = new Emitter<User>();
  private changingState = new BehaviorEmitter<'pending' | 'done'>('pending');

  constructor() {
    this.changingState.subscribe((state) => this.updatingState = state);
    this.permissionService = new PermissionService()
    //TODO: think about better way to handle initial user setup
    const initialAuthStateUnsubscribe = onAuthStateChanged(getAuth(firebaseApp), async (user: User) => {
      if(user) {
        await this.setUser(user)
        this.changingState.emitValue('done')
      }
      initialAuthStateUnsubscribe();
    })
    onAuthStateChanged(getAuth(firebaseApp), async (user: User) => {
      if(!user) {
        await this.setUser(null)
        this.changingState.emitValue('done')
      }
    })
  }

  hasPermission(permission: string) {
    return this.permissionService.hasPermission(permission);
  }

  async setUser(user: User | null, isNewUser = false) {
    // this.user = user;
    // if (user) {
    //   let [userShort] = await Promise.all([
    //     this.getUser(user.uid),
    //     this.permissionService.setPermissions(user.getIdToken()),
    //   ]);
    //   if(!userShort) {
    //     userShort = await this.addNewUser({
    //       name: user.displayName,
    //       id: user.uid,
    //       roles: [],
    //     });
    //     await this.permissionService.setPermissions(user.getIdToken())
    //   }
    //   this.userShort = userShort
    //   this.userEmmiter.emitValue(this.user)
    // } else {
    //   this.userShort = null;
    //   this.permissionService.setPermissions(null);
    //   this.userEmmiter.emitValue(this.user);
    // }
    this.user = user;
    if (this.user) {
      if(isNewUser) {
        this.userShort = await this.addNewUser({
            name: this.user.displayName,
            id: this.user.uid,
            roles: [],
            isRegistrationDone: false,
          });
        await this.permissionService.setPermissions(this.user.getIdToken());
      } else {
       [this.userShort] = await Promise.all([
          this.getUser(this.user.uid),
          this.permissionService.setPermissions(this.user.getIdToken()),
        ]);
      }
      this.userEmmiter.emitValue(this.user)
    } else {
      this.userShort = null;
      this.permissionService.setPermissions(null);
      this.userEmmiter.emitValue(this.user);
    }
  }


  async getUserPhoto(id?: string) {
    // if(id) {
    //   // return getHTTPService().GET()
    // }
    // return this.user?.photoURL ?? "url to default photo"
  }

  private getUser(id) {
    return getHTTPService().GET(() => {}, API_URL + "authentication/user", `userID=${id}`)
  }

  private addNewUser(user: UserShort) {
    return getHTTPService().POST(() => {}, API_URL + "authentication/user", { user })
  }

  private updateUser(user: UserShort) {
    return getHTTPService().PUT(() => {}, API_URL + "authentication/user", { user })
  }

  onUserChanged(calback: (value: User) => void) {
    return this.userEmmiter.subscribe(calback);
  }

  onChangingState(calback: (state: 'pending' | 'done') => void) {
    return this.changingState.subscribe(calback);
  }

  signOut() {
    this.changingState.emitValue('pending')
    return signOut(getAuth())
  }

  async signUpWithPassword(email: string, password: string) {
    return this.doAction(async () => {
      const credential = await createUserWithEmailAndPassword(getAuth(), email, password)
      await this.setUser(credential.user, true);
      return credential
    })
  }

  async signInWithPassword(email: string, password: string) {
    return this.doAction(async () => {
      const credential = await signInWithEmailAndPassword(getAuth(), email, password)
      await this.setUser(credential.user);
      return credential
    })
  }

  signInWithProvider(provider: any) {
    console.log('signInWithProvider is not implemented')
  }

  async updateProfile(data: AppUserProfile) {
    return this.doAction(async () => {
      await updateProfile(getAuth().currentUser, data)
      this.userShort = await this.updateUser({
        name: data.displayName,
        id: this.user.uid,
        roles: data.roles,
        isRegistrationDone: true,
      })
      await this.permissionService.setPermissions(this.user.getIdToken()) //TODO: to delete ?
      this.userEmmiter.emitValue(this.user);
    })
  }

  async doAction(action: () => Promise<any>) {
    this.changingState.emitValue('pending')
    return action().catch(error => {
      console.log(error) //TODO: delete after testing
      throw error //TODO:throw only user input errors
    }).finally(() => {
      this.changingState.emitValue('done')
    })
  }
}
