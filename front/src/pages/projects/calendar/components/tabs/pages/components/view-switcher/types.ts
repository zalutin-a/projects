export type viewMode = 'tiles' | 'list';

export type viewSwitcherProps = {
  setViewMode: (viewMode: viewMode) => void;
}
