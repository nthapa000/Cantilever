// components/Main.tsx
'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Article } from '@/@types/news';
import ShowItem from './show-items';


interface MainProps {
  posts: Article[];
  title: string;
  bookmarks: Article[];
}

const Main: React.FC<MainProps> = ({ posts, title, bookmarks }) => (
  <Grid item xs={12} md={8} sx={{ '& .markdown': { py: 3 } }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Divider />
    {posts.map((post) => (
      <ShowItem key={post.title} title={post.title} description={post.description} image={post.urlToImage} bookmarks={bookmarks} />
    ))}
  </Grid>
);

export default Main;
