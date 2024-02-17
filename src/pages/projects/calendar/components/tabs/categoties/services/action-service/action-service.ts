import { ActionServiceBase, API_URL, CalendarCategoryModel, CalendarStatementModel,  setFetchLoading } from "src/shared/index";

export class CategoriesActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading) {
    super(setIsLoading);
    console.log('Actionservice constructor')
  }

  public updateCategory(data: CalendarCategoryModel) {
    return this.http.PATCH(
      this.getChangeLoadingStateFunction(this.updateCategory),
      this.baseUrl + 'categories',
      data
    );
  }

  public addCategory(data: Partial<CalendarCategoryModel>) {
    return this.http.POST(
      this.getChangeLoadingStateFunction(this.addCategory),
      this.baseUrl + 'categories',
      data
    );
  }

  public deleteCategory(data: {id: string}) {
    return this.http.DELETE(
      this.getChangeLoadingStateFunction(this.deleteCategory),
      this.baseUrl + 'categories',
      data
    );
  }
}
