import { describe, it, expect } from 'vitest';
import { getAllSurahs, searchSurahs, getReviewedTafsir, isVerseReady, getSurahContent, getSurahIndexEntry } from './quran';
import type { SurahContent, TafsirEntry } from '../data/types';

describe('getAllSurahs', () => {
  it('يُرجع 114 سورة بالضبط (FR1)', () => {
    expect(getAllSurahs()).toHaveLength(114);
  });

  it('يتضمن الفاتحة كأول سورة والناس كآخرها', () => {
    const all = getAllSurahs();
    expect(all[0].nameArabic).toBe('الفاتحة');
    expect(all[113].nameArabic).toBe('الناس');
  });
});

describe('searchSurahs', () => {
  it('يبحث بالاسم', () => {
    const results = searchSurahs('البقرة');
    expect(results).toHaveLength(1);
    expect(results[0].number).toBe(2);
  });

  it('يبحث بالرقم', () => {
    const results = searchSurahs('114');
    expect(results[0].nameArabic).toBe('الناس');
  });

  it('يُرجع الكل عند استعلام فارغ', () => {
    expect(searchSurahs('')).toHaveLength(114);
  });

  it('يُرجع نتائج فارغة لاستعلام غير مطابق', () => {
    expect(searchSurahs('سورة غير موجودة')).toHaveLength(0);
  });
});

function makeTafsir(overrides: Partial<TafsirEntry>): TafsirEntry {
  return { sourceBook: 'الطبري', content: 'نص', reviewedBy: '', ...overrides };
}

describe('getReviewedTafsir — القاعدة الدينية الأصرم بالبرنامج', () => {
  it('يستبعد أي تفسير بلا مراجعة بشرية (reviewedBy فارغ)', () => {
    const tafsir = [makeTafsir({ sourceBook: 'الطبري', reviewedBy: '' }), makeTafsir({ sourceBook: 'ابن كثير', reviewedBy: 'الشيخ محمد' })];
    const reviewed = getReviewedTafsir(tafsir);
    expect(reviewed).toHaveLength(1);
    expect(reviewed[0].sourceBook).toBe('ابن كثير');
  });

  it('يُرجع مصفوفة فارغة إن لم يُراجَع أي تفسير — لا يُخترع محتوى', () => {
    const tafsir = [makeTafsir({ reviewedBy: '' }), makeTafsir({ reviewedBy: '   ' })];
    expect(getReviewedTafsir(tafsir)).toHaveLength(0);
  });
});

describe('isVerseReady', () => {
  const content: SurahContent = {
    surahNumber: 1,
    nameArabic: 'الفاتحة',
    verses: [
      { verseNumber: 1, textArabic: 'نص', translationEnglish: 'text', tafsir: [makeTafsir({ reviewedBy: 'مراجع' })] },
      { verseNumber: 2, textArabic: 'نص', translationEnglish: 'text', tafsir: [makeTafsir({ reviewedBy: '' })] },
    ],
  };

  it('آية بتفسير مُراجَع = جاهزة', () => {
    expect(isVerseReady(content, 1)).toBe(true);
  });

  it('آية بتفسير غير مُراجَع = غير جاهزة (تُعرض "قيد الإعداد")', () => {
    expect(isVerseReady(content, 2)).toBe(false);
  });

  it('آية غير موجودة أصلًا = غير جاهزة', () => {
    expect(isVerseReady(content, 999)).toBe(false);
  });
});

describe('getSurahContent — معظم السور "قيد الإعداد" بمرحلة Scaffold', () => {
  it('سورة 1 (الفاتحة) لها محتوى فعلي', () => {
    expect(getSurahContent(1)).not.toBeNull();
    expect(getSurahContent(1)?.nameArabic).toBe('الفاتحة');
  });

  it('سورة 2 (البقرة) بلا محتوى بعد — null صراحة، لا بيانات مُختلَقة', () => {
    expect(getSurahContent(2)).toBeNull();
  });

  it('سورة 114 (الناس) بلا محتوى بعد', () => {
    expect(getSurahContent(114)).toBeNull();
  });
});

describe('getSurahIndexEntry', () => {
  it('يُرجع بيانات الفهرس الصحيحة لرقم سورة صالح', () => {
    const entry = getSurahIndexEntry(2);
    expect(entry?.nameArabic).toBe('البقرة');
    expect(entry?.versesCount).toBe(286);
  });

  it('يُرجع undefined لرقم غير صالح', () => {
    expect(getSurahIndexEntry(200)).toBeUndefined();
  });
});
