<script setup lang="ts">
defineProps(['content', 'lineThrough'])
// export default {
//   name: "todo-content",
//   props: ["content", "line-through"],
// };
</script>

<template>
  <div
    :class="{
      content: true,
      completed: lineThrough,
      'hover-flow': true,
    }"
  >
    {{ content }}
  </div>
</template>

<style>
.content {
  margin-left: 45px;
  width: 80%;
  max-width: 300px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.content.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
