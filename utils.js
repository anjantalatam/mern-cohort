export function sum(n) {
  return (Number(n) * (Number(n) + 1)) / 2;
}

export function multiply(n) {
  let m = 1;

  for (let i = 1; i <= n; i++) {
    m *= i;
  }

  return m;
}
