import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Revealed from "../views/Revealed.vue";
import PreviousGifts from "../views/PreviousGifts.vue";
import Guest from "../views/Guest.vue";
import HowItWorks from "../views/HowItWorks.vue";
import Lobby from "../views/Lobby.vue";
import DailyMinigame from "../views/DailyMinigame.vue";
import EndOfCampaign from "../views/EndOfCampaign.vue";
import BeforeTheCampaign from "../views/BeforeTheCampaign.vue";
import Test from "../views/Test.vue";
import Editer from "../views/Editer.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/test",
    name: "test",
    component: Test
  },
  {
    path: "/editer",
    name: "editer",
    component: Editer
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/how-it-works",
    name: "howItWorks",
    component: HowItWorks
  },
  {
    path: "/lobby",
    name: "lobby",
    component: Lobby
  },
  {
    path: "/welcome",
    name: "welcome",
    component: Guest
  },
  {
    path: "/minigame",
    name: "minigame",
    component: DailyMinigame
  },
  {
    path: "/previous-gifts",
    name: "previous-gifts",
    component: PreviousGifts
  },
  {
    path: "/revealed/:date?",
    name: "revealed",
    component: Revealed
  },
  {
    path: "/end-of-campaign",
    name: "endOfCampaign",
    component: EndOfCampaign
  },
  {
    path: "/before-the-campaign",
    name: "beforeTheCampaign",
    component: BeforeTheCampaign
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: "abstract",
  routes
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

router.replace("/");
export default router;
