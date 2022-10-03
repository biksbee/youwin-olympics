<template>
  <header class="header">
    <!-- <img src="https://united.mediaglb.com/apps/olympics-2022/olympics-navbar-2x100-tr.png" alt="logo" /> -->
    <a href="/">
      <img v-if="$route.name != 'welcome'" src="https://united.mediaglb.com/apps/olympics-2022/olympics-navbar-2x100-tr.png" alt="logo" />
    </a>
    
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: ["lang"]
};
</script>
<style lang="scss" scoped>
@import "@/misc/_variables.scss";
header {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  overflow: hidden;

  &:before {
    content: "";
    background: $header_bg_color;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 60px;
    bottom: auto;
  }

  img {
    position: absolute;
    width: auto;
    height: 60px;
    transform: translateX(-50%);
    z-index: 9;
    left: 50%;
    top: 0px;
  }
}
</style>
