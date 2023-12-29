import { ActionServiceBase, API_URL, CalendarCategory, CalendarCategoryModel, CalendarPromtModel, FetchCalback, setFunction } from "src/shared/index";

export class ActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFunction<boolean>) {
    super(setIsLoading);
    console.log('Actionservice constructor')
  }

  public updatePrompt(data: CalendarPromtModel, callbacks: FetchCalback) {
    this.http.PATCH(
      this.baseUrl + 'prompts',
      data,
      callbacks
    );
  }

  public addPrompt(data: Partial<CalendarPromtModel>, callbacks: FetchCalback) {
    this.http.POST(
      this.baseUrl + 'prompts',
      data,
      callbacks
    );
  }

  public deletePromt(data: {id: string}, callbacks: FetchCalback) {
    this.http.DELETE(
      this.baseUrl + 'prompts',
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