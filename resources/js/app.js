import Vue from "vue";
import Board from "./Board";
import './bootstrap';
import apolloProvider from "./apollo.config";

window.Vue = Vue;

Vue.component('Board', Board);

const app = new Vue({
    el: '#app',
    apolloProvider
});
