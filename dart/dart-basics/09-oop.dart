void main() {
  // Polymorphism - Ability of obj to take many forms
  Home myRoom = Room();
  myRoom.makeSound();
  myRoom = LuxuryRoom();
  myRoom.makeSound();
  // Cat() != Dag()

  // Abstraction - Hiding essential details and exposing functionality
  Animal cat = Cat();
  cat.makeSound();
  // Animal animal = Animal(); -- abs class cannot be instantiated

  //Inheritance - Using parent props in extending classes

  // Encapsulation - Bundle data and methods together in a unit hidden from outside
  Secret mySecret = Secret();
  print(mySecret._secret);
  // RIght now it prints but if in another file then wont allow
}

class Home {
  void makeSound() => print('Home sweet Home');
}

class Room extends Home {
  @override
  void makeSound() => print('Room Big Room');
}

class LuxuryRoom extends Home {
  @override
  void makeSound() => print('Luxury Room Fancy Luxury Room');
}

abstract class Animal {
  void makeSound();
}

class Cat extends Animal {
  @override
  void makeSound() => print('Meow Cat Meow');
}

class Secret {
  String _secret = 'no eye can see but you !';
}

class _SecretClass {
  String _secret = 'some secrets are seen by you !';
}
