<template>
  <div>
    <Transition name="fade">
      <div v-if="show" id="olympics-2022" class="app" :class="[$route.name, domain]">
        <Header :lang="lang" />
        <Menu @closeApplication="closeApp" />
        <router-view />
      </div>
    </Transition>
  </div>
</template>

<script>
import { setData } from "@/services/firebaseService";
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";

export default {
  components: {
    Header,
    Menu
  },
  data: function () {
    return {
      show: true,
      lang: window.myUtilities.getDomainLang(),
      domain: window.myUtilities.getDomain(),
    }
  },
  methods: {
    closeApp: function(value) {
      this.show = value
      const a = document.getElementById('olympics-2022');
      setTimeout(() => {
        a.remove();
      }, 1000)

    }
  },
  mounted() {
    setData();
  }
};
</script>

<style lang="scss">
@import "@/misc/_variables.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


#olympics-2022 {
  display: block;
  font-family: "Jaldi", sans-serif;
  overflow: hidden;
  min-height: -webkit-fill-available;
  min-height: 100vh;
  color: $white;
  background: $main_bg_color;
  transition: all 0.5s ease-in-out;
  * {
    font-family: "Jaldi", sans-serif;
  }

  &.app.welcome, &.app.endOfCampaign, &.app.beforeTheCampaign {
    background: $header_bg_color;
  }

  &.mroyun {
    font-family: "Roboto", sans-serif;
    background: $mroyun_bg_color !important;

    * {
      font-family: "Roboto", sans-serif;
    }

    &.app.welcome, &.app.endOfCampaign {
      header:before {
        background: $mroyun_bg_color !important;  
      }

      .guest {
        background: $mroyun_bg_color !important;  
      }
    }

    .olympic-flame-wrapper,
    .guest .intro,
    .how-it-works {
      background: $mroyun_bg_color !important;
    }
    .guest .intro h3 {
      color: white;
    }

    .promo-link,
    .letsgo,
    .how-it-works-cta,
    .cta:not(.expired),
    #SpinningWheelGame #roulette-click {
      background: $mroyun_yellow;
    }
    .list div span {
      color: $mroyun_yellow;
    }

    .list {
      border-color: white;

      div {
        border-color: white;
      }
    }

    .lobby--image-wrapper[data-v-4db471e8]:before {
      background: url(https://united.mediaglb.com/mroyun/layout/bgeffect.gif);
    }

    .how-it-works > div .slick-slide .image-wrapper,
    .players-overlay-wrapper .players-overlay-image {
      background: url(https://united.mediaglb.com/mroyun/layout/bgeffect.gif);
      background-repeat: repeat;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(https://united.mediaglb.com/apps/olympics-2022/glitch-boxes-green.png) bottom right no-repeat;
        background-size: contain;
      }
    }

    .claim-intro {
      border-color: $mroyun_yellow;
      color: white;
    }
  }
}
</style>
