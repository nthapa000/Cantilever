import { Article } from "@/@types/news";
import { format } from "date-fns/format";

export const addBookmark = async (news: Article) => {
  try {
    console.log('news', )
    await fetch('/api/bookmark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ news }),
    });
    // You can handle updating the bookmarks state here if necessary
  } catch (error) {
    console.error('Error adding bookmark:', error);
  }
};

const formatDate = (date: Date) => format(new Date(), 'MM/dd/yyyy');

export const DATE_UTILS = {
  formatDate
}
