// components/ShowItem.tsx
'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpandMore from './expand-more';
import { addBookmark, DATE_UTILS } from '@/utils';
import { Article } from '@/@types/news';

interface ShowItemProps {
  title: string;
  description: string;
  image: string;
  bookmarks?: Article[];
}

const ShowItem: React.FC<ShowItemProps> = ({ title, description, image, bookmarks = [] }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBookmarkClick = () => {
    addBookmark({
      title, description, url: image,
      source: {
        id: null,
        name: ''
      },
      author: null,
      urlToImage: '',
      publishedAt: '',
      content: ''
    }); // Assuming 'url' is the image URL for uniqueness
  };

  const isBookmarked = bookmarks.some(bookmark => bookmark.url === image);
  const formattedDate = DATE_UTILS.formatDate(new Date());

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title || 'DEFAULT'}
        subheader={formattedDate}
      />
      {image && (
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt={title}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={handleBookmarkClick} aria-label="bookmark" color={isBookmarked ? "primary" : "default"}>
          <BookmarkIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Additional details about the article can be shown here.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ShowItem;
