import { IdName } from "src/shared/index";

export type CalendarCategory = number;
// {
//   general,
//   winter,
//   fall,
//   spring,
//   summer,
//   weekend_day,
//   work_day,
//   work,
//   home,
//   outdoor,
//   food,
//   sport,
//   style,
//   relax,
//   family,
//   friends,
//   animal,
//   entertainment,
//   thought,
//   travel,
//   christmas,
//   art,
//   education,
//   music,
//   film,
//   hobby,
//   you,
//   tech,
//   health,
//   self_care,
//   money,
//   empowering_question,
//   affirmation,
// }

export interface CalendarCategoryModel extends IdName<CalendarCategory, string> {
}