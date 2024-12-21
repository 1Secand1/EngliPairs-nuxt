<template>
  <div class="wrapper">
    <v-btn
      to="/createGame"
      class="add-button"
      min-width="200px"
    >
      Добавить игру
    </v-btn>

    <div class="card-wrapper">
      <v-card
        v-for="i in 50"
        :key="i"
        to="/game"
        class="card"
        title="Животные"
        subtitle="Кол пар - 20"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.wrapper {
  justify-content: center;

  width: 100%;
  height: 100svh;
  margin-right: auto;
  margin-left: auto;
  padding: 20px;

}

.add-button {
  display: flex;
  width: 12%;
}

.card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;

  width: 100%;
  height: min-content;
  margin-top: 20px;
}

.card {
  cursor: pointer;
  height: 100px;
}
</style>
