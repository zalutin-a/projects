import { ActionServiceBase, API_URL, CalendarPageModel, FetchCalback, setFetchLoading } from "src/shared/index";

export class PagesActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading) {
    super(setIsLoading);
    console.log('Actionservice constructor')
  }

  public updatePage(data: CalendarPageModel, callbacks: FetchCalback) {
    this.http.PATCH(
      this.updatePage,
      this.baseUrl + 'pages',
      data,
      callbacks
    );
  }

  public checkPageFields(data: CalendarPageModel, callbacks: FetchCalback) {
    this.http.POST(
      this.checkPageFields,
      this.baseUrl + 'pages/fields',
      data,
      callbacks
    );
  }
}