// app/page.tsx
import Main from '@/components/main';
import Sidebar from '@/components/sidebar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Article } from '@/@types/news';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import MainFeaturedPost from '@/components/main-features-post';
import FeaturedPost from '@/components/feature-post';

const API_KEY = process.env.NEXT_PUBLIC_NEW_API_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function fetchNews() {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  if (!res.ok) {
    throw new Error('Failed to fetch news: ' + JSON.stringify(res));
  }
  const data = await res.json();
  return data.articles as Article[];
}

const fetchBookmarks = async () => {
  const res = await fetch(`${BASE_URL}/api/bookmark`);
  if (!res.ok) {
    throw new Error('Failed to fetch bookmarks: ' + JSON.stringify(res));
  }
  const bookmarksData = await res.json();
  return bookmarksData.bookmarks;
}

export default async function Home() {
  const articles = await fetchNews();
  const bookmarks = await fetchBookmarks();

  const mainFeaturedPost = articles[0];
  const featuredPosts = articles.slice(1, 3);
  const posts = articles.slice(3);

  const sidebar = {
    title: 'About',
    description: 'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      // More archives...
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'X', icon: XIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };

  return (
    <Container maxWidth="lg">
      <main>
        {mainFeaturedPost && <MainFeaturedPost bookmarks={bookmarks}  post={mainFeaturedPost} />}
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} bookmarks={bookmarks}  post={post} />
          ))}
        </Grid>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Main title="Latest News" bookmarks={bookmarks}  posts={posts} />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
        </Grid>
      </main>
    </Container>
  );
}
