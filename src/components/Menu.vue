<template>
  <div class="menu">
    <div v-if="isAuthenticated() && !endOfCampaign && !beforeTheCampaign" class="burger" :class="{ opened: isMenuOpened }" @click="toggleMenu">
      <div :class="`bar${bar}`" v-for="bar in 3" :key="bar"></div>
    </div>
    <div class="close" @click="closeApp()">
      <div :class="`bar${bar}`" v-for="bar in 2" :key="bar"></div>
    </div>

    <div v-if="!endOfCampaign && !beforeTheCampaign" class="menu-options" :class="{ opened: isMenuOpened }">

      <div v-for="n in 6" :key="n" class="option">
        <a @click="gotoPage($t('menu.menu' + n + '~route'))">
          {{$t('menu.menu' + n + '~title')}}
        </a>
      </div>
      <div class="menu_lan">

        <LanguageSelector/>
      </div>
    </div>


  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import globalMixin from "@/mixins/global";
import LanguageSelector from "../views/LanguageSelector";

export default {
  name: "app-menu",
  components: {
    LanguageSelector,
  },
  data() {
    return {
      show: false,
      isMenuOpened: false,
    };
  },
  mixins: [globalMixin],
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState({
      endOfCampaign: state => state.endOfCampaign,
      beforeTheCampaign: state => state.beforeTheCampaign,
    }),
  },
  methods: {
    closeApp: function() {
      this.$emit("closeApplication",  this.show)
      // const a = document.getElementById('olympics-2022');
      // a.remove();          // try2
      // document.getElementById('olympics-2022').style.display = "none";  try1
    },
    toggleMenu: function() {
      this.isMenuOpened = !this.isMenuOpened;
    },
    gotoPage: function(whereto) {
      this.isMenuOpened = !this.isMenuOpened;
      this.$router.push(whereto).catch(()=>{});
    },
  }
};

</script>

<style lang="scss" scoped>
@import "@/misc/_variables.scss";

.menu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 999;

  .burger {
    position: absolute;
    display: inline-block;
    cursor: pointer;
    left: 10px;
    top: 10px;
    z-index: 1001;
    background: transparent;
    padding: 0 7px;
    border-radius: 4px;

    .bar1,
    .bar2,
    .bar3 {
      width: 30px;
      height: 3px;
      background-color: $white;
      margin: 8px 0;
      transition: 0.4s;
    }

    &.opened {
      .bar1 {
        transform: rotate(-45deg) translate(-8px, 6px);
      }
      .bar2 {
        opacity: 0;
      }
      .bar3 {
        transform: rotate(45deg) translate(-9px, -8px);
      }
    }
  }

  .close {
    position: absolute;
    display: inline-block;
    cursor: pointer;
    left: calc(100vw - 55px);
    top: 10px;
    z-index: 999;
    background: transparent;
    border-radius: 4px;
    width: 44px;
    height: 41px;

    .bar1,
    .bar2 {
      width: 30px;
      height: 3px;
      background-color: #fff;
      margin: 8px 0;
      transition: 0.4s;
    }

    .bar1 {
      transform: rotate(-45deg) translate(-3px, 13px);
    }

    .bar2 {
      transform: rotate(45deg) translate(5px, -5px);
    }
  }

  .menu-options {

    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transition: 0.4s;
    background: $header_bg_color;
    transform: translateX(-100vw);
    padding-top: 80px;
    color: $white;

    .option {
      max-width: 70%;
      margin: 0 auto;
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid $gray;

      &:last-child {
        border-bottom: none;
      }


      a {
        color: $white;
        text-decoration: none;
        font-size: 20px;
        font-weight: none;
      }
    }
    .menu_lan {
      max-width: 70%;
      margin: 0 auto;
      text-align: center;
      padding: 20px 0;
      font-size: 20px;
      display: flex;
      justify-content: center;

    }
    .menu_lan_title, .menu_lan_icon {
      width: 6%;
    }
    .menu_lan_title{
      //border: 1px solid yellow;
    }
    .menu_lan_icon{
      //border: 1px solid pink;
      padding-top: 5px;
    }
    .all_fill {
      fill: #fff;
    }

    &.opened {
      transform: translateX(0);
    }
  }
}

#olympics-2022-wrapper.desktop {
  .close {
    left: 650px;

    &:hover {
      animation: spin 0.8s ease-in-out;
    }
  }
  .menu {
    width: unset;

    .burger.opened:hover {
      animation: spin 0.8s ease-in-out;
    }

    .menu-options {
      width: 700px;
      height: 100%;
      position: absolute;
    }
  }
}
</style>
