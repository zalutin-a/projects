import { UserService } from "./user-service";

function initUserService() {
  const userService = new UserService();

  return () => userService;
}

export const getUserService = initUserService();
