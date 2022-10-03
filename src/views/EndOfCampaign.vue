<template>
  <div class="guest">
    <div>
      !EndOfCampaign!
      <Train :overlay="false"></Train>
      <section class="intro">
        <h2>{{ $t("endOfCampaign.intro.line1") }}</h2>
        <h4>{{ $t("endOfCampaign.intro.line2") }}</h4>
        <h3>{{ $t("endOfCampaign.intro.line3") }}</h3>
      </section>

      <button class="letsgo" type="button" @click="letsGo">
        {{ $t('endOfCampaign.cta') }}
      </button>
    </div>
  </div>
</template>

<script>
//import Train from "@/components/Train/Train.vue";
import Train from "../components/Train/Train.vue";

export default {
  name: "endOfCampaign",
  components: {
    'Train': Train,
  },
  methods: {
    letsGo() {
      this.$router.push('/previous-gifts').catch(()=>{});
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
  }
}
</style>
