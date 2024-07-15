import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Header from './header';
import MainFeaturedPost from './main-features-post';
import FeaturedPost from './feature-post';
import Main from './main';
import Sidebar from './sidebar';
import Footer from './footer';
import PLACEHOLDERS from '@/constants/placeholders';
import useNewsData from '@/hooks/useNewsData';
import { GetServerSideProps } from 'next';
import { Article } from '@/@types/news';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

const posts = [];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};


interface BlogProps {
  initialMainFeaturedPost: Article | null;
  initialFeaturedPosts: Article[];
  initialPosts: Article[];
}

const Blog: React.FC<BlogProps> = ({ initialMainFeaturedPost, initialFeaturedPosts, initialPosts }) => {
  const { featuredPosts, mainFeaturedPost, posts } = useNewsData(initialMainFeaturedPost, initialFeaturedPosts, initialPosts);
  console.log('blog', featuredPosts, mainFeaturedPost, posts)
  return (
    <Container maxWidth='lg'>
      <Header
        title={PLACEHOLDERS.APP_TITLE}
        sections={sections}
      />
      <main>
        {mainFeaturedPost && <MainFeaturedPost post={mainFeaturedPost} /> }
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Main title="Latest News" posts={posts} />
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


export const getServerSideProps: GetServerSideProps = async () => {
  try {
    console.log('backend start')
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEW_API_TOKEN}`
    );
    const data = await response.json();
    const articles = data.articles;
    console.log('backend', {data, articles})

    return {
      props: {
        initialMainFeaturedPost: articles[0] || null,
        initialFeaturedPosts: articles.slice(1, 3) || [],
        initialPosts: articles.slice(3) || [],
      },
    };
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return {
      props: {
        initialMainFeaturedPost: null,
        initialFeaturedPosts: [],
        initialPosts: [],
      },
    };
  }
};

export default Blog;
