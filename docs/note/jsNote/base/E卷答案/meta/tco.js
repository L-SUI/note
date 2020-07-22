function test(i) {
  return test(i--, i);
  // TCO_ENABLED = true;
}
test(5);
