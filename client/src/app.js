import App from './App.vue'
import './style.css';
import Vue from 'vue';

const local='http://localhost:3000';
const hosting='https://nameless-harbor-02268.herokuapp.com';
// debugger;
window.SERVER=hosting;
window.TOKEN=localStorage.getItem('token');
window.headers={
    'Content-Type':'application/json',
    'token':TOKEN
};

window.app=new Vue({
  el: '#app',
  render: h => h(App),
});