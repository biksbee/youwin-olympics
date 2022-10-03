<template>
  <div class="snowflakes" aria-hidden="true">
    <div class="snowflake" v-for="(sf, i) in amount" :key="i">
      {{ snowflakes[sf % 2] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "snowflake",
  data() {
    return {
      amount: 0,
      snowflakes: ["❅", "❆"]
    };
  }
};
</script>

<style lang="scss">
div {
  border: 1px solid red;
}
/* customizable snowflake styling */
.snowflake {
  color: #fff;
  font-size: 1em;
  font-family: Arial, sans-serif;
  text-shadow: 0 0 5px #000;
}
@-webkit-keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@-webkit-keyframes snowflakes-shake {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(40px);
  }
}
@keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@keyframes snowflakes-shake {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(40px);
  }
}
.snowflakes {
  position: absolute;
  left: 0;
  right: 0;
  top: -30px;
  bottom: 22px;
  overflow: hidden;
  background: #ddecfb;

  .snowflake {
    position: absolute;
    top: -10%;
    z-index: 9999;
    user-select: none;
    cursor: default;
    animation-name: snowflakes-fall, snowflakes-shake;
    animation-duration: 5s, 3s;
    animation-timing-function: linear, ease-in-out;
    animation-iteration-count: infinite, infinite;
    animation-play-state: running, running;
  }
  .snowflake:nth-of-type(0) {
    left: 1%;
    animation-delay: 0s, 0s;
  }
  .snowflake:nth-of-type(1) {
    left: 10%;
    animation-delay: 1s, 1s;
  }
  .snowflake:nth-of-type(2) {
    left: 20%;
    animation-delay: 6s, 0.5s;
  }
  .snowflake:nth-of-type(3) {
    left: 30%;
    animation-delay: 4s, 2s;
  }
  .snowflake:nth-of-type(4) {
    left: 40%;
    animation-delay: 2s, 2s;
  }
  .snowflake:nth-of-type(5) {
    left: 50%;
    animation-delay: 8s, 3s;
  }
  .snowflake:nth-of-type(6) {
    left: 60%;
    animation-delay: 6s, 2s;
  }
  .snowflake:nth-of-type(7) {
    left: 70%;
    animation-delay: 2.5s, 1s;
  }
  .snowflake:nth-of-type(8) {
    left: 80%;
    animation-delay: 1s, 0s;
  }
  .snowflake:nth-of-type(9) {
    left: 90%;
    animation-delay: 3s, 1.5s;
  }
  .snowflake:nth-of-type(10) {
    left: 25%;
    animation-delay: 2s, 0s;
  }
  .snowflake:nth-of-type(11) {
    left: 65%;
    animation-delay: 4s, 2.5s;
  }
}
</style>
