<template>
  <div>
    <p>Привет</p>
    <v-btn>text</v-btn>
  </div>
</template>

<script lang="ts" setup>
  const a = 1;
  console.log(a);
</script>

<style>
.element {
  pointer-events: none;
  user-select: none;

  isolation: isolate;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;

  width: 50px;
  height: 50px;

  font-size: 2rem;
  line-height: 1.5;
  color: red;
  text-align: center;

  background-color: hotpink;
  outline: 1px solid rebeccapurple;
  caret-color: goldenrod;
}

</style>
