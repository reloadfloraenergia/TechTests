export type Phonetic = {
  text?: string;
  audio?: string;
};

export type Definition = {
  definition: string;
  example?: string;
  synonyms?: string[];
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
};

export type DictionaryEntry = {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  meanings: Meaning[];
  sourceUrls?: string[];
};