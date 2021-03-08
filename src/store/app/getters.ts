import { AppState } from "./types";

export default {
  lastConsent(state: AppState): Date | null {
    return state.lastConsent;
  },
  isConsentValid(state: AppState): boolean {
    if (state.lastConsent == null) {
      return false;
    }
    const dT = Date.now() - state.lastConsent.getTime();
    return dT < 10 * 1000; // consent every 60 seconds :P
    // return dT < 3600 * 1000 * 24 * 30; // consent every 30 days
  },
};
