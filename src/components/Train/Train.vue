<template>
  <div class="olympics-2022-app" :class="overlay ? 'with-player' : ''">
    <div v-if="!overlay" class="olympic-flame-wrapper">
      <img src="https://united.mediaglb.com/apps/olympics-2022/welcome-logo.png" class="olympic-flame">
      <img src="https://united.mediaglb.com/apps/olympics-2022/welcome-text.png" class="olympic-text">
    </div>
    <div v-else class="players-overlay-wrapper">
      <router-link v-if="getGift.prev" :to="{ name: 'revealed', params: { date: getGift.prev } }">
        <div class="prev"></div>
      </router-link>
      <div class="players-overlay-image">
        <div class="players-overlay" v-bind:style="'backgroundImage: url(https://united.mediaglb.com/apps/olympics-2022/' + getDomain + '/' + getGift.overlay + ')'"></div>
      </div>
      <router-link v-if="getGift.next" :to="{ name: 'revealed', params: { date: getGift.next } }">
        <div class="next"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { localDate } from "@/utils/date";

export default {
  name: "train",
  props: ["overlay", "date"],
  methods: {
    revealGift() {
      if (window.dataLayer) {
        dataLayer.push({
          'event': 'olympics-2022-event',
          'olympics-2022-action': 'reveal'
        });
      }
      this.$router.push("/revealed").catch(()=>{});
    },
  },
  computed: {
    ...mapGetters(["getGiftByDate"]),
    getGift() {
      return this.getGiftByDate(this.date || localDate);
    },
    getDomain() {
      return window.myUtilities.getDomain();
    },
  },
  data () {
    return {}
  }
};
</script>
<style lang="scss" scoped>
@import "@/misc/_variables.scss";
.olympics-2022-app {
  position: relative;
  z-index: 0;

  .olympic-flame-wrapper {
    position: relative;
    text-align: center;
    background-color: $header_bg_color;

    img {
      display: block;
      margin: 0 auto;
    }

    .olympic-flame {
      width: 220px;
      height: 220px;
    }
    .olympic-text {
      height: 90px;
      width: auto;
      margin-top: -20px;
    }
  }

  .players-overlay-image {
    position: relative;
    background: #0F0F37 url(https://united.mediaglb.com/apps/olympics-2022/onboarding-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 200px;
  }
  .players-overlay {
    height: 200px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  width: 40px;
  height: 100px;
  border-radius: 2px;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.3);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 70px !important;
  opacity: 1;
  transition: opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
}

.prev {
  left: 5px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCiA8Zz4KICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+CiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHBvbHlnb24gZmlsbD0iI2ZmZmZmZiIgaWQ9InN2Z18xIiBwb2ludHM9IjM1MiwxMTUuNCAzMzEuMyw5NiAxNjAsMjU2IDMzMS4zLDQxNiAzNTIsMzk2LjcgMjAxLjUsMjU2ICIvPgogPC9nPgo8L3N2Zz4=');
}

.next {
  right: 5px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCiA8Zz4KICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+CiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHBvbHlnb24gZmlsbD0iI2ZmZmZmZiIgaWQ9InN2Z18xIiBwb2ludHM9IjE2MCwxMTUuNCAxODAuNyw5NiAzNTIsMjU2IDE4MC43LDQxNiAxNjAsMzk2LjcgMzEwLjUsMjU2ICIvPgogPC9nPgo8L3N2Zz4=');
}

</style>
