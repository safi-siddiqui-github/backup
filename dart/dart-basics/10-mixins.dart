void main() {
  // mixins - mixes properties of class
  // it doesnot create a parent child relationship

  Animal animal = Animal();
  animal.makeSound();

  Person person = Person();
  person.makePretty();

  Party party = Party();
  party.makePretty();
  party.makeSound();
  party.dimLights();
}

mixin MixThem {
  void makeSound() => print('Woooh Wooh');
  void makePretty() => print('Looking Good');
}

mixin MixTheseAsWell {
  void dimLights() => print('Its Good Dark');
}

class Animal with MixThem {}

class Person with MixThem {}

class Party with MixThem, MixTheseAsWell {}
