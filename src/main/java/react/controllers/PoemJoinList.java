package react.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

public class PoemJoinList {
	public String tagType;
	public Poem currentLevelPoem;
	public List<PoemJoinList> substitution;
	Map<String, List<String>> map;
	List<Word> synonyms;
	Random r = new Random();
	RegexWordProcessor rwp = RegexWordProcessor.getInstance();
	int substitutionCount;

	static double PROBABILITY = 1.0;

	public PoemJoinList(PoemJoinList pjl) {
		super();
		this.tagType = pjl.tagType;
		this.currentLevelPoem = new Poem(pjl.currentLevelPoem.poem, pjl.currentLevelPoem.num_substitutes);
		this.substitution = new ArrayList<>();
		for (PoemJoinList copy : pjl.substitution) {
			PoemJoinList p = new PoemJoinList(copy);
			substitution.add(p);
		}
		this.map = pjl.map;
		this.synonyms = pjl.synonyms;
		substitutionCount = pjl.substitutionCount;
	}

	public PoemJoinList(String tagType, Poem poem, Map<String, List<String>> map, List<Word> synonyms) {
		super();
		this.tagType = tagType;
		this.currentLevelPoem = poem;
		this.substitution = new ArrayList<>();
		this.map = map;
		this.synonyms = synonyms;
		substitutionCount = 0;
		createSubstitutions();
	}

	public void createSubstitutions() {
		List<String> tagsToSubstitute = new ArrayList<>();
		int startIndex;
		int endIndex;
		int lookIndex = 0;
		while ((startIndex = currentLevelPoem.poem.indexOf("<", lookIndex)) >= 0) {
			lookIndex = startIndex + 1;
			endIndex = currentLevelPoem.poem.indexOf(">", startIndex);
			String tag = currentLevelPoem.poem.substring(startIndex, endIndex + 1);
			tagsToSubstitute.add(tag);
		}

		for (String rawTag : tagsToSubstitute) {

			int refCount = 0;

			String rawTagLimited = rawTag.replace("-pr", "").replace("-pl", "").replaceAll("-inf", "")
					.replaceAll("-past", "");

			List<String> mapVal = map.get(rawTagLimited);

			String tag = rawTag.replaceAll("<", "").replaceAll(">", "");
			if (tag.contains(WordType.NOUN.toString().toLowerCase()) || tag.contains("person")) {
				if (Math.random() < PROBABILITY) {
					List<String> mapValTemp = synonyms.stream().filter(word -> word.getWordType() == WordType.NOUN)
							.map(word -> word.getWord()).collect(Collectors.toList());
					if (!mapValTemp.isEmpty()) {
						mapVal = mapValTemp;
					}
					refCount++;
				}
			} else if (tag.contains(WordType.ADJ.toString().toLowerCase())) {
				if (Math.random() < PROBABILITY) {
					List<String> mapValTemp = synonyms.stream().filter(word -> word.getWordType() == WordType.ADJ)
							.map(word -> word.getWord()).collect(Collectors.toList());
					if (!mapValTemp.isEmpty()) {
						mapVal = mapValTemp;
					}
					refCount++;
				}

			} else if (tag.contains(WordType.VERB.toString().toLowerCase())) {
				if (Math.random() < PROBABILITY) {
					List<String> mapValTemp = synonyms.stream().filter(word -> word.getWordType() == WordType.VERB)
							.map(word -> word.getWord()).collect(Collectors.toList());
					if (!mapValTemp.isEmpty()) {
						mapVal = mapValTemp;
					}
					refCount++;
				}
			}

			String subJoinListString = getRandomString(mapVal);

			if (rawTag.contains("-pr")) {
				subJoinListString = rwp.pluralize(subJoinListString);
			} else if (rawTag.contains("-pl")) {
				subJoinListString = rwp.pluralize(subJoinListString);
			}
			// System.out.println(rawTag + " -> \"" + subJoinListString + "\"");
			Poem subJoinListPoem = new Poem(subJoinListString, refCount);

			PoemJoinList subJoinList = new PoemJoinList(rawTag, subJoinListPoem, map, synonyms);
			substitution.add(subJoinList);

			this.substitutionCount += subJoinList.substitutionCount + refCount;
		}

	}

	public String getRandomString(List<String> lst) {
		if (lst.size() > 0) {
			return lst.get(r.nextInt(lst.size()));
		}
		return "";
	}

	@Override
	public String toString() {
		String currentString = this.currentLevelPoem.poem;
		int startIndex;
		int endIndex;
		int lookIndex = 0;
		int i = 0;
		while ((startIndex = currentLevelPoem.poem.indexOf("<", lookIndex)) >= 0) {
			lookIndex = startIndex + 1;
			endIndex = currentLevelPoem.poem.indexOf(">", startIndex);
			String tag = currentLevelPoem.poem.substring(startIndex, endIndex + 1);
			currentString = currentString.replaceFirst(tag, substitution.get(i).toString());
			i++;
		}

		return currentString;
	}

}
