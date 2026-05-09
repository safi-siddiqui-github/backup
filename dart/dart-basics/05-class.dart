void main() {
  House myHouse = House(title: 'Dev House', people: 5);

  // print([myHouse.intro(), myHouse.myGetter]);
  // myHouse.setMyGetter = 65;
  // print([myHouse.intro(), myHouse.myGetter]);

  // Dont want a constructor
  // Constants myConstants = Constants();

  print([Constants.myNum]);
}

class House {
  final String title;
  final int people;

  // Const represents immutable class - all finals
  House({
    required this.title,
    required this.people,
  });

  int _myPrivate = 10;

  int get myGetter => _myPrivate;
  set setMyGetter(int a) => _myPrivate = a;

  String intro() => "${this.title} has ${this.people} peoples";
}


class Constants {
  static int myNum = 55;
}
