import { ActionServiceBase, API_URL, CalendarCategory, CalendarCategoryModel, CalendarPageModel, CalendarStatementModel, FetchCalback, setFunction } from "src/shared/index";

export class PagesActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFunction<boolean>) {
    super(setIsLoading);
    console.log('Actionservice constructor')
  }

  public updatePage(data: CalendarPageModel, callbacks: FetchCalback) {
    this.http.PATCH(
      this.baseUrl + 'pages',
      data,
      callbacks
    );
  }

  public checkPageFields(data: CalendarPageModel, callbacks: FetchCalback) {
    this.http.POST(
      this.baseUrl + 'pages/fields',
      data,
      callbacks
    );
  }
}