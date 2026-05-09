void main() {
  // List - A collection of objects
  List myList = ['One', 2, false];

  List<int> myInts = [1, 2, 3];

  myInts[2] == 3 ? myInts.add(4) : '';

  // print([myList, myInts]);
  print(myInts);

  for (final myInt in myInts) {}

  Iterable myNewIterable = myList.where((each) => each.runtimeType == bool);

  List myNewList = myNewIterable.toList();

  print(myNewList);

  // Set - It removes same elements
  Set mySet = {'One', 2, false, 'One'};

  print(mySet);
}
