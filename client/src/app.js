import App from './App.vue'
import './style.css';
import Vue from 'vue';

window.SERVER='http://localhost:3000';
window.TOKEN=localStorage.getItem('token');
window.headers={
    'Content-Type':'application/json',
    'token':TOKEN
};

window.app=new Vue({
  el: '#app',
  render: h => h(App),
});