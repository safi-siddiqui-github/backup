void main() {
  // Records
  final record = (4.5, isBool: true, 'hi');
  print([record, record.isBool, record.$2]);

  // They can be nullable
  (int, int)? record2 = (4, 5);
  record2 = null;
  
}
