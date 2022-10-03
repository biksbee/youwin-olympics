<template>
  <div class="daily-minigame center">
    <div>
      <div ref="daily-minigame--game" class="daily-minigame--game" data-scrollable>
        <div class="daily-minigame--wrapper" :class="gameIsFaded ? 'faded' : ''">
          <SpinningWheel></SpinningWheel>
        </div>
      </div>
    </div>
    <div v-if="showTheResults" class="daily-minigame--results" data-scrollable>
      <div class="daily-minigame--results-inner">
        <h1 class="daily-minigame--title" v-html="$t(gamePrize.prize == 'betterluck' ? 'minigame.betterluck' : (gamePrize.prize == 'deposit' ? 'minigame.ohno' : 'minigame.congratulations'))"></h1>
        <div class="daily-minigame--content">
          <div class="shout" v-html="gamePrize.content"></div>
          <div class="meatime">{{ $t('game.meantime') }}</div>
          <div class="cta-wrapper" :class="{'two-ctas' : gamePrize.prize != 'deposit'}">
            <template v-if="gamePrize.prize == 'deposit'">
              <a class="promo-link" @click="gotoThePage()">{{ gamePrize.cta }}</a>
            </template>
            <template v-else>
              <a class="promo-link" @click="gotoThePage()">{{ $t("game.games") }}</a>
              <a class="promo-link" @click="$router.push('/revealed')">{{ $t("game.promotions") }}</a>
            </template>
          </div>
          <div v-html="gamePrize.terms"></div>
        </div>
      </div>
    </div>
    <div v-if="waitForDepositInfo" class="daily-minigame--wait-for-deposit-info"></div>
  </div>
</template>

<script>
import SpinningWheel from '@/components/SpinningWheel';
import { mapState } from 'vuex';
import globalMixin from "@/mixins/global";

export default {
  name: "DailyMinigame",
  components: {
    SpinningWheel
  },
  mixins: [globalMixin],
  data () {
    return {
      howMuchToSpin: 0,
      status: {
        gameHasBegan: false,
        rouletteIsSpinning: false,
        pointerIsSpinning: false,
        readyToSpin: false,
      },
      gameIsFaded: false,
      showTheResults: false,
      gameStatus: {
        timeFrame: -1,
      },
      waitForDepositInfo: true,
    }
  },
  computed: {
    ...mapState({
      gameSettings: state => state.spinTheWheel.gameSettings,
      gamePrize: state => state.spinTheWheel.gameStatus.prize,
    }),
  },
  methods: {
    gotoThePage: function() {
      let isMobile = document
        .getElementsByTagName("html")[0]
        .classList.contains("ua-mobile");
      window.myUtilities.gotoPage(isMobile ? this.gamePrize.cta_mobile : this.gamePrize.cta_desktop);
      window.olympics2022App.hideOlympics2022();
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "casino-olympics-event",
          "casino-olympics-action": "CTA",
          "casino-olympics-promotion": this.gamePrize.message
        });
      }
    },
  },
  created() {
    let elm = this;

    window.myUtilities.getDepositSummary('one_week', function(depositSummary, depositCount) {
      console.log(depositSummary, depositCount);

      elm.waitForDepositInfo = false;

      if (depositCount > 0 && depositSummary >= 100) {
        // Get data from the firebase, starting with the timeframe
        window.firebase.database().ref("games/timeframes/" + elm.gameSettings.gameB).once('value', function (snap) {
          var snap_val = snap.val();
          elm.gameStatus.timeFrame = snap_val;

          // Let's see if the player has already played now.
          window.firebase.database().ref("games/" + elm.gameSettings.gameB + "/" + (window.myUtilities.getPlayerData() && window.myUtilities.getPlayerData().sbUserID) ).once('value', function (snap) {
            var snap_val = snap.val();
            window.myUtilities.log('Black Friday - Daily Minigame|Check if player has already played', [
              "games/" + elm.gameSettings.gameB + "/" + (window.myUtilities.getPlayerData() && window.myUtilities.getPlayerData().sbUserID),
              snap_val,
              elm.gameStatus.timeFrame
            ]);

            if (snap_val != null) {
              if (snap_val.timeframe == elm.gameStatus.timeFrame) {
                if (snap_val.prize >= 0) {
                  elm.$store.dispatch('completeTheDraw', 'prize-' + snap_val.prize + '-');
                } else {
                  elm.$store.dispatch('completeTheDraw', 'betterluck');
                }
                elm.showTheResults = true;
              }
            }
          });
        });

        elm.$store.watch(
          () => {
            return elm.$store.state.spinTheWheel.gameStatus
          },
          (newValue) => {
            if (elm.status.gameHasBegan) {
              return true;
            }

            if ( newValue.results && newValue.ended) {
              elm.showTheResults = newValue.ended;
            }
          },
          { deep:true }
        )
      } else {
        elm.$store.dispatch('completeTheDraw', 'deposit');
        elm.showTheResults = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/misc/_variables.scss";

#olympics-2022 {

  .daily-minigame {

    &--wait-for-deposit-info {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    
    &--game {}
    &--wrapper {
      &.faded {
        opacity: 0.5;
      }
    }
    &--results {
      position: fixed;
      top: 60px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      background: rgba(0, 0, 0, .90);
      max-width: unset !important;
      overflow: auto;
      width: auto !important;

      &-inner {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        position: relative;
      }
    }
    &--title {
      font-size: 24px;
      color: #FFFFFF;
      text-align: center;
      font-weight: bold;
      margin: 20px 0;
    }
    &--image {
      max-width: 250px;
      height: auto;
      margin-bottom: 30px;
    }
    &--content {
      .shout {
        ::v-deep {
          .title {
            font-weight: bold;
            font-size: 20px;
            text-align: center;
          }
          .subtitle {
            font-size: 18px;
            line-height: 1.1;
            text-align: center;
          }
        }
      }

      ::v-deep {
        ol, ul {
          padding-left: 20px;
          margin: 0;
          line-height: 1.3;
          font-size: 12px;
        }
      }
    }

    h2 {
      line-height: 1.2;
      margin-top: 30px;
      margin-bottom: 50px;
    }

    &--two-options {
      display: flex;
      justify-content: center;
      gap: 15px;

      a {
        @include greenButton();
      }
    }
  }
  .cta-wrapper {
    padding: 30px;

    .promo-link {
      @include greenButton();
      cursor: pointer;
      display: block;
    }

    &.two-ctas {
      display: flex;
      gap: 10px;
      justify-content: center;

      .promo-link {
        padding: 10px 20px;
        line-height: 1;
        font-size: 16px;
      }
    }
  }

  .meatime {
    margin-top: 30px;
    text-align: center;
  }
}

</style>
