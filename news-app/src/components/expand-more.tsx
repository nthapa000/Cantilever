import { IconButton, IconButtonProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
  sx?: SxProps<Theme>;
}

const ExpandMore = ({ expand, sx, ...other }: ExpandMoreProps) => {
  return (
    <IconButton
      {...other}
      sx={{
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: (theme) =>
          theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        ...sx,
      }}
    />
  );
};

export default ExpandMore;
