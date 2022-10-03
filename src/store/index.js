import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import router from '../router'
import { isOutOfRangeDate, localDate } from "@/utils/date";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    firebase: {
      links: {
        settings: "apps/olympics-2022/settings/" + window.myUtilities.getDomainLang() + "/"
      },
      data: {
        settings: {}
      }
    },
    isAuthenticated:
      sessionStorage.getItem("isAuthenticated") === "true" ? true : false,
    isLoggedInBefore:
      sessionStorage.getItem("Olympics2022LoggedInBefore") === "true" ? true : false,
    olympics2022Settings: {
      playerId: null,
      firstTime: true
    },
    endOfCampaign: false,
    beforeTheCampaign: false,
    spinTheWheel: {
      gameSettings: {
        gameB: "olympics2022",
        game: "spin-the-wheel"
      },
      gameStatus: {
        timeframe: 0,
        running: false,
        results: false,
        prize: false,
        message: "",
        ended: false,
      },
    },
  },
  getters: {
    getGiftByDate: state => (date = localDate) => {
      const { settings } = state.firebase.data;

      if (settings && settings.dailypromos) {
        let keysArray = Object.keys(settings.dailypromos).filter(d => isOutOfRangeDate(d));
        let indexOfDay = keysArray.indexOf(date);
        let dailyData = Object.assign({}, settings.dailypromos[date]);
        dailyData.prev = false;
        dailyData.next = false;
        if (indexOfDay >= 0) {
          dailyData.prev = indexOfDay > 0 ? keysArray[indexOfDay - 1] : false;
          dailyData.next = indexOfDay < keysArray.length - 1 ? keysArray[indexOfDay + 1] : false;
        }
        return dailyData;
      } else {
        return {
          'date': "",
          'day': 0,
          'description': "",
          'gift-day': "",
          'link': {
            'desktop': '',
            'mobile': ''
          },
          'overlay':"players.png",
          'terms-and-conditions': "",
          'title': ""
        }
      }
    },
    isAuthenticated: state => () => {
      return state.isAuthenticated;
    },
    isFirstTime: state => () => {
      return state.olympics2022Settings.firstTime;
    },
  },
  mutations: {
    setIsAuthenticated(state, value) {
      sessionStorage.setItem("isAuthenticated", value);
      state.isAuthenticated = value;
    },
    setIsLoggedInBefore(state, value) {
      sessionStorage.setItem("Olympics2022LoggedInBefore", value);
      state.isLoggedInBefore = value;
    },
    setOlympics2022Settings(state, settings) {
      state.olympics2022Settings = settings;
    },
    setData(state, { type, data }) {
      state.firebase.data[type] = data;
    },
    clearFirstTime(state) {
      state.olympics2022Settings.firstTime = false;
    },
    endOfCampaign(state) {
      state.endOfCampaign = false; //true
      router.push('/end-of-campaign').catch(()=>{});
    },
    beforeTheCampaign(state) {
      state.beforeTheCampaign = false; //true
      router.push('/before-the-campaign').catch(()=>{});
    },
    goToApp() {
      if (window.olympics2022Settings.playerId == null || window.olympics2022Settings.firstTime) {
        router.replace("/welcome").catch(()=>{});
      } else {
        router.replace("/lobby").catch(()=>{});
      }
    },
    setCurrentTimeframe (state, timeframe) {
      state.spinTheWheel.gameStatus.timeframe = timeframe;
    },
    setGameStatus (state, settings) {
      if (Object.prototype.hasOwnProperty.call(settings, 'running')) {
        state.spinTheWheel.gameStatus.running = settings.running;
      }
      if (Object.prototype.hasOwnProperty.call(settings, 'results')) {
        state.spinTheWheel.gameStatus.results = settings.results;
      }
      if (Object.prototype.hasOwnProperty.call(settings, 'prize')) {
        state.spinTheWheel.gameStatus.prize = settings.prize;
      }
      if (Object.prototype.hasOwnProperty.call(settings, 'message')) {
        state.spinTheWheel.gameStatus.message = settings.message;
      }
      if (Object.prototype.hasOwnProperty.call(settings, 'ended')) {
        state.spinTheWheel.gameStatus.ended = settings.ended;
      }
    },

    updateThePrize (state, prizeInfo) {
      state.spinTheWheel.gameStatus.running = false;
      state.spinTheWheel.gameStatus.results = true;
      state.spinTheWheel.gameStatus.prize = prizeInfo;
      state.spinTheWheel.gameStatus.message = "";
    },
  },
  actions: {
    setIsAuthenticated({ commit }, value) {
      commit("setIsAuthenticated", value);
    },
    setIsLoggedInBefore({ commit }, value) {
      commit("setIsLoggedInBefore", value);
    },
    setOlympics2022Settings({ state, commit }) {
      const settings = window.olympics2022Settings || state.olympics2022Settings;

      commit("setOlympics2022Settings", settings);
      commit("setIsAuthenticated", !!(settings && settings.playerId));
    },
    setData({ commit }, { type, data }) {
      window.myUtilities.log('Olympics 2022 - setData', { type, data, localDate });
      commit("setData", { type, data });

      if (type == 'settings' && data.dailypromos) {
        let previousDays = Object.keys(data.dailypromos).filter( item => { 
          return item <= localDate;
        });
        let nextDays = Object.keys(data.dailypromos).filter( item => { 
          return item >= localDate;
        });

        window.myUtilities.log('Olympics 2022 - setData|previousDays', {
          'length' : previousDays.length,
          'data': previousDays
        });
        window.myUtilities.log('Olympics 2022 - setData|nextDays', {
          'length' : nextDays.length,
          'data': nextDays
        });

        if (previousDays.length == 0) {
          window.myUtilities.log('Olympics 2022 - setData|previousDays', "beforeTheCampaign");
          commit("beforeTheCampaign");
        } else if (nextDays.length == 0) {
          window.myUtilities.log('Olympics 2022 - setData|previousDays', "endOfCampaign");
          commit("endOfCampaign");  
        } else {
          window.myUtilities.log('Olympics 2022 - setData|previousDays', "goToApp");
          commit("goToApp");
        }
      }
    },
    clearFirstTime({ commit }) {
      window.olympics2022Settings.unsetFirstTime();
      commit("clearFirstTime");
    },

    setGameStatus({commit}, settings) {
      commit('setGameStatus', settings);
    },

    drawForAPrize({state, commit, dispatch}) {
      if (window.myUtilities.getPlayerData() == null) {
        commit('setGameStatus', {
          running: false,
          results: true,
          prize: false,
          message: "no-user"
        });
        return;
      }
      
      // Set game default settings
      commit('setCurrentTimeframe', 0)
      commit('setGameStatus', {
        running: true,
        results: false,
        prize: false,
        message: ""
      });

      // Get the current timeframe for the game
      window.firebase.database().ref("games/timeframes/" + state.spinTheWheel.gameSettings.gameB).once('value', function (snap) {
        var snap_val = snap.val();
        if (snap_val == null) {
          commit('setCurrentTimeframe', 0);
        } else {
          commit('setCurrentTimeframe', snap_val);
        }
        dispatch('drawForAPrize_step2');
      });
    },

    drawForAPrize_step2({state, commit, dispatch}) {
      // Get the player's status to see if he's eligible to play
      window.myUtilities.log('Olympics 2022 - drawForAPrize_step2', "games/" + state.spinTheWheel.gameSettings.gameB + "/" + (window.myUtilities.getPlayerData() && window.myUtilities.getPlayerData().sbUserID))
      window.firebase.database().ref("games/" + state.spinTheWheel.gameSettings.gameB + "/" + (window.myUtilities.getPlayerData() && window.myUtilities.getPlayerData().sbUserID)).once('value', function (snap) {
        var snap_val = snap.val();
        var queryTheServer = false;
        var playerStatus = false;

        if (snap_val == null) {
          queryTheServer = true;
        } else {
          if (Object.prototype.hasOwnProperty.call(snap_val, 'timeframe')) {
            if (state.spinTheWheel.gameStatus.timeframe != snap_val.timeframe) {
              queryTheServer = true;
            } else {
              playerStatus = 'already-played';
            }
          } else {
            queryTheServer = true;
          }
        }
        
        if (playerStatus) {
          // If the player has already played...
          commit('setGameStatus', {
            running: false,
            results: true,
            prize: false,
            message: playerStatus
          });

        } else if (queryTheServer) {
          // Access the server
          dispatch('queryTheServer')
        } else {
          // Else, pick a random "better luck" message to cover the problems
          dispatch('completeTheDraw', 'betterluck');
        }
      });
    },

    queryTheServer({state, dispatch, commit}) {
      var data = new FormData();
      data.append('player_id', (window.myUtilities.getPlayerData() && window.myUtilities.getPlayerData().sbUserID),);
      data.append('game', state.spinTheWheel.gameSettings.game);
      data.append('domain', window.myUtilities.getDomain());

      let d = new Date();
      var expires = "expires="+ d.toUTCString();
      document.cookie = "__RRG=" + (Math.floor(Math.random() * 8999999) + 1000000) + ";" + expires + ";path=/";
  
      var config = {
        method: 'post',
        // url: 'http://localhost/wp-json/get-the-prize/v1/prcs/draw/olympics2022',
        // url: 'http://172.24.240.1/wp-json/get-the-prize/v1/prcs/draw/olympics2022',
        url: 'https://ringringgames.com/wp-json/get-the-prize/v1/prcs/draw/olympics2022',
        data : data,
        withCredentials: true
      };

      window.myUtilities.log('Olympics 2022 - queryTheServer|data', JSON.stringify(config));
      
      axios(config).then(function (response) {
        commit('setGameStatus', {running: true});
        window.myUtilities.log('Olympics 2022 - queryTheServer|results', JSON.stringify(response.data));
        if (Object.prototype.hasOwnProperty.call(response.data, 'result')) {
          dispatch('queryTheServerCallback', response.data);
        } else {
          dispatch('completeTheDraw', 'betterluck');
        }
      })
      .catch(function () {
        dispatch('completeTheDraw', 'betterluck');
      });

    },
    queryTheServerCallback({commit, dispatch}, data) {
      if (data.result) {
        dispatch('completeTheDraw', 'prize-' + data.prize);
      } else {
        if ('next-time' == data.error) {
          dispatch('completeTheDraw', 'betterluck');
        } else {
          commit('setGameStatus', {
            running: false,
            results: true,
            prize: false,
            message: data.error
          });
        }
      }
    },

    completeTheDraw({state, commit}, prizeName) {
      const { settings } = state.firebase.data;

      window.myUtilities.log('Olympics 2022 - completeTheDraw|prizeName', prizeName);
      window.myUtilities.log('Olympics 2022 - completeTheDraw|localDate', localDate);
      window.myUtilities.log('Olympics 2022 - completeTheDraw|settings', JSON.stringify(settings));
      window.myUtilities.log('Olympics 2022 - completeTheDraw|prizesForUpdate', settings.prizeList.filter( (e) => e.prize.startsWith(prizeName)) );

      if (settings && settings.prizeList) {

        if (prizeName == 'deposit') {
          commit('updateThePrize', settings.general.needToDeposit)
        } else {
          // Find all same prizes
          let prizes = settings.prizeList.filter( (e) => e.prize.startsWith(prizeName));
          // And pick a random one to display
          commit('updateThePrize', prizes[Math.floor(Math.random() * prizes.length)]);
        }
      }
    },

    scrollOnTop() {
      document.getElementsByClassName('main-app')[0].children[0].scrollIntoView({ behavior: "smooth" });
    }
  }
});
