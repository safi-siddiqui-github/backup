void main() {
  String myText() {
    return 'Hello';
  }

  // Multiple Types
  (String, int) myTwo() {
    return ('Second', 5);
  }
  // print([myText(), myTwo().$1]);

  // Destructure
  // var (text2, num2) = myTwo();

  String multipleArg({required String myName, int? age}) {
    return "$myName is $age years old";
  }

  int myShortNum() => 5;

  print([multipleArg(myName: 'Dart', age: 3), myShortNum()]);
}
