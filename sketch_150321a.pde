import com.francisli.processing.http.*;
 
HttpClient client;
 
void setup() {
  // create new client
  client = new HttpClient(this, "emotional-cartography.herokuapp.com");
  
  HashMap loc = new HashMap();
  int lat = 123;
  int longi = 456;
  
  loc.put("lat", lat);
  loc.put("long", longi);
  
  HashMap params = new HashMap();
 
  // pass parameters as key-value pairs
  params.put("location", loc);
  params.put("timestamp", "Sat Mar 21 2015 18:19:55 GMT+0000 (GMT Standard Time)");
  params.put("uuid", "Ben");
  
  println(params);
 
  // make the request
  client.POST("/api", params);
}
 
void responseReceived(HttpRequest request, HttpResponse response) {
  // print the json response as a string
  println(response.getContentAsString());
}
 
void draw() {
 
}
