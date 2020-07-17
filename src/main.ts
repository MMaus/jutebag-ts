import * as firebase from "firebase/app";
import "firebase/auth";

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'


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
  measurementId: "G-JLRRL13388"
};

// TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   // ...
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("firebase initialized");
console.log("firebase auth change feedback initiated");


Vue.config.productionTip = false

let app: Vue;



firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
