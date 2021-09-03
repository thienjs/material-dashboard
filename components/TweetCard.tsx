import { Box, Chip, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@ramonak/paper';
import clsx from 'clsx';
import Link from 'next/link';

import { ITweet } from '../types/general';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(1),
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paddingSide: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: 'grey',
  },
  tweet: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
  },
  reply: {
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
  },
}));

const TweetCard = (props: ITweet): JSX.Element => {
  const {
    text,
    created_at,
    retweet_count,
    favorite_count,
    in_reply_to_status_id,
    truncated,
  } = props;
  const classes = useStyles();

  const transformTweet = () => {
    const twitterLink = ' https://t.co/';
    const parts = text.split(twitterLink);
    const tweet = parts[0];
    const link = twitterLink.concat(parts[1]);
    return (
      <div>
        <Typography>
          {tweet}
          <Link href={link}>
            <a target="_blank" className={classes.link}>
              <Typography variant="caption" component="span">
                Read More
              </Typography>
            </a>
          </Link>
        </Typography>
      </div>
    );
  };

  return (
    <Paper elevation={3} customClass={classes.container}>
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <div className={classes.rowSpaceBetween}>
          <Chip
            variant="outlined"
            className={in_reply_to_status_id ? classes.reply : classes.tweet}
            // color={in_reply_to_status_id ? 'secondary' : 'primary'}
            label={in_reply_to_status_id ? 'Reply' : 'Tweet'}
          />
          <div className={classes.row}>
            <Typography variant="subtitle2">Created: &nbsp;</Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Typography>
          </div>
        </div>
        {truncated ? transformTweet() : <Typography>{text}</Typography>}

        <div className={classes.row}>
          <div className={clsx(classes.row, classes.paddingSide)}>
            <RepeatIcon fontSize="small" />
            <Typography>{retweet_count}</Typography>
          </div>
          <div className={clsx(classes.row, classes.paddingSide)}>
            <FavoriteBorderIcon fontSize="small" />
            <Typography>{favorite_count}</Typography>
          </div>
        </div>
      </Box>
    </Paper>
  );
};

export default TweetCard;
