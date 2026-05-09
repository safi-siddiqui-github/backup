//Futures - Promises
// async returns a future
// good practice for main async
// void is fire and forget
// future<void> is wait and continue to listen

// if async is set on main then it will halt execution
// Future<void> main() async {
//   final myText = await waitSec();
//   print('hello');
//   print(myText);
// }


// If async is not set then it will continue and popin when completed
void main() {
  waitSec().then((value) => print(value));
  print('hello');
}

Future<String> waitSec() async {
  // print(Duration.secondsPerMinute);
  return Future.delayed(Duration(seconds: 2), () => 'Hey !');
  // return Future(() => 'Hey');
}
