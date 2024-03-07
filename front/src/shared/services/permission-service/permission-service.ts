import { API_URL } from "src/shared/index";
import { getHTTPService } from "../index";
import { PermissionsEnum } from "src/shared/types/permissions";

export class PermissionService {
  private permissions: PermissionsEnum[] = [];

  constructor() {
  }

  async setPermissions(getIdToken: Promise<string> | null) {
    if(!getIdToken) {
      this.permissions = [];
      return true
    }
    const token = await getIdToken;
    this.permissions = await this.getPermissions(token) || [];
    return true
  }

  hasPermission(permissions: PermissionsEnum[]) {
    return permissions.every(permission => this.permissions.includes(permission));
  }

  private getPermissions(id: string) {
    return getHTTPService().GET(() => {}, API_URL + "authentication/permissions", `tId=${id}`)
  }
}
