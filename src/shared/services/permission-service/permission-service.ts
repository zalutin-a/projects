import { API_URL } from "src/shared/index";
import { getHTTPService } from "../index";

export class PermissionService {
  private permissions: string[] = [];

  constructor() {
  }

  async setPermissions(getIdToken: Promise<string> | null) {
    if(!getIdToken) {
      this.permissions = null;
      return true
    }
    const token = await getIdToken;
    this.permissions = await this.getPermissions(token);
    return true
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  private getPermissions(id: string) {
    return getHTTPService().GET(() => {}, API_URL + "authentication/permissions", `tId=${id}`)
  }
}
