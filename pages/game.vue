<template>
  <div class="wraper">
    <ul class="players-list">
      <li
        v-for="{ id, name, points } in memoryPlayers"
        :key="id"
        :style="{
          color: id === memoryGame.currentPlayerId ? 'blueviolet' : '',
        }"
      >
        <p>Игрок - {{ name }}</p>
        <p>Отгадано - {{ points }}</p>
      </li>
    </ul>
    <section class="container">
      <div
        v-for="card in memoryCards"
        :key="card.id"
        class="memory-card"
        @click="memoryGame.pickCard(card)"
      >
        <template v-if="card.completed" />

        <template v-else-if="card.isOpen">
          {{ card.text }}
        </template>

        <template v-else>
          🩷
        </template>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
  import { MemoryGame } from '@/services/useMemoryGame';
  import type TMemoryGame from 'TMemoryGame';
  import { ref } from 'vue';

  // const router = useRouter();

  const cardsConfig: TMemoryGame.CardsConfig = {
    paired: [{ text: 'Вафля' }],
    options: [[{ text: 'Кошка' }, { text: 'Cat' }]],
  };

  const playersConfig: TMemoryGame.PlayersConfigItem[] = [
    { name: 'Вася' },
    { name: 'Петя' },
  ];

  const memoryGame = new MemoryGame(cardsConfig, playersConfig);
  const memoryCards = ref(memoryGame.getCards());
  const memoryPlayers = ref(memoryGame.getPlayers());

  memoryGame.gameOver(({ name }) => {
    const replayGame = confirm(`Победил ${name}, хотыте сыграть ещё ?`);

    if (replayGame) {
      memoryGame.restartGame();
    } else {
      // router.push('/');
    }
  });

  // memoryGame.winning();
</script>
<style scoped>
.wraper {
  display: flex;
}

.memory-card {
  cursor: pointer;

  display: grid;
  place-items: center;

  min-width: 100px;
  min-height: 100px;

  background: skyblue;
}

.players-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style-type: none;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  max-width: 300px;
}
</style>
