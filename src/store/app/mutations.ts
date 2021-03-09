import { MutationTree } from "vuex";
import { AppState } from "./types";

function setConsentNow(state: AppState): void {
  state.lastConsent = Date.now();
  console.log("consent set!");
}

export default {
  setConsentNow,
} as MutationTree<AppState>;
