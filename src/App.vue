<template>
  <div id="mainapp">
    <div id="title" class="bg-dark text-light p-1">
      <h2><img src="favicon.png" height="30em" />JuteBag.IO</h2>
      <h3>Your Shopping Bag</h3>
    </div>
    <div
      id="nav"
      class="navbar m-0 navbar-expand-sm navbar-dark bg-secondary mb-1 pb-1 sticky-top"
    >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Menu
        <span class="navbar-toggler-icon text-right"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <router-link
          to="/"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          >Home</router-link
        >
        <router-link
          to="about"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          >About</router-link
        >
        <router-link
          to="login"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          >Account</router-link
        >
        <router-link
          to="todo"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          >Todo List</router-link
        >
        <router-link
          to="shoppinglist"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          >Go Shopping!</router-link
        >
      </div>
      <div class="boxed bg-success text-white lead p-2" v-if="loggedIn">
        Signed In
      </div>
      <div class="boxed bg-warning text-white lead p-2" v-if="loggedOut">
        Not logged in
      </div>
      <div
        class="boxed bg-warning text-white lead p-2"
        v-if="verificationRequired"
      >
        verify email!
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

// // // Add the Firebase products that you want to use
import "firebase/auth";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

function loginComplete(user) {
  console.log("=== User: ===" + user);
  if (user) {
    if (user.emailVerified) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  created: function() {
    firebase.auth().onAuthStateChanged((user) => this.toggleSignIn(user));
  },

  data: function() {
    return {
      loggedIn: loginComplete(firebase.auth().currentUser),
      verificationRequired: false,
      loggedOut: true,
    };
  },

  methods: {
    toggleSignIn(user) {
      console.log("user changed to " + user);
      this.loggedIn = loginComplete(user);
      if (user) {
        this.verificationRequired = !user.emailVerified;
        this.loggedOut = false;
      } else {
        this.verificationRequired = false;
        this.loggedOut = true;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
