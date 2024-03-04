export type actionFunction = () => void;

export type actionsListProps = {
  onEdit?: actionFunction;
  onDelete?: actionFunction;
}
