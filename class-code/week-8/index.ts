function swap<T1, T2>(a: T1, b: T2): [T2, T1] {
  return [b, a];
}

const s = <T>(a: T, b: T): [T, T] => {
  return [b, a];
};

const ans = swap(4, '5');
const ans2 = swap('4', '5');
