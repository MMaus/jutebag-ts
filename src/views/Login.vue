<template>
  <div>
    <div class="jumbotron">
      <h1>Login</h1>
      <div v-if="loggedIn">
        <span class="lead">Logged in as</span>
        {{ currentUser }}
        <button type="button" class="button btn btn-primary" @click="logout">
          logout
        </button>
        <button
          v-if="!userVerified"
          type="button"
          class="button btn btn-warning"
          @click="sendVerification"
        >
          Verify Email!
        </button>
      </div>
      <div v-else>
        <input type="email" v-model="email" placeholder="email" />
        <input type="password" v-model="password" placeholder="password" />
        <button type="button" class="button btn btn-primary" @click="login">
          login
        </button>
        <hr />
        <span class="lead">
          <b>or</b>
        </span>
        <hr />
        <button type="button" class="button btn btn-warning" @click="signUp">
          Sign Up!
        </button>
      </div>
    </div>
    <div class="bg-danger text-white" v-if="showError">
      <h4 class="text-white">ERROR</h4>
      {{ errMsg }}
    </div>
    <div class="bg-success text-white" v-if="showSuccess">
      <h4 class="text-white">Success!</h4>
      {{ successMsg }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

import * as firebase from "firebase/app";
import "firebase/auth";
import { defineComponent, ref, onMounted } from "vue";

// @Component
// export default class Login extends Vue {

// export default defineComponent({
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const showError = ref(false);
    const errMsg = ref("");
    const showSuccess = ref(false);
    const successMsg = ref("");
    const userVerified = ref(false);
    const loggedIn = ref(false);
    const currentUser = ref("");

    const setUser = function(user: firebase.User | null): void {
      console.log("setting user to " + user);
      if (user) {
        loggedIn.value = true;
        currentUser.value = user.email!;
        userVerified.value = user.emailVerified;
      } else {
        loggedIn.value = false;
        currentUser.value = "(no user)";
        userVerified.value = false;
      }
    };

    onMounted(function() {
      console.log("login page loaded");
      firebase.auth().onAuthStateChanged(setUser);
    });

    const displaySuccess = function() {
      showError.value = false;
      showSuccess.value = true;
      successMsg.value = "Ois guad!";
    };

    const displayError = function(error: any): void {
      console.log("received error: " + error);
      const errorCode = error.code;
      const errorMessage = error.message;
      showError.value = true;
      showSuccess.value = false;
      errMsg.value = errorMessage;
      console.log("error displayed: " + error);
    };

    const login = function() {
      console.log("login clicked");
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((res) => displaySuccess())
        .catch((error) => displayError(error));
    };

    const signUp = function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((u) => displaySuccess())
        .catch((error) => displayError(error));
    };

    const sendVerification = function() {
      firebase
        .auth()
        .currentUser?.sendEmailVerification()
        .then(function() {
          alert("Email Verification Sent!");
        });
    };

    const logout = function() {
      console.log("logout clicked");
      firebase.auth().signOut();
    };

    return {
      email,
      password,
      showError,
      errMsg,
      showSuccess,
      successMsg,
      userVerified,
      loggedIn,
      currentUser,
      signUp,
      login,
      logout,
      sendVerification,
      displayError,
      displaySuccess,
    };
  },

  components: {
    // add stuff here like ShoppingList if it was imported like import ShoppingList from "./ShoppingList.vue"
  },
};
</script>
