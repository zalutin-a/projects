export type tableActionType = 'edit' | 'comment' | 'delete';

export type tableActionsCallback = (type: tableActionType) => void;

export type tableActionsProps = {
  actions: tableActionType[];
  onAction: tableActionsCallback;
}
