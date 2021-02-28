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

/// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("firebase initialized");

const categories = importState();
categories.forEach((cat) => {
  store.commit("shopping/createCategory", cat.catName);
  console.log(`Category ${cat.catName} has ${cat.items.length} items`);
  cat.items.forEach((it) =>
    store.commit("shopping/addItem", {
      itemName: it.itemName,
      quantity: it.quantity,
      categoryName: cat.catName,
    })
  );
});

firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
  store.dispatch("user/authStateChanged", user);
});

const app = createApp(App)
  .use(router)
  .use(store);

app.mount("#app");
