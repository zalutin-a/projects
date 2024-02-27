import { SetStateAction, Dispatch } from "react";

export type setFunction<D> = Dispatch<SetStateAction<D>> ;
