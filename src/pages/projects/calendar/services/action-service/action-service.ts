import { ActionServiceBase, API_URL, CalendarCategoryModel, CalendarStatementModel, FetchCalback, setFunction } from "src/shared/index";

export class ActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFunction<boolean>) {
    super(setIsLoading);
    console.log('Actionservice constructor')
  }

  public updateStatement(data: CalendarStatementModel, callbacks: FetchCalback) {
    this.http.PATCH(
      this.baseUrl + 'statements',
      data,
      callbacks
    );
  }

  public addStatement(data: Partial<CalendarStatementModel>, callbacks: FetchCalback) {
    this.http.POST(
      this.baseUrl + 'statements',
      data,
      callbacks
    );
  }

  public deleteStatement(data: {id: string}, callbacks: FetchCalback) {
    this.http.DELETE(
      this.baseUrl + 'statements',
      data,
      callbacks
    );
  }

  public updateCategory(data: CalendarCategoryModel, callbacks: FetchCalback) {
    this.http.PATCH(
      this.baseUrl + 'categories',
      data,
      callbacks
    );
  }

  public addCategory(data: Partial<CalendarCategoryModel>, callbacks: FetchCalback) {
    this.http.POST(
      this.baseUrl + 'categories',
      data,
      callbacks
    );
  }

  public deleteCategory(data: {id: string}, callbacks: FetchCalback) {
    this.http.DELETE(
      this.baseUrl + 'categories',
      data,
      callbacks
    );
  }
}