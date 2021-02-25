import firebase from "firebase/app";
import "firebase/auth";

import { Component, createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "@/store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { importState } from "./store/shopping/importer";

//  TODO: checkout axios (npm install axios --save)
// import axios from 'axios'
// Vue.prototype.$axios = axios
//

const firebaseConfig = {
  apiKey: "AIzaSyCjjVJikqJ1KwGPuOm8NOdZPt5ICrtCyg8",
  authDomain: "jutebag.firebaseapp.com",
  databaseURL: "https://jutebag.firebaseio.com",
  projectId: "jutebag",
  storageBucket: "jutebag.appspot.com",
  messagingSenderId: "595630917273",
  appId: "1:595630917273:web:b1d564c3efbc0461655a08",
  measurementId: "G-JLRRL13388",
};

// TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   // ...
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("firebase initialized");

let app: Component;

const categories = importState();
categories.forEach((cat) => {
  store.commit("shopping/createCategory", cat.catName);
  console.log(`Category ${cat.catName} has ${cat.items.length} items`);
  cat.items.forEach((it) =>
    store.commit("shopping/addByCategoryName", {
      category: cat.catName,
      item: it,
    })
  );
});

firebase.auth().onAuthStateChanged(() => {
  console.log("AUTH CHANGE RECEIVED");
  if (!app) {
    // NOTE: VS code gives an error here, but npm run build / serve does not give an error. I
    app = createApp(App)
      .use(router)
      .use(store)
      .mount("#app");
  }
});
