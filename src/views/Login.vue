<template>
  <div>
    <div class="jumbotron">
      <h1>Login</h1>
      <div v-if="loggedIn">
        <span class="lead">Logged in as</span> {{ currentUser }}
        <button
          type="button"
          class="button btn btn-primary"
          @click="logout"
        >logout</button>
      </div>
      <div v-else>
        <input type="email" v-model="email" placeholder="email" />
        <input type="password" v-model="password" placeholder="password" />
        <button type="button" class="button btn btn-primary" @click="login">login</button>
        <hr>
        <span class="lead"><b>or</b></span>
        <hr>
        <button type="button" class="button btn btn-warning" @click="signUp">Sign Up!</button>
      </div>
    </div>
    <div class="bg-danger text-white" v-if="showError">  
      <h4 class="text-white">ERROR</h4>
      {{errMsg}}
    </div>
    <div class="bg-success text-white" v-if="showSuccess">
      <h4 class="text-white">Success!</h4>
      {{successMsg}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

import * as firebase from "firebase/app";
import "firebase/auth";

@Component
export default class Login extends Vue {

  email = "";
  password = "";
  showError = false;
  errMsg = "";
  showSuccess = false;
  successMsg = "";

  mounted() {
    const user = firebase.auth().currentUser;
    this.setUser(user);
    firebase.auth().onAuthStateChanged(user => this.setUser(user));
  }

  setUser(user: firebase.User | null): void {
    console.log("setting user to " + user);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user.email!;
    } else {
      this.loggedIn = false;
      this.currentUser = "(no user)";
    }
  }

  loggedIn = false;
  currentUser = "";

  login() {
    console.log("login clicked");
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(res => this.displaySuccess())
      .catch(error => this.displayError(error));
  }

  displaySuccess() {
    this.showError = false;
    this.showSuccess = true;
    this.successMsg = "Ois guad!";
  }

  displayError(error: any): void {
    console.log("received error: " + error);
    const errorCode = error.code;
    const errorMessage = error.message;
    this.showError = true;
    this.showSuccess = false;
    this.errMsg = errorMessage;
    console.log("error displayed: " + error);
  }

  signUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .catch(error => this.displayError(error));
     }

  logout() {
    console.log("logout clicked");
    firebase.auth().signOut();
  }
}
</script>
