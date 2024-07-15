// components/FeaturedPost.tsx
'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Article } from '@/@types/news';
import { addBookmark, DATE_UTILS } from '@/utils';

interface FeaturedPostProps {
  post: Article;
  bookmarks?: Article[];
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post, bookmarks = [] }) => {
  const handleBookmarkClick = () => {
    addBookmark(post);
  };

  const isBookmarked = bookmarks.some(bookmark => bookmark.url === post.url);
  const formattedDate = DATE_UTILS.formatDate(new Date(post.publishedAt));

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={post.url}>
        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {formattedDate}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          {post.urlToImage && (
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={post.urlToImage}
              alt={post.title}
            />
          )}
        </Card>
      </CardActionArea>
      <IconButton onClick={handleBookmarkClick} aria-label="bookmark" color={isBookmarked ? "primary" : "default"}>
        <BookmarkIcon />
      </IconButton>
    </Grid>
  );
}

export default FeaturedPost;
