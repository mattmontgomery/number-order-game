import { shuffle } from "./shuffle";
import { Game } from "./components/Game";

// const numberAbilities

function shuffleCards(seed?: number): [number[], number[]] {
  const r = seed ? random(seed) : Math.floor(Math.random() * 100_000);
  const initial = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18, // 8 is removed from the initial set per the game rules
  ];
  const shuffled = shuffle(initial, r);
  return [shuffle([...shuffled.slice(0, 6), 8], r), shuffled.slice(6)];
}

function random(seed: number): number {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export default function Home() {
  const shuffled = shuffleCards();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full">
        <Game table={shuffled[0]} deck={shuffled[1]} />
      </div>
    </main>
  );
}
