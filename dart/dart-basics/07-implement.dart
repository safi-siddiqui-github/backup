void main() {
  Room myRoom = Room();
  print([myRoom.rooms, myRoom.title]);
  LuxuryRoom myLuxuryRoom = LuxuryRoom();
  print([myLuxuryRoom.rooms, myLuxuryRoom.title]);
}

class House {
  // i need to implement this variable
  int rooms = 0;
}

class Room implements House {
  @override
  int rooms = 5;

  String title = 'My Room';
}

class LuxuryRoom extends House implements Room {
  @override
  String title = 'My Luxury Room';
}
