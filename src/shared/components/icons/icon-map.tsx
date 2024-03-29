import { iconType } from "./types"
import { ArrowDown, ArrowLeft, ArrowRight, CallingIcon, CheckIcon, CrossIcon, DocumentIcon, EditIcon,
  ErrorIcon, FacebookIcon, FilterIcon, GitHubIcon, GraphIcon, InfoIcon, InstagramIcon, LinkedinIcon,
  LinkIcon, ListIcon, Menu, SelectAction, SuccessIcon, ThemeDayIcon, ThemeNightIcon, TilesIcon, UsersIcon,
  WarningIcon, DeleteIcon} from './components';

export const ICON_MAP = {
  filter: <FilterIcon></FilterIcon>,
  calling: <CallingIcon></CallingIcon>,
  document: <DocumentIcon></DocumentIcon>,
  graph: <GraphIcon></GraphIcon>,
  users: <UsersIcon></UsersIcon>,
  themeNight: <ThemeNightIcon></ThemeNightIcon>,
  themeDay: <ThemeDayIcon></ThemeDayIcon>,
  gitHub: <GitHubIcon></GitHubIcon>,
  link: <LinkIcon></LinkIcon>,
  arrowLeft: <ArrowLeft></ArrowLeft>,
  arrowRight: <ArrowRight></ArrowRight>,
  menu: <Menu></Menu>,
  cross: <CrossIcon></CrossIcon>,
  instagram: <InstagramIcon></InstagramIcon>,
  facebook: <FacebookIcon></FacebookIcon>,
  linkedin: <LinkedinIcon></LinkedinIcon>,
  edit: <EditIcon></EditIcon>,
  arrowDown: <ArrowDown></ArrowDown>,
  tiles: <TilesIcon></TilesIcon>,
  list: <ListIcon></ListIcon>,
  check: <CheckIcon></CheckIcon>,
  error: <ErrorIcon></ErrorIcon>,
  success: <SuccessIcon></SuccessIcon>,
  warning: <WarningIcon></WarningIcon>,
  info: <InfoIcon></InfoIcon>,
  selectAction: <SelectAction></SelectAction>,
  delete: <DeleteIcon></DeleteIcon>,
  get: (type: iconType) => ICON_MAP[type],
}
