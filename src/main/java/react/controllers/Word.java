package react.controllers;

enum WordType {
	NOUN, ADJ, VERB
}

/**
 * @author kyle
 *
 */
public class Word {
	private WordType wordType;
	private String word;

	public Word(WordType wordType, String word) {
		super();
		this.wordType = wordType;
		this.word = word;
	}

	public Word(String wordType, String word) {
		super();
		try {
			this.wordType = WordType.valueOf(wordType.toUpperCase());
		} catch (Exception ex) {
			this.wordType = WordType.NOUN;
		}
		this.word = word;
	}

	public WordType getWordType() {
		return wordType;
	}

	public void setWordType(WordType wordType) {
		this.wordType = wordType;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	@Override
	public String toString() {
		return "Word [wordType=" + wordType + ", word=" + word + "]";
	}

}
