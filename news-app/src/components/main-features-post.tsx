// components/MainFeaturedPost.tsx
'use client';

import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Article } from '@/@types/news';
import { addBookmark } from '@/utils';

interface MainFeaturedPostProps {
  post: Article;
  bookmarks?: Article[];
}

export default function MainFeaturedPost(props: MainFeaturedPostProps) {
  const { post, bookmarks = [] } = props;

  const handleBookmarkClick = () => {
    addBookmark(post);
  };

  const isBookmarked = bookmarks.some(bookmark => bookmark.url === post.url);

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.urlToImage})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.urlToImage} alt={post.title} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Link variant="subtitle1" href={post.url}>
              Continue reading...
            </Link>
            <IconButton onClick={handleBookmarkClick} aria-label="bookmark" color={isBookmarked ? "primary" : "default"}>
              <BookmarkIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}