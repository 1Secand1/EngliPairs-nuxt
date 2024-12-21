declare module 'TMemoryGame' {
  interface PlayersConfigItem {
    name: string;
  }

  interface Player extends PlayersConfigItem {
    id: number;
    points: number;
  }

  interface CardConfigItem {
    text?: string;
    imgUrl?: string;
  }

  interface Card extends CardConfigItem {
    id: number;
    key: number;
    isOpen: boolean;
    completed: boolean;
  }

  type CardsConfigPairedItem = CardConfigItem[];
  type CardsConfigOptionsItem = Array<[CardConfigItem, CardConfigItem]>;

  interface CardsConfig {
    paired?: CardsConfigPairedItem;
    options?: CardsConfigOptionsItem;
  }
}
