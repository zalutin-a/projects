import { NavigationItemType, getUserService } from "src/shared"

export const getNavigationConfig = (config: NavigationItemType[]) => {
  const userService = getUserService()
  return config.reduce<NavigationItemType[]>((allowedItems,item) => {
    if(!item.neededPermisions) {
      allowedItems.push(item)
      return allowedItems
    }

    if(!item.children) {
      if(userService.hasPermission(item.neededPermisions)) {
        allowedItems.push(item)
      }
      return allowedItems
    } 

    allowedItems.push({...item, children: getNavigationConfig(item.children)})

    return allowedItems;
  }, [])
}
