import type TMemoryGame from 'TMemoryGame';
import { randomizeArray } from '@/utils/randomizeArray';

export class MemoryGame {
  currentPlayerId = 0;

  private players: TMemoryGame.Player[] = [];

  private readonly cards: TMemoryGame.Card[] | [] = [];
  selectedCards: TMemoryGame.Card[] = [];

  counterCompletedPair = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  gameOverCallback: (winner: TMemoryGame.Player) => void = () => {};

  constructor(
      cardsConfig: TMemoryGame.CardsConfig = {},
      playersConfig: TMemoryGame.PlayersConfigItem[] = [],
  ) {
    this.cards = this.parseCardsConfig(cardsConfig);
    this.players = this.parsePlayersConfig(playersConfig);
  }

  addPoint(playerId: number, points: number) {
    return (this.players[playerId].points += points);
  }

  nextPlayer() {
    this.currentPlayerId = ++this.currentPlayerId % this.players.length;
  }

  getCards(): TMemoryGame.Card[] {
    return randomizeArray(this.cards);
  }

  getPlayers(): TMemoryGame.Player[] {
    return this.players;
  }

  createCard(
      item: TMemoryGame.CardConfigItem,
      key: number,
      id: number,
  ): TMemoryGame.Card {
    return {
      id,
      key,
      isOpen: false,
      completed: false,
      ...item,
    };
  }

  createPlayers(id: number, { name } = {} as TMemoryGame.PlayersConfigItem) {
    return {
      id,
      name,
      points: 0,
    };
  }

  parsePlayersConfig(playersConfig: TMemoryGame.PlayersConfigItem[]) {
    return randomizeArray(playersConfig).map((player, index) =>
        this.createPlayers(index, player),
    );
  }

  parseCardsConfig(cardsConfig: TMemoryGame.CardsConfig): TMemoryGame.Card[] {
    const cards: TMemoryGame.Card[] = [];
    let idCounter = 0;
    let key = 0;

    Object.entries(cardsConfig).forEach((item) => {
      const [type, elements] = item;

      if (type === 'paired') {
        elements.forEach((item: TMemoryGame.CardConfigItem) => {
          cards.push(
              this.createCard(item, key, idCounter++),
              this.createCard(item, key, idCounter++),
          );
          key++;
        });
      }

      if (type === 'options') {
        elements.forEach((optionGroup: TMemoryGame.CardConfigItem[]) => {
          optionGroup.forEach((item) => {
            cards.push(this.createCard(item, key, idCounter++));
          });
          key++;
        });
      }
    });

    return cards;
  }

  completePairMatch(status: boolean) {
    if (this.selectedCards.length === 0) return;

    this.selectedCards.forEach((card) => {
      if (status) card.completed = true;
      card.isOpen = false;
    });

    this.selectedCards.length = 0;

    if (!status) this.nextPlayer();

    const gameOverStatus = this.counterCompletedPair >= this.cards.length / 2;
    if (gameOverStatus) {
      this.gameOverCallback(this.findWinner());
      return;
    }
  }

  pickCard(card: TMemoryGame.Card) {
    if (this.selectedCards.length >= 2) return;

    if (!('id' in card)) {
      console.warn('отсутствует поле id');
      return;
    }

    if (card.completed) return;

    if (this.selectedCards[0]?.id === card.id) return;
    card.isOpen = true;

    this.selectedCards.push(card);
    if (this.selectedCards.length != 2) return;

    const [firstСard, secondСard] = this.selectedCards;

    if (firstСard.key == secondСard.key) {
      this.counterCompletedPair += 1;
      this.addPoint(this.currentPlayerId, 1);
      setTimeout(() => this.completePairMatch(true), 1000);
    } else {
      setTimeout(() => this.completePairMatch(false), 1000);
    }
  }

  findWinner(): TMemoryGame.Player {
    return this.players.reduce((winner, player) =>
        player.points > winner.points ? player : winner,
    );
  }

  gameOver(callback: (winner: TMemoryGame.Player) => void) {
    this.gameOverCallback = callback;
  }

  restartGame() {
    this.cards.forEach((card) => (card.completed = false));
    this.players.forEach((player) => (player.points = 0));
    this.currentPlayerId = 0;
    this.counterCompletedPair = 0;
  }
}
