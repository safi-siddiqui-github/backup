void main() {
  for (int i = 0; i < 5; i++) {
    continue;
    // break;
  }

  int myNum = 5;

  while (myNum == 5) {
    myNum = 4;
  }

  do {
    myNum = 4;
  } while (myNum == 5);

  print([myNum]);
}
