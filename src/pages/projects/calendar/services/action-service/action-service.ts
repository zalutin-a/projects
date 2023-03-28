import { ActionServiceBase, API_URL, CalendarCategory, CalendarPromtModel, FetchCalback, setFunction } from "src/shared/index";

export class ActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFunction<boolean>) {
    super(setIsLoading);
    console.log(this)
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
}