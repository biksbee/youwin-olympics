<template>
  <div class="gift" :class="{ expired: isPastDate, 'conditions-expanded': isConditionsExpanded}">
    !Gift!
    <section class="revealed">
      <h3 v-if="isPastDate" class="gift-title">
        {{ date | formatDateDayOnly }} {{ $t('months.month_' + $options.filters.formatDateMonthOnly(date)) }}
        <!-- {{ $t("gift.gift") }} -->
      </h3>
      <h3 v-else class="gift-title">{{ $t("gift.todaysGift") }}</h3>

      <h1 class="badge-title" v-html="getGift.title"></h1>
      <div class="claim">
        <div class="claim-intro">{{ $t("gift.howToClaimIt") }}:</div>
        <div class="claim-description" v-html="getGift.description"></div>
        <a v-if="isPastDate" role="button" class="expired cta">
          {{ $t("gift.expired") }}
        </a>
        <a v-else :href="getLink" class="play-now cta" @click="closeApp(true)">
          {{ $t("gift.playNow") }}
        </a>
        <button type="button" class="show-terms" @click="toggleTermsAndConditions">
          <template v-if="isConditionsExpanded">
            {{ $t("gift.hideTermsAndConditions") }}
          </template>
          <template v-else>{{ $t("gift.showTermsAndConditions") }}</template>
        </button>
        <div v-if="isConditionsExpanded" v-html="getGift['terms-and-conditions']" class="terms-and-conditions"></div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { localDate, isOutOfRangeDate, formatDateDayOnly, formatDateMonthOnly } from "@/utils/date";
import globalMixin from "@/mixins/global";
export default {
  name: "gift",
  props: {
    date: {
      type: String,
      default: localDate
    }
  },
  filters: { formatDateDayOnly, formatDateMonthOnly },
  data() {
    return {
      isConditionsExpanded: false
    };
  },
  mixins: [globalMixin],
  computed: {
    ...mapGetters(["getGiftByDate"]),
    getGift() {
      return this.getGiftByDate(this.date);
    },
    isTodaysGift() {
      return this.date === localDate;
    },
    isPastDate() {
      return isOutOfRangeDate(this.date);
    },
    getGiftTitle() {
      return this.isTodaysGift
        ? this.$t("gift.todaysGift")
        // : `${this.date} ${this.$t("gift.gift")}`;
        : `${this.date}`;
    },
    getLink() {
      const link = this.getGift ? this.getGift.link : null;

      if (link !== null) {
        if (document.getElementsByTagName("html")[0].classList.contains("ua-mobile")) {
          let link_mobile = link.mobile;
          if (link_mobile.startsWith('#')) {
            link_mobile = "javascript:{myUtilities.gotoCasinoGame('" + link_mobile.substring(1) + "');}";
          } else {
            link_mobile = "javascript:{myUtilities.gotoPage('" + link_mobile + "');}";
          }
          return link_mobile;
        } else {
          return link.desktop;
        }
      } else {
        return "";
      }
    },
  },
  methods: {
    toggleTermsAndConditions() {
      this.isConditionsExpanded = !this.isConditionsExpanded;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/misc/_variables.scss";

section > * {
  text-align: center;
}

.badge {
  &-title {
    margin: 0 auto 20px;
    line-height: 1.2;
    max-width: 80%;
    font-size: 26px;
    font-weight: bold;
    color: #fff;
  }
}

.claim {
  &-intro {
    display: inline-block;
    border: $borderRadius solid $yellow;
    padding: 4px 12px;
    border-radius: 6px;
    color: $yellow;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
  }
  &-description {
    color: $textGray;
    margin: 0 auto;
    line-height: 1.1;
    max-width: 80%;
  }
}

.cta {
  display: block;
  width: 100%;
  border: none;
  font-weight: bold;
  color: $white;
  padding: 10px 10px;
  max-width: 80%;
  margin: 0 auto 10px;
  font-size: 20px;
  cursor: pointer;
  border-radius: $borderRadius;
  text-decoration: none;
  &.expired {
    cursor: not-allowed;
    pointer-events: none;
    background-color: $lightGray;
  }
}

.play-now {
  background-color: $green;
}

.show-terms {
  display: inline-flex;
  align-items: center;
  width: auto;
  color: $textGray;
  border: none;
  cursor: pointer;
  background-color: transparent;
  margin-bottom: 10px;
  &::after {
    border-style: solid;
    border-width: 0.1em 0.1em 0 0;
    content: "";
    display: inline-block;
    height: 0.45em;
    margin-left: 10px;
    transform: rotate(135deg);
    vertical-align: top;
    width: 0.45em;
    transition: all 0.3s ease-in;
  }
}

.terms-and-conditions {
  color: $textGray;
  text-align: left;
  padding-right: 15px;
  line-height: 1.2;
}

.gift {
  &-title {
    margin-bottom: 0;
    color: $yellow;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  &.expired {
    .giftbox {
      opacity: $expiredOpacity;
    }

    .gift-title {
      color: $lightGray;
    }
  }
  &.conditions-expanded {
    .show-terms {
      &::after {
        margin-top: 3px;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>

<style lang="scss">
.revealed {
  position: relative;
  z-index: 0;

  .terms-and-conditions {
    & > ol,
    & > ul {
      & > ol,
      & > ul {
        margin-left: 20px;
        padding-left: 0;
      }
    }
  }
}

.claim-description p {
  line-height: 1.2;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
