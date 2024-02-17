import { ActionServiceBase, API_URL, CalendarPageModel, setFetchLoading } from "src/shared/index";
import { commentParams } from "./types";

export class PagesActionService extends ActionServiceBase{
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading: setFetchLoading) {
    super(setIsLoading);
    console.log('Actionservice constructor')
  }

  public updatePage(data: CalendarPageModel) {
    return this.http.PATCH(
      this.getChangeLoadingStateFunction(this.updatePage),
      this.baseUrl + 'pages',
      data
    );
  }

  public checkPageFields(data: CalendarPageModel) {
    return this.http.POST(
      this.getChangeLoadingStateFunction(this.checkPageFields),
      this.baseUrl + 'pages/fields',
      data
    );
  }

  public addComment(data: commentParams) {
    return this.http.POST(
      this.getChangeLoadingStateFunction(this.addComment),
      this.baseUrl + 'pages/comments',
      data
    )
  }

  public updateComment(data: commentParams) {
    return this.http.PUT(
      this.getChangeLoadingStateFunction(this.updateComment),
      this.baseUrl + 'pages/comments',
      data
    )
  }
  public deleteComment(data: commentParams<string>) {
    return this.http.DELETE(
      this.getChangeLoadingStateFunction(this.deleteComment),
      this.baseUrl + 'pages/comments',
      data
    )
  }
}
