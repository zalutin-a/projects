import { ActionServiceBase, API_URL, CalendarStatementModel,  redirectFunction,  setFetchLoading } from "src/shared/index";

export class StatementsActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading, redirect: redirectFunction) {
    super(setIsLoading, redirect);
    console.log('Actionservice constructor')
  }

  public updateStatement(body: CalendarStatementModel) {
    return this.executeAction('PATCH', this.updateStatement, 'statements', body)
  }

  public addStatement(body: Partial<CalendarStatementModel>) {
    return this.executeAction('POST', this.addStatement, 'statements', body)
  }

  public deleteStatement(body: {id: string, user: string}) {
    return this.executeAction('DELETE', this.deleteStatement, 'statements', body)
  }
}
