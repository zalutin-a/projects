import { API_URL, CalendarCategory, DataServiceBase, setFetchLoading } from "src/shared/index";

export class PagesDataService extends DataServiceBase {
  baseUrl = API_URL + 'calendar/';

  constructor(setIsLoading?: setFetchLoading) {
    super(setIsLoading)
    console.log('dataservice-constructor ');
  }

  public getStatements(category: CalendarCategory) {
    const params = new URLSearchParams({category: category.toString()})
    return this.getData(this.getStatements, 'statements', params.toString());
  }
}
