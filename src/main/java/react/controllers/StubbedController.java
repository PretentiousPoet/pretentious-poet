package react.controllers;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by jared on 10/7/16.
 */

@Controller
@RequestMapping("/api")
public class StubbedController {
	@RequestMapping(method = RequestMethod.GET, value = "poem")
	HttpEntity<String> generatePoem(@RequestParam("url") String url) {
		return new ResponseEntity<>("         Hello World: " + url, HttpStatus.OK);
	}
}
