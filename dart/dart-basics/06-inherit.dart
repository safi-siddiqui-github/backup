void main() {
  Room myRoom = Room();

  print(myRoom.myTitle());
  myRoom.incRoom();
  print(myRoom.myTitle());

  House myGarden = Garden();

  // area isnt defined for House
  // print(myGarden.area);
  print((myGarden as Garden).area);
}

class House {
  int _rooms = 5;
  String title = 'Dev House';
  String myTitle() => '$title has $_rooms rooms';
  void incRoom() => _rooms++;
}

// Inheritance -- is-a

class Room extends House {

  // super call the parent to keep track of parent
  void incRoom() {
    super.incRoom();
  }
}

class Garden extends House {
  int area = 55;
}
