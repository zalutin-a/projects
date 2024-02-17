import { ActionServiceBase, API_URL, CalendarPageModel, redirectFunction, setFetchLoading } from "src/shared/index";
import { commentParams } from "./types";

export class PagesActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading, redirect: redirectFunction) {
    super(setIsLoading, redirect);
    console.log('Actionservice constructor')
  }

  public updatePage(body: CalendarPageModel) {
    return this.executeAction('PATCH', this.updatePage, 'pages', body)
  }

  public checkPageFields(body: CalendarPageModel) {
    return this.executeAction('POST', this.checkPageFields, 'pages/fields', body)
  }

  public addComment(body: commentParams) {
    return this.executeAction('POST', this.addComment, 'pages/comments', body)
  }

  public updateComment(body: commentParams) {
    return this.executeAction('PUT', this.updateComment, 'pages/comments', body)
  }
  public deleteComment(body: commentParams<string>) {
    return this.executeAction('PUT', this.deleteComment, 'pages/comments', body)
  }
}
