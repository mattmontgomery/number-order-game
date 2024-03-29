export function shuffle<T = unknown>(initialArray: T[], seed: number): T[] {
  // <-- ADDED ARGUMENT
  const array = [...initialArray];
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed; // <-- ADDED LINE
  }

  return array;
}
function random(seed: number): number {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
