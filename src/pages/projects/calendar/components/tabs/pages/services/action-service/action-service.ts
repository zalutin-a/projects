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
      this.updatePage,
      this.baseUrl + 'pages',
      data
    );
  }

  public checkPageFields(data: CalendarPageModel) {
    return this.http.POST(
      this.checkPageFields,
      this.baseUrl + 'pages/fields',
      data
    );
  }

  public addComment(data: commentParams) {
    return this.http.POST(
      this.addComment,
      this.baseUrl + 'pages/comments',
      data
    )
  }

  public updateComment(data: commentParams) {
    return this.http.PUT(
      this.addComment,
      this.baseUrl + 'pages/comments',
      data
    )
  }
  public deleteComment(data: commentParams<string>) {
    return this.http.DELETE(
      this.addComment,
      this.baseUrl + 'pages/comments',
      data
    )
  }
}
