// export type permissionName = "projects" 
//   | "calendar"
//   //admin
//   | "admin"
//   | "addRole"
//   //statements
//   | "statements"
//   | "addStatement"
//   | "editStatement"
//   | "deleteStatement"
//   | "commentStatement"
//   //pages
//   | "pages"
//   | "addPage"
//   | "editPage"
//   | "deletePage"
//   | "commentPage"
//   //categories
//   | "categories"
//   | "addCategory"
//   | "editCategory"
//   | "deleteCategory"
//   | "commentCategory"

// export type Permissions = {
//   [name in permissionName]: number
// }

export enum PermissionsEnum {
  "projects" = 1000,
  "calendar",
  //admin
  "admin" = 1200,
  "addRole",
  //statements
  "statements" = 1300,
  "addStatement",
  "editStatement",
  "deleteStatement",
  "commentStatement",
  //pages
  "pages" = 1400,
  "addPage",
  "editPage",
  "deletePage",
  "commentPage",
  //categories
  "categories" = 1500,
  "addCategory",
  "editCategory",
  "deleteCategory",
  "commentCategory",
}