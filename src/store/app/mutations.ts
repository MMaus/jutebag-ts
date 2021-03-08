import { MutationTree } from "vuex";
import { AppState } from "./types";

function setConsentNow(state: AppState): void {
  state.lastConsent = new Date();
}

export default {
  setConsentNow,
} as MutationTree<AppState>;
