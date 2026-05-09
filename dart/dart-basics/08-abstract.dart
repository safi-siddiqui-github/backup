void main() {
  Room myRoom = Room();
  print(myRoom.rooms);
  myRoom.makePretty();
  print(myRoom.rooms);

  LuxuryRoom myLuxuryRoom = LuxuryRoom();
  print(myLuxuryRoom.rooms);
  myLuxuryRoom.makePretty();
  print(myLuxuryRoom.rooms);
}

// Abstract class implements all functions
abstract class House {
  int? rooms;
  void makePretty();
}

class Room implements House {
  @override
  void makePretty() {
    rooms = 5;
  }

  @override
  int? rooms;
}

// Extending an abstract class needs functions
class LuxuryRoom extends House {
  @override
  void makePretty() {
    rooms = 10;
  }
}
