void main() {

  // Enums - Enhanced Enums
  
  House house1 = House(HouseTitles.devHouse.title);
  House house2 = House(HouseTitles.freeHouse.title);
}

class House {
  // final HouseTitles title;
  final String title;
  House(this.title) {
    print(this.title);
  }
}

enum HouseTitles { 
  devHouse('Dev House'),
  freeHouse('Free House'),
  luxuryHouse('Luxury House');
  final String title;
  const HouseTitles(this.title);
 }
