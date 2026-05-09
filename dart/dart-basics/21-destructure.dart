void main() {
  // list - destruction
  final list = [1, 2, 3, 4, 5, 6];
  final [a, b, c, ...d] = list;
  print([a, b, c, d]);

  // Map - destructure
  final map = {'title': 'Home'};
  final {'title': titleMap} = map;
  print(titleMap);

  // Dart3
  // same for switch
  if (map case {'title': String titleMap}) {
    print('Case Correct');
  }

  // List Dart 3
  final list2 = ['hi'];
  switch (list2) {
    case ['hi' || 'HI']:
      print('list2 is correct');
      break;
    default:
  }

  // Pattern matching
  Person person = Person('Dev House');
  final Person(:title) = person;
  final Person(title: titleAsSomething) = person;
  print([title, titleAsSomething]);

  // Dart 3 Switch
  int age = 55;
  final ans = switch (age) {
    0 => 'Not born',
    > 0 && < 50 => 'Alive',
    55 when age > 50 => '55 it is',
    55 => 'Perfect Age',
    // _ is default
    _ => 'None',
  };

  print(ans);
}

class Person {
  final String title;
  Person(this.title);
}
