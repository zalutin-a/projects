export interface StoreConfigItem {
  initValue: () => any;
  validator?: (value: any, state) => boolean;
  transform?: (value: any, state) => any;
}
