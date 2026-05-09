void main() {
  int myNumber = 5;
  double myNumber2 = 5;
  String myText = 'Work';
  bool isBoolean = true;
  dynamic isDynamic = 8.9; // not recommended

  String stringInter = '$myNumber2 ways';
  String printDol = '\$ usa';

  // print([myNumber, myNumber2, myText, isBoolean, isDynamic]);
  // print([stringInter, printDol]);

  var myVar = 5; //mutable
  const myConst = 5;
  final myFinal = 5;

  // DateTime.now() - Value is known after we run - not a compile time constant
  // runtime variables - compile time variable
  final myFinalDate = DateTime.now();
  // const myConstDate = DateTime.now();  //compile time constant

  // print([myVar, myConst, myFinal, myFinalDate]);

  int? myNullInt = null; // ? - null aware operator to represent null variable
  // ?? - ternary

  print([myNullInt, myNullInt?.isOdd, myNullInt ?? 'its null']);
}
