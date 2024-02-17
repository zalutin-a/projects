import { ActionServiceBase, API_URL, CalendarStatementModel,  setFetchLoading } from "src/shared/index";

export class StatementsActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading) {
    super(setIsLoading);
    console.log('Actionservice constructor')
  }

  public updateStatement(data: CalendarStatementModel) {
    return this.http.PATCH(
      this.updateStatement,
      this.baseUrl + 'statements',
      data
    );
  }

  public addStatement(data: Partial<CalendarStatementModel>) {
    return this.http.POST(
      this.addStatement,
      this.baseUrl + 'statements',
      data
    );
  }

  public deleteStatement(data: {id: string, user: string}) {
    return this.http.DELETE(
      this.deleteStatement,
      this.baseUrl + 'statements',
      data
    );
  }
}
