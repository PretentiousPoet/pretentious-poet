# Pretentious Poet

*Pretentious Poet* is poetry made easy. Simply pass our web API an image URL and we'll give you back a custom poem tailored to your picture!

## API Usage Example

**Endpoint:** GET: /api/poem PARAMETER: url

Example Java usage:
```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

public class Examples {

	public static String sendGet(String urlToRead) throws Exception {
		StringBuilder result = new StringBuilder();
		URL url = new URL(urlToRead);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String line;
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		rd.close();
		return result.toString();
	}

	public static void main(String[] args) throws Exception {
		String requestURL = "https://samples.clarifai.com/demo-1.jpg";
		System.out.println(sendGet("http://yoururl.com/api/poem?url=" 
		    + URLEncoder.encode(requestURL, "UTF-8")));
	}
}

```

### Usage
To build the project, run
```
mvn clean install
```
The maven frontend plugin is used to build the frontend components as well.

To run the hot-reload dev server, first start the Spring Application by running 'BootReactApplication.java', and then execute
```
npm run dev
```
in the `src/main/webapp` directory.

### System Dependencies

This project requires NPM, Node JS, and Maven 3 to be installed in order to run in dev mode. 

To install thse packages on Ubuntu, run the following:
```
sudo apt install mvn npm nodejs-legacy
```

