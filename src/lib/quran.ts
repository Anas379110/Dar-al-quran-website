import surahsIndexData from '../data/surahs-index.json';
import { alFatiha } from '../data/al-fatiha';
import type { SurahIndexEntry, SurahContent, TafsirEntry } from '../data/types';

const surahsIndex = surahsIndexData as SurahIndexEntry[];

// خريطة السور المُدخَلة فعليًا — سورة 1 فقط بمرحلة Scaffold، البقية تُضاف تباعًا بالـ AI Pipeline (D4)
const surahsContent: Record<number, SurahContent> = {
  1: alFatiha,
};

export function getSurahContent(number: number): SurahContent | null {
  return surahsContent[number] ?? null;
}

export function getSurahIndexEntry(number: number): SurahIndexEntry | undefined {
  return surahsIndex.find((s) => s.number === number);
}

export function getAllSurahs(): SurahIndexEntry[] {
  return surahsIndex;
}

/** FR1 — بحث فوري باسم السورة أو رقمها */
export function searchSurahs(query: string): SurahIndexEntry[] {
  const trimmed = query.trim();
  if (trimmed === '') return surahsIndex;

  const asNumber = Number(trimmed);
  if (!Number.isNaN(asNumber)) {
    return surahsIndex.filter((s) => s.number === asNumber);
  }
  return surahsIndex.filter((s) => s.nameArabic.includes(trimmed));
}

/**
 * SRS.md — دقة دينية حرجة: تفسير غير مُراجَع بشريًا (reviewedBy فارغ) لا يُعرض للزائر مطلقًا،
 * يُستبدل بحالة "قيد الإعداد" (Alternative Flow بـ Use Case). هذا أهم منطق بهذا الموقع.
 */
export function getReviewedTafsir(tafsir: TafsirEntry[]): TafsirEntry[] {
  return tafsir.filter((t) => t.reviewedBy.trim() !== '');
}

export function isVerseReady(content: SurahContent, verseNumber: number): boolean {
  const verse = content.verses.find((v) => v.verseNumber === verseNumber);
  if (!verse) return false;
  return getReviewedTafsir(verse.tafsir).length > 0;
}
