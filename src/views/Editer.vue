<template>
  <div class="main_win">
    <div class="list_components">
<!--        <div v-for="index in listFile.length-1" v-bind:key="index"  class="content"> &lt;!&ndash;EROR with range array, i am add first element of array[0] &ndash;&gt;-->
            <div class="style_title_content" @click="togglePar(index)">
<!--                  {{listFile[index].name}}-->
            </div>
            <div :id="`id_block${index}`" class="block_with_options">
              <div v-for="k in 3" v-bind:key="k" class="all_options">
                <div @click="openPageOption">
<!--                  <input type="radio" :value="`${k}`" :id="`select_point${k}`" v-model="selectPoint">-->
<!--                  {{$t(index)}}.{{$t(k)}}. {{$t('menu.menu' + k + '~title')}}-->
<!--                  {{$t(index)}}.{{$t(k)}}. {{listOption[k].Options[k]}}-->
                  <div>

                  </div>
                </div>

              </div>
              <ChangeOption />
            </div>
<!--        </div>-->
    </div>
    <div class="demonstration">

    </div>
<!--    <dynamicSettings />-->

  </div>
</template>



<script>
import settingsRoute from "../settings/dynamicSettings";
// import styleOptions from "../settings/styleOptions";
import ChangeOption from "./ChangeOption";

export default {
  components: {ChangeOption},

  data() {
    return {
      checkId: false,
      saveNumber: 0,
      listFile: settingsRoute,
      // listOption: styleOptions,
      selectPoint: ""
    };
  },
  methods: {
    togglePar: function (a) {
      const id_bl = document.getElementById(`id_block${a}`)  //id_bl указывает на айди нажатого компонента
      if (this.checkId === false) {
        id_bl.style.display = "block"
        this.saveNumber = a      //сохранен предыдущий айдишник
        this.checkId = true      //изменяем состояние входа
      } else if(this.saveNumber === a){
        document.getElementById(`id_block${this.saveNumber}`).style.display = "none"
        this.saveNumber = 0
        this.checkId = false
      } else if(this.checkId === true){
        document.getElementById(`id_block${this.saveNumber}`).style.display = "none"
        this.saveNumber = 0
        this.checkId = false
        this.togglePar(a)
      }
    },
    openPageOption: function() {
      this.isVisible = !this.isVisible

    },
  },
}

</script>

<style lang="scss" scoped>
.main_win{
  display: flex;
  width: 100%;

}
.list_components{
  width: 40%;
}
.s{
  width: 100%;
  color: #fff;
  background-color: #000;

}
.demonstration{
  border: 1px solid green;
  width: 60%;
}
.content{
  margin: 0 10px;
  padding: 10px 20px;
  border-bottom: 1px solid black;
  cursor: pointer;

  .style_title_content{
    color: #8888d7;
  }
  &:last-child{
    border-bottom: none;
  }

  &:hover {
    font-size: 17px;
  }
}

.block_with_options {
  display: none;
}
.all_options {
  &:hover {
    color: #e8cccc;

    //border-right: 1px solid #fff;
  }
}
.demonstration {

}
</style>