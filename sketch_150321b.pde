import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;

void setup()
{
  String url = "http://emotional-cartography.herokuapp.com/api";
   
  try
  {
    DefaultHttpClient httpClient = new DefaultHttpClient();
    
    StringEntity data = new StringEntity("[{\"timestamp\":\"2015-03-21T19:51:35.052Z\",\"location\":{\"lat\":123,\"long\":123},\"uuid\":\"xxx\"}]");

    HttpPost          httpPost   = new HttpPost( url );
                      httpPost.addHeader("Content-Type", "application/json;charset=UTF-8");
                      httpPost.setEntity(data);
    
    println( "executing request: " + httpPost.getRequestLine() );
    println( httpPost.getEntity() );
    
    HttpResponse response = httpClient.execute( httpPost );
    HttpEntity   entity   = response.getEntity();
    
    
    println("----------------------------------------");
    println( response.getStatusLine() );
    println("----------------------------------------");
    
    if( entity != null ) entity.writeTo( System.out );
    if( entity != null ) entity.consumeContent();

    
    // When HttpClient instance is no longer needed, 
    // shut down the connection manager to ensure
    // immediate deallocation of all system resources
    httpClient.getConnectionManager().shutdown();       
    
  } catch( Exception e ) { e.printStackTrace(); }
   
  exit();
}
