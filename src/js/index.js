import Vue from "vue";
import App from "../app.vue";
import '../css/global.styl';



const root = document.createElement("div");
//const root = document.getElementById("#app");
document.body.appendChild(root);


new Vue({
    render: function (h) {
      return h(App)
    }
}).$mount(root);

