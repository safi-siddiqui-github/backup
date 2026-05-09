import 'dart:convert' as convert;
import 'package:http/http.dart' as http;

void main() async {
  // This example uses the Google Books API to search for books about http.
  // https://developers.google.com/books/docs/overview
  // var url =
  //     Uri.https('www.googleapis.com', '/books/v1/volumes', {'q': '{http}'});

  // // Await the http get response, then decode the json-formatted response.
  // var response = await http.get(url);
  // if (response.statusCode == 200) {
  //   var jsonResponse =
  //       convert.jsonDecode(response.body) as Map<String, dynamic>;
  //   var itemCount = jsonResponse['totalItems'];
  //   print('Number of books about http: $itemCount.');
  // } else {
  //   print('Request failed with status: ${response.statusCode}.');
  // }

  var url = Uri.https('jsonplaceholder.typicode.com', '/users');
  var res;
  try {
    res = await http.get(url);
    if (res.statusCode == 200) {
      // res.body returns a string
      var jres = convert.jsonDecode(res.body) as List<dynamic>;
      print(jres);
    }
  } catch (e) {
    print(e);
  }
}
