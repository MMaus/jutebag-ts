import firebase from "firebase/app";

import { ActionContext } from "vuex";
import { JuteBagState } from "../types";
import { UserState, User } from "./types";

export default {
  async authStateChanged(
    context: ActionContext<UserState, JuteBagState>,
    user: firebase.User | null
  ): Promise<void> {
    if (user) {
      const currentUser: User = {
        username: user.displayName || "<unknown>",
        email: user.email || "<unknown email>",
        emailVerified: user.emailVerified,
      };
      context.commit("login", currentUser);
    } else {
      context.commit("logout");
    }
  },
};
