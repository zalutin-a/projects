import { ActionServiceBase, API_URL, CalendarCategoryModel, CalendarStatementModel,  redirectFunction,  setFetchLoading } from "src/shared/index";

export class CategoriesActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading, redirect: redirectFunction) {
    super(setIsLoading, redirect);
    console.log('Actionservice constructor')
  }

  public updateCategory(body: CalendarCategoryModel) {
    return this.executeAction('PATCH', this.updateCategory, 'categories', body)
  }

  public addCategory(body: Partial<CalendarCategoryModel>) {
    return this.executeAction('POST', this.addCategory, 'categories', body)
  }

  public deleteCategory(body: {id: string}) {
    return this.executeAction('DELETE', this.deleteCategory, 'categories', body)
  }
}
