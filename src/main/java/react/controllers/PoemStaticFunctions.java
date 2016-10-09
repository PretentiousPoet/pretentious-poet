package react.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.yaml.snakeyaml.Yaml;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;



public class PoemStaticFunctions {
	static Random r = new Random();
	static Map<String, List<String>> map;
	static RegexWordProcessor rwp = RegexWordProcessor.getInstance();
	static List<Word> synonyms;
	static int COMPLEXITY = 2;
	static double PROBABILITY = 1.0;
	static int NUM_POEMS = 128;
	static int NUM_POOLS = 20;
	static int NUM_GENERATIONS = 2;
	static int OPTIMAL_WORD_LENGTH = 200;

//	public static void main(String[] args) throws FileNotFoundException {
//
//		List<String> sampleInputs = Arrays.asList("");
//		String imgUrl = "http://cdn3-www.dogtime.com/assets/uploads/2011/01/file_23192_pembroke-welsh-corgi.jpg";
//		System.out.println(runPoemGen(imgUrl));
//	}

	public static String runPoemGen(String imgUrl) {
		List<String> tags = processImage(imgUrl);

		synonyms = new ArrayList<>();
		for (String tag : tags) {
			synonyms.addAll(scrapeThesaurus(tag, COMPLEXITY));
		}

		// Prevents swears form occuring in poem.
		List<String> swears = Arrays.asList("bitch", "fuck", "nigger", "nigga", "cunt", "shit", "cock", "dyke", "dike",
				"tranny", "spick", "raghead", "kike", "ass");

		synonyms.removeIf(w -> swears.contains(w.getWord()));

		map = loadYAML();
		map.put("<p>", Arrays.asList("\n"));
		String basePoemStr = getRandomString(map.get("<poem>"));

		List<PoemJoinList> bestPoems = new ArrayList<>();

		for (int x = 0; x < NUM_GENERATIONS; x++) {
			for (int k = 0; k < NUM_POOLS; k++) {
				// Create 1 tree.
				PoemJoinList resultJoinlist = new PoemJoinList("<poem>", new Poem(basePoemStr, 0), map, synonyms);
				for (int i = 0; i < NUM_POEMS; i++) {
					basePoemStr = getRandomString(map.get("<poem>"));
					PoemJoinList pjl = new PoemJoinList("<poem>", new Poem(basePoemStr, 0), map, synonyms);
					resultJoinlist = getBetterPoemJoinList(resultJoinlist, pjl);
				}

				switch (r.nextInt(2)) {
				case 0: // add stanza
				{
					String baseStanzaString = getRandomString(map.get("<stanza>"));
					PoemJoinList stanza = new PoemJoinList("<stanza>", new Poem(baseStanzaString, 0), map, synonyms);
					PoemJoinList copy = new PoemJoinList(resultJoinlist);
					copy.substitution.add(stanza);
					copy.currentLevelPoem.poem += " <stanza>";
					copy.substitutionCount += stanza.substitutionCount;
					resultJoinlist = getBetterPoemJoinList(resultJoinlist, copy);
				}
					break;
				default: // sexually reproduce
				{
					// no poem to reproduce with
					if (bestPoems.isEmpty()) {
						break;
					}
					PoemJoinList copy = new PoemJoinList(resultJoinlist);
					PoemJoinList prevPoemCopy = bestPoems.get(bestPoems.size() - 1);
					PoemJoinList copyFirstStanza = new PoemJoinList(copy.substitution.stream()
							.filter(e -> e.tagType.equals("<stanza>")).collect(Collectors.toList()).get(0));
					PoemJoinList copyPrevPoemFirstStanza = new PoemJoinList(prevPoemCopy.substitution.stream()
							.filter(e -> e.tagType.equals("<stanza>")).collect(Collectors.toList()).get(0));
					for (int i = 0; i < copy.substitution.size(); i++) {
						if (copy.substitution.get(i).tagType.equals("<stanza>")) {

							copy.substitutionCount = copy.substitutionCount - copyFirstStanza.substitutionCount
									+ copyPrevPoemFirstStanza.substitutionCount;
							copy.substitution.set(i, copyPrevPoemFirstStanza);

							break;
						}
					}

					for (int i = 0; i < prevPoemCopy.substitution.size(); i++) {
						if (copy.substitution.get(i).tagType.equals("<stanza>")) {
							copy.substitutionCount = copy.substitutionCount + copyFirstStanza.substitutionCount
									- copyPrevPoemFirstStanza.substitutionCount;
							copy.substitution.set(i, copyFirstStanza);
							break;
						}
					}

					PoemJoinList best = copy;
					best = getBetterPoemJoinList(best, resultJoinlist);
					best = getBetterPoemJoinList(best, prevPoemCopy);
					best = getBetterPoemJoinList(best, bestPoems.get(bestPoems.size() - 1));
					resultJoinlist = best;
				}
					break;
				}

				bestPoems.add(resultJoinlist);

			}
		}

		PoemJoinList bestOverall = bestPoems.get(0);
		for (PoemJoinList bestPoem : bestPoems) {
			bestOverall = getBetterPoemJoinList(bestOverall, bestPoem);
		}

		StringBuffer sb = new StringBuffer();
		for (String s : Arrays.asList(bestOverall.toString().split("\n"))) {
			s = s.trim().replace(" .", ".").replaceAll("  ", " ").replaceAll(" ,", ",").replaceAll(" \\?", "?")
					.replaceAll(" !", "!").replaceAll(" 's", "'s");
			int padding = r.nextInt(5);
			for (int i = 0; i < padding; i++) {
				sb.append("SpacE");
			}
			sb.append(s + "NewlinE");
		}
		return sb.toString();
	}

	public static PoemJoinList getBetterPoemJoinList(PoemJoinList resultPoem1, PoemJoinList resultPoem2) {
		double alpha = 50;
		double beta = 2;
		double gamma = 0.5;

		double p1Score = ((double) resultPoem1.substitutionCount / (double) resultPoem1.toString().length()) * alpha
				- (double) Math.abs(
						(OPTIMAL_WORD_LENGTH + resultPoem1.synonyms.size() * gamma) - resultPoem1.toString().length())
						* beta;
		double p2Score = ((double) resultPoem2.substitutionCount / (double) resultPoem2.toString().length()) * alpha
				- (double) Math.abs(
						(OPTIMAL_WORD_LENGTH + resultPoem2.synonyms.size() * gamma) - resultPoem2.toString().length())
						* beta;

		// System.out.println(p1Score + " vs " + p2Score);
		if (p1Score > p2Score)
			return resultPoem1;
		else
			return resultPoem2;
	}

	public static List<String> processImage(String url) {
		String request = "https://api.clarifai.com/v1/tag?url=" + url + "&access_token=Bg00W5ppVdTZWNJA5vISrwazC77gYP";
		try {
			String response = Utils.getRequest(request);

			// System.out.println(request);
			// System.out.println(response);
			// create ObjectMapper instance
			ObjectMapper objectMapper = new ObjectMapper();

			// read JSON like DOM Parser
			JsonNode rootNode;

			rootNode = objectMapper.readTree(response);

			JsonNode results = rootNode.get("results");
			JsonNode resutsListNode = results.get(0).get("result").get("tag").get("classes");

			List<String> resultsList = new ArrayList<>();
			for (JsonNode result : resutsListNode) {
				resultsList.add(result.asText());
			}
			return resultsList;

		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return new ArrayList<String>();

	}

	public static List<Word> scrapeThesaurus(String term, int level) {
		Document doc;
		try {
			doc = Jsoup.connect("http://www.thesaurus.com/browse/" + term).get();
			Element relevancyList = doc.select("div.relevancy-list").first();
			if (relevancyList != null) {

				Elements links = relevancyList.select("a[href]");
				Elements spans = relevancyList.select("a[href] > span.text");

				List<String> strings = new ArrayList<>();
				int i = 0;
				for (Element link : links) {
					int complexity = Integer.parseInt(link.attr("data-complexity"));
					if (complexity >= level) {
						String string = spans.get(i).text();
						strings.add(string);
					}
					++i;
				}
				final String type = doc.select("em.txt").first().text();
				List<Word> words = strings.parallelStream().map(string -> new Word(type, string))
						.collect(Collectors.toList());
				List<Word> wordsadded = new ArrayList<>();
				wordsadded.addAll(words);
				wordsadded.add(new Word(type, term));
				return wordsadded;
			}
		} catch (IOException e) {
		}
		return new ArrayList<Word>();
	}

	public static String getRandomString(List<String> lst) {
		if (lst.size() > 0) {
			return lst.get(r.nextInt(lst.size()));
		}
		return "";
	}

	@SuppressWarnings("unchecked")
	public static Map<String, List<String>> loadYAML() {
		Yaml yaml = new Yaml();

		Map<String, List<String>> values = null;

		try {
			values = (Map<String, List<String>>) yaml.load(new FileInputStream(new File("context_free_grammar.yaml")));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return values;
	}
}
