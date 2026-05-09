void main() {
  Village person = Person();

  // No instantiation
  // Village village = Village();

  // In order to use all direct subtypes of person we use sealed
  switch (person) {
    case Tent():
      print('Tent');
      break;
    case Person():
      print('Person');
      break;
    case Cloud():
      print('Cloud');
      break;
    default:
  }

  // Can be constructed
  Ground groud = Ground();

  // When base is extendted and instantiated, parent constructor is called
  Carrot carrot = Carrot();

  // Interface can be constructed, falsing to interface rule
  Board board = Board();
}

// In order to use direct subtype of instantiation
sealed class Village {}

class Person implements Village {}

class Tent implements Village {}

class Cloud extends Village {}

// Similar to sealed, Cannot be extended or implemented outside
final class Ground {}

// Cannot be implemented but extended
base class Noodles {
  Noodles() {
    print('Noodles Extended');
  }
}

final class Carrot extends Noodles {}

// Interface can only be implemented
interface class Board {}

final class Chalk implements Board {}

mixin class Caramel {}
