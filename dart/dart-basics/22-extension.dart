void main() {
  // Extension

  // final text = CapitaliseFirstletter('this is monday').capitaliseFirstLetter();
  String text = 'tuesday';
  text = text.capitaliseFirstLetter();
  print(text);
}

extension CapitaliseFirstletter on String {
  String capitaliseFirstLetter() {
    return this[0].toUpperCase() + this.substring(1);
  }
}
