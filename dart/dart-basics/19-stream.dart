import 'dart:async';

void main() async {
  countDown();

  // This works when stream is returned
  // countDown().listen(
  //   (event) {
  //     print(event);
  //   },
  //   onDone: () => print('Event Done'),
  // );
}

// Stream<int> countDown() async* {
//   for (int i = 5; i > 0; i--) {
//     yield i;
//     await Future.delayed(Duration(seconds: 1));
//   }
// }

// Stream<int> countDown() {
//   // periodic is same as future.delayed but async is removed
//   return Stream.periodic(
//     Duration(seconds: 1),
//     (val) => val,
//   );
// }

void countDown() {
  final controller = StreamController<int>();

  // make sure to close
  controller.sink.add(1);
  controller.sink.close();

  controller.stream.listen((event) {
    print(event);
  });

  controller.close();
}
