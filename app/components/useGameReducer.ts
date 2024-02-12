"use client";

import { useReducer } from "react";

export const CARD_ABILITIES: Record<
  number,
  [
    string,
    (neighbors: [number, number], table: number[]) => boolean,
    (neighbors: [number, number]) => number
  ]
> = {
  1: [
    "Even number eats smaller even number",
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber % 2 === 0 && smallerNumber % 2 === 0;
    },
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return smallerNumber;
    },
  ],
  2: [
    "Even number eats single-digit number",
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return (
        (biggerNumber % 2 === 0 && smallerNumber < 10) ||
        (smallerNumber % 2 === 0 && biggerNumber < 10)
      );
    },
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber % 2 === 0 && smallerNumber < 10
        ? smallerNumber
        : biggerNumber;
    },
  ],
  3: [
    "Biggest number in the stack eats odd number",
    (neighbors, table) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const biggestNumber = table
        .toSorted((a, b) => (a > b ? 1 : -1))
        .toReversed()[0];
      console.log({ biggestNumber, biggerNumber });
      return smallerNumber % 2 === 1 && biggerNumber === biggestNumber;
    },
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber;
    },
  ],
  4: [
    "Odd number eats bigger odd number",
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return smallerNumber % 2 === 1 && biggerNumber % 2 === 1;
    },
    (neighbors) => {
      return neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
    },
  ],
  5: [
    "Odd number eats bigger number",
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return smallerNumber % 2 === 1;
    },
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber;
    },
  ],
  6: [
    "Double-digit number eats single-digit number",
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber >= 10 && smallerNumber < 10;
    },
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return smallerNumber;
    },
  ],
  7: [
    "Odd number eats smaller odd number",
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber % 2 === 1 && smallerNumber % 2 === 1;
    },
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return smallerNumber;
    },
  ],
  9: [
    "Single-digit number eats double-digit number",
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber >= 10 && smallerNumber < 10;
    },
    (neighbors) => {
      return neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
    },
  ],
  10: [
    "Bigger sequential number eats smaller number",
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber - smallerNumber === 1;
    },
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return smallerNumber;
    },
  ],
  11: [
    "Even number eats smaller number",
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber % 2 === 0;
    },
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return smallerNumber;
    },
  ],
  12: [
    "Even number eats bigger even number",
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return smallerNumber % 2 === 0 && biggerNumber % 2 === 0;
    },
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber;
    },
  ],
  13: [
    "Odd number eats double-digit number",
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber >= 10 && smallerNumber % 2 === 1;
    },
    (neighbors) => {
      return neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
    },
  ],
  14: [
    "Single-digit number eats odd number",
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return (
        (biggerNumber % 2 === 1 && smallerNumber < 10) ||
        (smallerNumber % 2 === 1 && biggerNumber < 10)
      );
    },
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber % 2 === 1 && smallerNumber < 10
        ? biggerNumber
        : smallerNumber;
    },
  ],
  15: [
    "Even number eats double-digit number",
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber >= 10 && smallerNumber % 2 === 0;
    },
    (neighbors) => {
      return neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
    },
  ],
  16: [
    "Smallest number in the stack eats even number",
    (neighbors, table) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      const smallestNumber = [...table].toSorted((a, b) => (a > b ? 1 : -1))[0];
      return biggerNumber % 2 === 0 && smallerNumber === smallestNumber;
    },
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber;
    },
  ],
  17: [
    "Even number eats bigger number",
    (neighbors) => {
      const smallerNumber =
        neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
      return smallerNumber % 2 === 0;
    },
    (neighbors) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber;
    },
  ],
  18: [
    "Odd number eats smaller number",
    (neighbors: [number, number]) => {
      const biggerNumber =
        neighbors[1] > neighbors[0] ? neighbors[1] : neighbors[0];
      return biggerNumber % 2 === 1;
    },
    (neighbors) => {
      return neighbors[1] < neighbors[0] ? neighbors[1] : neighbors[0];
    },
  ],
};

export function getEightNeighors(table: number[]): [number, number] {
  const eightPosition = table.indexOf(8);

  const cardA = table[eightPosition - 1];
  const cardB = table[eightPosition + 1];

  return [cardA, cardB];
}

export function canEat(table: GameState["table"]): [boolean, number] {
  const neighbors = getEightNeighors(table);
  if (neighbors.includes(7) && neighbors.includes(9)) {
    return [true, 9]; // why was six afraid of seven? because seven ate nine!
  }
  const cardA = neighbors[0];
  const cardB = neighbors[1];
  return [
    // numbers are one apart
    Math.abs((cardA ?? -1) - (cardB ?? -1)) === 1,
    cardA > cardB ? cardA : cardB,
  ];
}

type GameState = {
  active?: number | undefined;
  deck: number[];
  eaten: number[];
  lost: boolean;
  mustEat: boolean;
  history: number[][];
  table: number[];
};

export default function useGameReducer({
  table,
  deck,
}: Pick<GameState, "table" | "deck">) {
  return useReducer(
    (
      prevState: GameState,
      action:
        | { type: "SWAP_CARDS"; payload: [number, number] }
        | { type: "SET_ACTIVE_CARD"; payload: number }
        | { type: "REMOVE_ACTIVE_CARD" }
        | {
            type: "MOVE_ACTIVE_CARD_TO_START";
          }
        | { type: "MOVE_ACTIVE_CARD_AFTER_NUMBER"; payload: number }
        | { type: "EAT_CARD"; payload: number }
        | { type: "USE_CARD"; payload: number }
    ): GameState => {
      console.debug(
        `%c${action.type}
%cpayload: ${"payload" in action ? action.payload : "[no-payload]"}`,
        "font-weight: bold;",
        "font-weight: normal; color: gray;"
      );
      switch (action.type) {
        case "SWAP_CARDS":
          const active = action.payload[0];
          const card = action.payload[1];
          const newTable = [...prevState.table];
          const activeIdx = newTable.findIndex((c) => active === c) as number;
          const cardIdx = newTable.findIndex((c) => card === c) as number;
          newTable[activeIdx] = card;
          newTable[cardIdx] = active;
          return {
            ...prevState,
            table: newTable,
            active: undefined,
            mustEat: true,
            history: [...prevState.history, newTable],
          };
        case "REMOVE_ACTIVE_CARD":
          return {
            ...prevState,
            active: undefined,
          };
        case "SET_ACTIVE_CARD":
          return {
            ...prevState,
            active: action.payload,
          };
        case "MOVE_ACTIVE_CARD_TO_START":
          const tableWithCardMovedToStart = prevState.active
            ? [
                prevState.active,
                ...prevState.table.filter((a) => a !== prevState.active),
              ]
            : prevState.table;
          return {
            ...prevState,
            active: undefined,
            history: [...prevState.history, tableWithCardMovedToStart],
            mustEat: true,
            table: tableWithCardMovedToStart,
          };
        case "MOVE_ACTIVE_CARD_AFTER_NUMBER":
          const tableWithoutActive = prevState.active
            ? prevState.table.filter((a) => a !== prevState.active)
            : [...prevState.table];
          const newPosition =
            tableWithoutActive.findIndex((c) => c === action.payload) + 1;
          const tableWithMovedCardAfter = prevState.active
            ? [
                ...tableWithoutActive.slice(0, newPosition),
                prevState.active,
                ...tableWithoutActive.slice(newPosition),
              ]
            : prevState.table;
          return {
            ...prevState,
            active: undefined,
            history: [...prevState.history, tableWithMovedCardAfter],
            mustEat: true,
            table: tableWithMovedCardAfter,
          };
        case "EAT_CARD":
          const newDeck = [...prevState.deck];
          const newCard = newDeck.pop();
          const tableWithoutEatenCard = newCard
            ? [...prevState.table.filter((a) => a !== action.payload)]
            : prevState.table.filter((a) => a !== action.payload);
          const eatCardLost = tableWithoutEatenCard.toReversed()[0] === 8;
          return {
            ...prevState,
            deck: newDeck,
            eaten: [...prevState.eaten, action.payload],
            lost: eatCardLost,
            mustEat: false,
            table: !eatCardLost
              ? [...tableWithoutEatenCard, newCard as number]
              : tableWithoutEatenCard,
          };
        case "USE_CARD":
          const newDeck_UseCard = [...prevState.deck];
          const newCard_UseCard = newDeck_UseCard.pop();
          const tableWithoutEatenCardByVirtueOfUse = [
            prevState.table.toReversed()[0],
            ...prevState.table.filter(
              (a) =>
                a !== action.payload && a !== prevState.table.toReversed()[0]
            ),
          ];
          const useCardLost =
            tableWithoutEatenCardByVirtueOfUse.toReversed()[0] === 8;
          return {
            ...prevState,
            eaten: [...prevState.eaten, action.payload],
            deck: newDeck_UseCard,
            lost: useCardLost,
            mustEat: false,
            table: useCardLost
              ? tableWithoutEatenCardByVirtueOfUse
              : [
                  ...tableWithoutEatenCardByVirtueOfUse,
                  newCard_UseCard as number,
                ],
          };
      }
    },
    {
      active: undefined,
      deck: deck,
      eaten: [],
      lost: false,
      history: [],
      mustEat: false,
      table: table,
    }
  );
}
