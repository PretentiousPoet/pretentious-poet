package react.controllers;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class RegexWordProcessor {

	private static final RegexWordProcessor INSTANCE = new RegexWordProcessor();

	/**
	 * Returns a singleton instance of the WordProcessor
	 * 
	 * @return
	 */
	public static final RegexWordProcessor getInstance() {
		return INSTANCE;
	}

	private final Set<String> ignores = new HashSet<>();
	private LinkedList<Replacer> plurs = new LinkedList<>();
	private LinkedList<Replacer> sings = new LinkedList<>();

	private RegexWordProcessor() {
		init();
	}

	public String pluralize(String word) {
		if (word == null)
			return null;
		String wordStr = word.trim();
		if (wordStr.length() == 0)
			return wordStr;
		if (isIgnorable(wordStr))
			return wordStr;
		for (Replacer rule : this.plurs) {
			String result = rule.replace(wordStr);
			if (result != null)
				return result;
		}
		return wordStr;
	}

	public String singularize(String word) {
		if (word == null)
			return null;
		String wordStr = word.trim();
		if (wordStr.length() == 0)
			return wordStr;
		if (isIgnorable(wordStr))
			return wordStr;
		for (Replacer repl : this.sings) {
			String result = repl.replace(wordStr);
			if (result != null)
				return result;
		}
		return wordStr;
	}

	private boolean isIgnorable(String word) {
		if (word == null)
			return false;
		return this.ignores.contains(word.trim().toLowerCase());
	}

	private final class Replacer {

		private final String orig;
		private final String repl;
		private final Pattern regex;

		private Replacer(String orig, String repl) {
			this.orig = (orig != null) ? orig : "";
			this.repl = (repl != null) ? repl : "";
			this.regex = Pattern.compile(this.orig, Pattern.CASE_INSENSITIVE);
		}

		private String replace(String input) {
			Matcher matcher = this.regex.matcher(input);
			if (!matcher.find())
				return null;
			return matcher.replaceAll(this.repl);
		}

		@Override
		public int hashCode() {
			return orig.hashCode();
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Replacer other = (Replacer) obj;
			if (!getOuterType().equals(other.getOuterType()))
				return false;
			if (orig == null) {
				if (other.orig != null)
					return false;
			} else if (!orig.equalsIgnoreCase(other.orig))
				return false;
			return true;
		}

		@Override
		public String toString() {
			return orig + " -> " + repl;
		}

		private RegexWordProcessor getOuterType() {
			return RegexWordProcessor.this;
		}
	}

	/**
	 * Populates the WordProcessor with data.
	 */
	private void init() {
		RegexWordProcessor wp = this;
		wp.addPlural("$", "s");
		wp.addPlural("s$", "s");
		wp.addPlural("(ax|test)is$", "$1es");
		wp.addPlural("(octop|vir)us$", "$1i");
		wp.addPlural("(octop|vir)i$", "$1i");
		wp.addPlural("(alias|status)$", "$1es");
		wp.addPlural("(bu)s$", "$1ses");
		wp.addPlural("(buffal|tomat)o$", "$1oes");
		wp.addPlural("([ti])um$", "$1a");
		wp.addPlural("([ti])a$", "$1a");
		wp.addPlural("sis$", "ses");
		wp.addPlural("(?:([^f])fe|([lr])f)$", "$1$2ves");
		wp.addPlural("(hive)$", "$1s");
		wp.addPlural("([^aeiouy]|qu)y$", "$1ies");
		wp.addPlural("(x|ch|ss|sh)$", "$1es");
		wp.addPlural("(matr|vert|ind)ix|ex$", "$1ices");
		wp.addPlural("([m|l])ouse$", "$1ice");
		wp.addPlural("([m|l])ice$", "$1ice");
		wp.addPlural("^(ox)$", "$1en");
		wp.addPlural("(quiz)$", "$1zes");
		wp.addPlural("(people|men|children|sexes|moves|stadiums)$", "$1");
		wp.addPlural("(oxen|octopi|viri|aliases|quizzes)$", "$1");
		wp.addSingular("s$", "");
		wp.addSingular("(s|si|u)s$", "$1s");
		wp.addSingular("(n)ews$", "$1ews");
		wp.addSingular("([ti])a$", "$1um");
		wp.addSingular("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$", "$1$2sis");
		wp.addSingular("(^analy)ses$", "$1sis");
		wp.addSingular("(^analy)sis$", "$1sis");
		wp.addSingular("([^f])ves$", "$1fe");
		wp.addSingular("(hive)s$", "$1");
		wp.addSingular("(tive)s$", "$1");
		wp.addSingular("([lr])ves$", "$1f");
		wp.addSingular("([^aeiouy]|qu)ies$", "$1y");
		wp.addSingular("(s)eries$", "$1eries");
		wp.addSingular("(m)ovies$", "$1ovie");
		wp.addSingular("(x|ch|ss|sh)es$", "$1");
		wp.addSingular("([m|l])ice$", "$1ouse");
		wp.addSingular("(bus)es$", "$1");
		wp.addSingular("(o)es$", "$1");
		wp.addSingular("(shoe)s$", "$1");
		wp.addSingular("(cris|ax|test)is$", "$1is");
		wp.addSingular("(cris|ax|test)es$", "$1is");
		wp.addSingular("(octop|vir)i$", "$1us");
		wp.addSingular("(octop|vir)us$", "$1us");
		wp.addSingular("(alias|status)es$", "$1");
		wp.addSingular("(alias|status)$", "$1");
		wp.addSingular("^(ox)en", "$1");
		wp.addSingular("(vert|ind)ices$", "$1ex");
		wp.addSingular("(matr)ices$", "$1ix");
		wp.addSingular("(quiz)zes$", "$1");
		wp.addIgnores("rice", "fish", "sheep");
	}

	private void addPlural(String orig, String repl) {
		Replacer plur = new Replacer(orig, repl);
		this.plurs.addFirst(plur);
	}

	private void addSingular(String orig, String repl) {
		Replacer sing = new Replacer(orig, repl);
		this.sings.addFirst(sing);
	}

	private void addIrregular(String sing, String plur) {
		String singRem = sing.length() > 1 ? sing.substring(1) : "";
		String plurRem = plur.length() > 1 ? plur.substring(1) : "";
		addPlural("(" + sing.charAt(0) + ")" + singRem + "$", "$1" + plurRem);
		addSingular("(" + plur.charAt(0) + ")" + plurRem + "$", "$1" + singRem);
	}

	private void addIgnores(String... igns) {
		if (igns == null || igns.length == 0)
			return;
		for (String ign : igns) {
			if (ign != null)
				ignores.add(ign.trim().toLowerCase());
		}
	}

}