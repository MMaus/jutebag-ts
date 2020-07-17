<template>
  <div id="app">
    <div id="title" class="bg-dark text-light p-3">
      <h2><img src="favicon.png" height="30em">JuteBag.IO</h2>
      <h3>Your Shopping Bag</h3>
    </div>
    <div id="nav" class="navbar mt-0 navbar-expand-sm navbar-dark bg-secondary sticky-top">
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
        >Home</router-link>
        <router-link
          to="about"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >About</router-link>
        <router-link
          to="login"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >Account</router-link>
        <router-link
          to="shoppinglist"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >Go Shopping!</router-link>
      </div>
      <div class="boxed bg-success text-white lead p-2" v-if="loggedIn">Signed In</div>
      <div class="boxed bg-warning text-white lead p-2" v-else>Not logged in</div>
    </div>
    <router-view />
  </div>
</template>

<script>
import * as firebase from "firebase/app";

// // // Add the Firebase products that you want to use
import "firebase/auth";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// import "firebase/firestore";

// const firebase = require('firebase');

// const firebaseui = require('firebaseui');

// const firebaseConfig = {
//   apiKey: "AIzaSyCjjVJikqJ1KwGPuOm8NOdZPt5ICrtCyg8",
//   authDomain: "jutebag.firebaseapp.com",
//   databaseURL: "https://jutebag.firebaseio.com",
//   projectId: "jutebag",
//   storageBucket: "jutebag.appspot.com",
//   messagingSenderId: "595630917273",
//   appId: "1:595630917273:web:b1d564c3efbc0461655a08",
//   measurementId: "G-JLRRL13388"
// };

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   // ...
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// firebase.initializeApp()

// const actionCodeSettings = {
//   // URL you want to redirect back to. The domain (www.example.com) for this
//   // URL must be whitelisted in the Firebase Console.
//   url: 'https://jutebag.web.app/#/about',
//   handleCodeInApp: false,

// }

// const ui = new firebaseui.auth.AuthUI(firebase.auth());
// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
// });

function isSignedIn(user) {
  console.log("=== YEAH ===")
  console.log("=== User: ===" + user)
  if (user) {
    return true;
  }
  return false;
}

export default {
  created: function() {
    firebase
      .auth()
      .onAuthStateChanged(user => this.toggleSignIn(user));
  },

  methods : {
    toggleSignIn(user) {
      console.log("user changed to " + user);
      this.loggedIn = isSignedIn(user);
    }
  },

  data: function() {
    return {
      loggedIn: isSignedIn(firebase.auth().currentUser)
    };
  }
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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
