import type { SurahContent } from './types';

/**
 * بيانات نموذجية (Placeholder) لإثبات البنية فقط.
 * قبل الإطلاق الفعلي: النص العربي والترجمة يُجلبان من Quran.com API (مؤكَّد بـ SRS.md)،
 * والتفسير يُصاغ AI من الطبري/ابن كثير/السعدي (مؤكَّد) ثم يُراجَع بشريًا إلزاميًا (D4/D11).
 */
export const alFatiha: SurahContent = {
  surahNumber: 1,
  nameArabic: 'الفاتحة',
  verses: [
    {
      verseNumber: 1,
      textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translationEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      tafsir: [
        {
          sourceBook: 'الطبري',
          content: '[نموذج — يُستبدل بتفسير الطبري الفعلي المُراجَع بشريًا قبل النشر]',
          reviewedBy: '',
          reviewedAt: undefined,
        },
        {
          sourceBook: 'ابن كثير',
          content: '[نموذج — يُستبدل بتفسير ابن كثير الفعلي المُراجَع بشريًا قبل النشر]',
          reviewedBy: '',
          reviewedAt: undefined,
        },
        {
          sourceBook: 'السعدي',
          content: '[نموذج — يُستبدل بتفسير السعدي الفعلي المُراجَع بشريًا قبل النشر]',
          reviewedBy: '',
          reviewedAt: undefined,
        },
      ],
    },
  ],
};
