<template>
  <v-container>
    <v-text-field
      v-model="gameName"
      label="Название игры"
      outlined
    />

    <v-subheader class="mt-4">
      Выберите размер поля
    </v-subheader>
    <v-btn
      v-for="(fieldSize, index) in defaultFieldSizes"
      :key="index"
      block
      class="mb-2"
      :color="selectedNumberOfPairs === fieldSize.numberOfPairs ? 'primary' : 'grey'"
      @click="selectedNumberOfPairs = fieldSize.numberOfPairs"
    >
      {{ fieldSize.title }}
    </v-btn>

    <div v-if="selectedNumberOfPairs">
      <v-subheader class="mt-4">
        Добавлено парных карточек - {{ pairs.size }} из {{ selectedNumberOfPairs }}
      </v-subheader>

      <v-list>
        <v-list-item
          v-for="([key, value], index) in [...pairs.entries()]"
          :key="key"
        >
          <div class="d-flex align-center mb-2">
            <v-chip
              class="mr-2"
              color="primary"
              text-color="white"
            >
              {{ index + 1 }}
            </v-chip>
            <v-btn
              v-if="pairs.size !== 1"
              color="red"
              small
              @click="pairs.delete(key)"
            >
              Удалить
            </v-btn>
          </div>

          <div
            v-for="(card, i) in value.cards"
            :key="i"
            class="mb-2"
          >
            <v-text-field
              v-model="card.text"
              label="Текст карточки"
              outlined
              dense
            />
            <v-btn
              color="primary"
              class="mt-1"
              block
            >
              Выбрать картинку
            </v-btn>
          </div>

          <v-btn
            v-if="value.cards.length !== 2"
            color="indigo"
            class="mt-2"
            @click="addCard(value)"
          >
            Расширить
          </v-btn>
        </v-list-item>
      </v-list>

      <v-btn
        color="green"
        block
        class="mt-2"
        @click="addPair"
      >
        Добавить карточку
      </v-btn>
      <v-btn
        color="blue"
        block
        class="mt-2"
        @click="save"
      >
        Сохранить
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import type TMemoryGame from 'TMemoryGame';
  import { getRandomId } from '@/utils/getRandomId';
  import { ref, toRaw } from 'vue';

  type pairsMapItem = { type: string; cards: TMemoryGame.CardConfigItem[] };

  const gameName = ref('');
  const selectedNumberOfPairs = ref<number | null>(null);
  const pairs = ref<Map<number, pairsMapItem>>(new Map());

  pairs.value.set(0, { type: 'paired', cards: [{ text: '' }] });

  const defaultFieldSizes = [
    {
      title: '4x4',
      numberOfPairs: 8,
    },
    {
      title: '6x6',
      numberOfPairs: 18,
    },
    {
      title: '8x8',
      numberOfPairs: 32,
    },
  ];

  function addPair() {
    const item = {
      type: 'paired',
      cards: [{ text: '', imgUrl: '' }],
    };

    pairs.value.set(getRandomId(), item);
  }

  function addCard(array: pairsMapItem) {
    array.type = 'options';
    array.cards.push({ text: '' });
  }

  function save() {
    const game = {
      name: gameName.value,
      pairs: [...toRaw(pairs.value).values()],
    };

    localStorage.setItem('games', JSON.stringify(game));
  }
</script>

<style scoped>
.field-size__list {
  display: flex;
  gap: 10px;
  justify-content: space-between;

  width: 100%;
  padding: 0;

  list-style-type: none;
}

.field-size__item {
  width: 100%;
  background-color: none;
}

.field-size__button {
  cursor: pointer;

  width: 100%;
  padding: 2px 5px;

  color: white;

  background: rgb(20 189 255);
  border: none;
  border-radius: 5px;
}
</style>
