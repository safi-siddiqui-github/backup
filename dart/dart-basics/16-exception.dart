void main() {
  // Exceptions - Error Handling

  try {
    print(10 ~/ 0);
  } on Exception catch(e) {
    print('on $e');
  } catch (e) {
    print(e);
  } finally {
    print('No Error');
  }
}
