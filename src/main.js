import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from "axios";

let url = "http://127.0.0.1:3000"; // 장고 서버 주소

axios.get(url)
.then(function(response){
  console.log('성공');
  console.log(response);
})
.catch(function(response){
  console.log('실패');
  console.log(response);
})
Vue.config.productionTip = false
export const eventBus = new Vue()
new Vue({
  vuetify,
  render: h => h(App)
  
}).$mount('#app')
