<template>
  <div class="page_options">
    <div>
      <div class="items">
        <input type="radio" id="one" value="One" v-model="picked" />
<!--        <label for="one">input</label>-->
        <input for="one" type="text" id="input_in" class="option_item" :class="{ openSelect: selectOption }">
      </div>
      <div class="items">
        <input type="radio" id="two" value="Two" v-model="picked" />
<!--        <label for="two">link</label>-->
        <input for="two" type="text" id="input_link" class="option_item" :class="{ openSelect: selectOption }">
      </div>
      <div class="items">
        <input type="radio" id="three" value="Three" v-model="picked" />
<!--        <label for="three">color</label>-->
        <colorPicker for="three" id="c_p" class="option_item" :class="{ openSelect: selectOption }"/>
      </div>
      <button class="btn_apply">apply</button>
    </div>
  </div>
</template>

<script>
import colorPicker from "../views/colorPicker.vue"

export default {
  name: "ChangeOption",
  components: {
    colorPicker
  },
  data() {
    return {
      picked: 'One',
      selectOption: false,
    }
  },
  methods: {}


}
</script>

<style lang="scss" scoped>
.page_options {
  display: block;
  margin: 20px auto;
  &:hover {
    font-size: 14px;
    display: flex;
  }
}
.option_item {
  border-radius: 12px;
  text-align: center;
  margin: 5px 10px 0 0;
}
.items {
  display: flex;
}
.btn_apply {
  margin: 5px;
}
#input_in, #input_link, #c_p {
  //display: none;
  &.openSelect {
    display: block;
  }
}
</style>