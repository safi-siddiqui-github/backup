void main() {
  // <> Generics to strict data type
  DataOne myText = DataOne<String>('Hello');
  myText.showData();

  DataOne myNumber = DataOne<int>(999);
  if (myNumber is DataOne) {
    myNumber.showData();
  }
}

// Generics
class DataOne<T> {
  final T myData;
  DataOne(this.myData);

  void showData() => print(myData);
}
