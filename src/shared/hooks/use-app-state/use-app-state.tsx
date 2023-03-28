export {}
// import { StateConfig } from "src/shared/index";
// import { useDispatch } from 'react-redux';
// import { useRef } from "react";
// import { useParams } from "react-router-dom";

// export class State {
//   private config: StateConfig[];
//   private dispatch: ReturnType<typeof useDispatch>;
//   private params: ReturnType<typeof useParams>;
//   state: {[name: string]: any} = {};

//   constructor(config: StateConfig[], dispatch: ReturnType<typeof useDispatch>, params: ReturnType<typeof useParams>) {
//     this.config = config;
//     this.dispatch = dispatch;
//     this.params = this.getParams();
//     this.initState();
//   }

//   private initState() {
//     this.config.forEach(this.stateItemCreator.bind(this))
//   }

//   private stateItemCreator(item: StateConfig){
//     this.state[item.name] = {
//       dispatch: (value: any) => this.dispatch(item.reducer(value))
//     }
//     if (item.reducer) {
//       this.dispatch(item.reducer(item.fromUrl ? this.params[item.name] ?? item.initValue : item.initValue))
//     }
//   }

//   private getParams() {
//     const params = {};
    
//     const searchParams = new URLSearchParams(new URL(window.location.href).search);
//     for (const [rawKey, rawValue] of searchParams.entries()) {
//       const keys = rawKey.split(/[\[\]]+/).filter(Boolean);
//       let currentObj = params;
  
//       const value = Number(rawValue);
//       const isNaNValue = isNaN(value);
  
//       for (let i = 0; i < keys.length; i++) {
//         const key = keys[i];
//         const isLast = i === keys.length - 1;
  
//         if (isLast) {
//           if (Array.isArray(currentObj[key])) {
//             currentObj[key].push(isNaNValue ? rawValue : value);
//           } else if (currentObj[key]) {
//             currentObj[key] = [currentObj[key], isNaNValue ? rawValue : value];
//           } else {
//             currentObj[key] = isNaNValue ? rawValue : value;
//           }
//         } else {
//           if (!currentObj[key]) {
//             if (/^\d+$/.test(keys[i + 1])) {
//               currentObj[key] = [];
//             } else {
//               currentObj[key] = {};
//             }
//           }
//           currentObj = currentObj[key];
//         }
//       }
//     }
  
//     return params;
//   }
// }


// export function useAppState(config: StateConfig[], dispatch ) {
//   // const isFirstInit = useRef(false);
//   const params = useParams();
//   const state = useRef(null)
//   if ( !state.current) {
//     state.current = new State(config, dispatch, params).state
//   }

//   return [state.current];
// }