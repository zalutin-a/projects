import { MONTHS_MAP } from "../index";

export type months = typeof MONTHS_MAP[keyof typeof MONTHS_MAP];
