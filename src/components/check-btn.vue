<script setup lang="ts">
defineProps({
  checked: Boolean,
})
// export default {
// 	name: "check-btn",
// 	props: {
// 		checked: Boolean,
// 	},
// };
</script>
<template>
  <div
    :class="{
      'check-box': true,
      checked: checked,
      'hover-flow': true,
    }"
  ></div>
</template>
<style scoped>
.check-box {
  background-color: #fff;
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 50%;
  bottom: 0;
  top: 0;
  margin: auto 0;
  left: -1px;
  box-sizing: border-box;
  cursor: pointer;
}
.check-box.checked {
  border: none;
  background-image: url('../assets/check.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.check-box:hover {
  transform: scale(1.05);
}
</style>
