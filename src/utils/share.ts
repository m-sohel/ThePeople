import { Share } from 'react-native';
import { Article } from '@/types/constitution';

export async function shareArticle(article: Article): Promise<void> {
  try {
    const message = `📜 Constitution of India — Article ${article.number}
Title: ${article.title}
Part: ${article.part || 'Constitution of India'}

"${article.fullText.slice(0, 500)}${article.fullText.length > 500 ? '...' : ''}"

— Shared via ThePeople App (Educating every Indian citizen)`;

    await Share.share({
      message,
      title: `Article ${article.number}: ${article.title}`,
    });
  } catch (error) {
    console.warn('[Share] Failed to share article:', error);
  }
}

export async function sharePreamble(preambleText: string): Promise<void> {
  try {
    const message = `🇮🇳 THE PREAMBLE — Constitution of India

"${preambleText}"

— Shared via ThePeople App`;

    await Share.share({
      message,
      title: 'Preamble to the Constitution of India',
    });
  } catch (error) {
    console.warn('[Share] Failed to share preamble:', error);
  }
}

