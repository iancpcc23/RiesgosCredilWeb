import { DataState } from "./data-state.enum";

export interface AppState <T> {
  state?: DataState
  data?: T
}
