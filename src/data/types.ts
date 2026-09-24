export interface SurahIndexEntry {
  number: number;
  nameArabic: string;
  versesCount: number;
}

export interface TafsirEntry {
  sourceBook: 'الطبري' | 'ابن كثير' | 'السعدي';
  content: string;
  reviewedBy: string; // فارغ = غير مُراجَع بعد، لا يُنشر (D4/D11)
  reviewedAt?: Date;
}

export interface Verse {
  verseNumber: number;
  textArabic: string;
  translationEnglish: string;
  tafsir: TafsirEntry[];
}

export interface SurahContent {
  surahNumber: number;
  nameArabic: string;
  verses: Verse[];
}
