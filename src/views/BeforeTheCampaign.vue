<template>
  <div class="guest">
    <div>
      !BeforeTheCampaign!
      <Train :overlay="false"></Train>
      <section class="intro">
        <h2>{{ $t("beforeTheCampaign.intro.line1") }}</h2>
        <h4>{{ $t("beforeTheCampaign.intro.line2") }}</h4>
        <h3>{{ $t("beforeTheCampaign.intro.line3") }}</h3>
      </section>

      <a :href="letsGo()" class="letsgo" @click="closeApp(true)">
        {{ $t("beforeTheCampaign.cta") }}
      </a>
    </div>
  </div>
</template>

<script>
import Train from "@/components/Train/Train.vue";
import globalMixin from "@/mixins/global";
export default {
  name: "beforeTheCampaign",
  components: {
    'Train': Train,
  },
  mixins: [globalMixin],
  methods: {
    letsGo() {
      if (document.getElementsByTagName("html")[0].classList.contains("ua-mobile")) {
        return "javascript:{myUtilities.gotoPage('" + this.$t('beforeTheCampaign.cta_mobile') + "');}";
      } else {
        return this.$t('beforeTheCampaign.cta_desktop');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/misc/_variables.scss";
#olympics-2022 {

  .guest {
    position: relative;
    place-items: center;
    padding-bottom: 50px;
    background-color: $header_bg_color;
  }

  .intro {
    margin-top: 0px;
    padding-top: 10px;
    padding-bottom: 50px;

    background: $header_bg_color;
    text-align: center;
    font-weight: bold;

    h2 {
      padding: 0 20px;
      margin: 0;
      color: $white;
      font-size: 28px;
      line-height: 1.1;
      font-weight: bold;
    }

    h4 {
      padding: 0 20px;
      margin: 20px 0 0;
      color: $white;
      font-size: 20px;
      line-height: 1.1;
      font-weight: bold;
    }

    h3 {
      padding: 0 20px;
      margin: 20px 0 0;
      color: white;
      font-size: 16px;
      line-height: 1;
      font-weight: normal;
    }
  }

  .letsgo {
    @include greenButton();
    width: calc(100% - 80px);
    margin: 0 auto;
    display: block;
    text-decoration: none;
  }
}
</style>
