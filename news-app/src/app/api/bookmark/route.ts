import { NextRequest, NextResponse } from 'next/server';

interface News {
  title: string;
  description: string;
  url: string; // Added url to uniquely identify the news
}

let bookmarks: News[] = [];

export async function GET(request: NextRequest) {
  console.log("GET /api/bookmark called");
  return NextResponse.json({ bookmarks });
}

export async function POST(request: NextRequest) {
  const { news } = await request.json();
  console.log("POST /api/bookmark called with", news);
  if (!bookmarks.find((bookmark) => bookmark.url === news.url)) {
    bookmarks.push(news);
  }
  return NextResponse.json({ message: 'Bookmark added', bookmarks }, { status: 201 });
}

