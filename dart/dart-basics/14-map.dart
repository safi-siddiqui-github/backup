void main() {
  Map<String, String> house = {
    'title': 'Dev House',
  };

  print([
    house['title'],
    house['undefined']!.isEmpty,
  ]);

  house.forEach((key, value) {});

  List<Map<String, String>> myMapList = [
    {'title': 'Dart'}
  ];
}
