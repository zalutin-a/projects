import { iconType } from "./types"
import { ArrowLeft, ArrowRight, CallingIcon, CrossIcon, DocumentIcon, FacebookIcon, FilterIcon, GitHubIcon, GraphIcon, InstagramIcon, LinkedinIcon, LinkIcon, Menu, ThemeDayIcon, ThemeNightIcon, UsersIcon, } from './components';

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
  get: (type: iconType) => ICON_MAP[type],
}
