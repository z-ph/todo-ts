<template>
  <div class="delete hover-flow"></div>
</template>
<script setup lang="ts">
// export default {
//   name: "del-btn",
// };
</script>

<style>
.delete {
  position: absolute;
  width: 40px;
  height: 40px;
  /* border: 1px solid #ccc; */
  border-radius: 50%;
  border-start-start-radius: 0;
  border-end-start-radius: 0;
  bottom: 0;
  top: 0;
  right: 0;
  margin: auto 0;
  box-sizing: border-box;
  background-image: url('../assets/del.svg');
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: 1px 50%;
  cursor: pointer;
}
</style>
