void main() {
  int myNumber = 50;
  String myMsg;

  if (myNumber < 2) {
    myMsg = 'Baby';
  } else if (myNumber < 10) {
    myMsg = 'Kid';
  } else {
    myMsg = 'Adult';
  }

  String isA = myMsg.startsWith('A') ? 'A it is' : 'Other';

  switch (myNumber) {
    case > 80:
      myMsg = 'Number is 88';
      break;
    case 50 when (myNumber) < 80:
      myMsg = 'Number is 50 not 88';
      break;
    default:
      myMsg = 'Number is not 88';
  }

  print([myMsg, isA]);
}
