<template>
  <div ref="SpinningWheel" id="SpinningWheelGame" data-scrollable>
    <div id="roulette-title">{{ $t('menu.menu1~title') }}</div>
    <div id="game-roulette-wrapper" :style="{'--silly-roulette-spin': howMuchToSpin + 'deg', '--silly-roulette-reset': howMuchToSpin + 'deg'}">
      <div id="roulette-shadow"></div>
      <div id="roulette-wheel" :style="{backgroundImage: 'url(https://united.mediaglb.com/apps/olympics-2022/spinning-wheel/wheel.png)'}" :class="[status.rouletteIsSpinning ? 'spinning' : '', status.readyToSpin ? 'ready-to-spin' : '']"></div>
      <div id="roulette-pointer" :style="{backgroundImage: 'url(https://united.mediaglb.com/apps/olympics-2022/spinning-wheel/pointer.png)'}" :class="[status.pointerIsSpinning ? 'spinning' : '']"></div>
      <div id="roulette-click" @click="clickTheRoulette()" :class="status.rouletteIsSpinning ? 'clicked' : ''">
        {{ $t('game.spin') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "SpinningWheel",
  data() {
    return {
      howMuchToSpin: 0,
      status: {
        gameHasBegan: false,
        rouletteIsSpinning: false,
        pointerIsSpinning: false,
        readyToSpin: false,
      },
    };
  },
  created() {
    let elm = this;
    this.$store.watch(
      () => {
        return this.$store.state.spinTheWheel.gameStatus
      },
      (newValue) => {
        if (elm.status.gameHasBegan) {
          return true;
        }

        if ( newValue.results) {
          let randomizer = Math.floor(Math.random() * 30);
          let inLastLoop = newValue.prize.degTo - 5 - randomizer;
          elm.howMuchToSpin = Math.floor(-10 * 360 + inLastLoop);
          window.myUtilities.log('Olympics 2022 - completeTheDraw|howMuchToSpin', [randomizer, elm.howMuchToSpin]);

          elm.status.gameHasBegan = true;
          elm.status.readyToSpin = true;
          elm.status.rouletteIsSpinning = true;
          elm.status.pointerIsSpinning = true;

          setTimeout(function() {
            elm.status.pointerIsSpinning = false;
          }, 8800);

          setTimeout(function() {
            elm.$store.dispatch('setGameStatus', {ended: true});
          }, 10000);
        }
      },
      { deep:true }
    )
  },
  computed: {
    ...mapState({
      gameStatus: state => state.spinTheWheel.gameStatus,
      gameSettings: state => state.spinTheWheel.gameSettings,
    }),
  },
  methods: {
    clickTheRoulette: function() {
      this.status.rouletteIsSpinning = true;
      this.$store.dispatch('drawForAPrize');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/misc/_variables.scss";

:root {
  --silly-roulette-spin: 0deg;
  --silly-roulette-reset: 0deg;
}

#SpinningWheelGame {
  position: relative;
  margin: 0 auto;
  font-family: Arial, Helvetica, sans-serif;
  width: 90%;
  max-width: 350px;

  #game-roulette-wrapper {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    margin: 0 auto 80px;

    &:before{
      content: "";
      display: block;
      padding-top: 100%;
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 120px;
      height: 120px;
      transform: translate(-50%, -50%);
      background: url(https://united.mediaglb.com/apps/olympics-2022/spinning-wheel/logo.png) center center no-repeat;
      background-size: contain;
    }
  }
  #roulette-pointer {
    width: 8%;
    height: 12%;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 0;
    left: 46%;
    transition: all 0.1s ease-in-out;
    transform-origin: center 10px;

    &.spinning {
      transform: rotate(25deg);
    }
  }

  #roulette-shadow {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 0;
    left: 0;
    background-image: radial-gradient(rgba(0, 0, 0, 0.8) 50%, transparent 70%);
  }

  #roulette-wheel {
    width: 90%;
    height: 90%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 5%;
    left: 5%;
    
    &.ready-to-spin {
      transition: all 8.75s ease-out;
    }

    &.spinning {
      transform: rotate(var(--silly-roulette-spin));
    }

    &.reset{
      transform: rotate(var(--silly-roulette-reset)) !important;
      transition: all 0.5s ease-in-out !important;
    }
  }

  #roulette-click {
    @include greenButton();
    cursor: pointer;
    position: absolute;
    bottom: -70px;
    left: 0;
    right: 0;
    height: 60px;

    opacity: 1;
    transition: opacity .1s ease-in-out;

    &.clicked {
      opacity: .5;
      cursor: not-allowed;
    }
  }

  #roulette-options-wrapper {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  #roulette-options {
    font-size: 18px;
    padding: 10px 20px;
  }

  #roulette-title {
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    padding: 30px 0;
  }
}
</style>
