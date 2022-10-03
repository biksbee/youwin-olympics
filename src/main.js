import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from "vue-i18n";
import messages from "./i18n";

Vue.use(VueI18n);
Vue.config.productionTip = false;

// Create VueI18n instance with options
const i18n = new VueI18n({
  // TODO: Always change language to "tr" before deployment.
  locale: window.myUtilities.getDomainLang(),
  // locale: "en", // set locale
  messages // set locale messages
});

window.runOlympics2022 = () => {
  window.$olympics2022VueApp = new Vue({
    store,
    i18n,
    router,
    beforeCreate() {
      this.$store.dispatch("setOlympics2022Settings");
    },
    render: h => h(App)
  });

  store.dispatch("setOlympics2022Settings");
  window.$olympics2022VueApp.$mount("#olympics-2022");

  // if (window.olympics2022Settings.playerId == null || window.olympics2022Settings.firstTime) {
  //   router.replace("/welcome");
  // } else {
  //   router.replace("/lobby").catch(()=>{});
  // }

  if (window.dataLayer) {
    dataLayer.push({
      'event': 'olympics-2022-event',
      'olympics-2022-action': (window.olympics2022Settings.playerId == null) ? 'show-logged-out' : 'show-logged-in'
    });
  }
};

// redirect to the homepage called from the outside of the app
// window.refreshOlympics2022 = () => {
//   if (router.currentRoute && router.currentRoute.path !== "/") {
//     router.push("/");
//   }
// };

window.runOlympics2022();
