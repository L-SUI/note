var a = {},
  b = { key: 'b' },
  c = { key: 'c' };
a[b] = 123;
a[c] = 456;
console.log(a);
console.log(a[b]);
console.log(Symbol(b) == Symbol(b));
