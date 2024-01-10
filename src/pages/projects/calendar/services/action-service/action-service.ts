import { ActionServiceBase, API_URL, CalendarCategoryModel, CalendarStatementModel, FetchCalback, setFetchLoading } from "src/shared/index";

export class ActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading) {
    super(setIsLoading);
    console.log('Actionservice constructor')
  }

  public updateStatement(data: CalendarStatementModel, callbacks: FetchCalback) {
    this.http.PATCH(
      this.updateStatement,
      this.baseUrl + 'statements',
      data,
      callbacks
    );
  }

  public addStatement(data: Partial<CalendarStatementModel>, callbacks: FetchCalback) {
    this.http.POST(
      this.addStatement,
      this.baseUrl + 'statements',
      data,
      callbacks
    );
  }

  public deleteStatement(data: {id: string}, callbacks: FetchCalback) {
    this.http.DELETE(
      this.deleteStatement,
      this.baseUrl + 'statements',
      data,
      callbacks
    );
  }

  public updateCategory(data: CalendarCategoryModel, callbacks: FetchCalback) {
    this.http.PATCH(
      this.updateCategory,
      this.baseUrl + 'categories',
      data,
      callbacks
    );
  }

  public addCategory(data: Partial<CalendarCategoryModel>, callbacks: FetchCalback) {
    this.http.POST(
      this.addCategory,
      this.baseUrl + 'categories',
      data,
      callbacks
    );
  }

  public deleteCategory(data: {id: string}, callbacks: FetchCalback) {
    this.http.DELETE(
      this.deleteCategory,
      this.baseUrl + 'categories',
      data,
      callbacks
    );
  }
}