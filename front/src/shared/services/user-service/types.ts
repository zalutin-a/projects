import { Roles } from "src/shared/index";

export interface UserProfile {
  displayName?: string | null;
  photoURL?: string | null;
}

export interface AppUserProfile extends UserProfile {
  roles?: Roles[]
}
