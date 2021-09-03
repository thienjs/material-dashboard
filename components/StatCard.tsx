import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@ramonak/paper';
import clsx from 'clsx';

import AnimatedNumber from './AnimatedNumber';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  border: {
    border: `1px solid ${theme.palette.text.primary}`,
  },
}));

interface StatCardProps {
  value: number;
  title: string;
  withBorder?: boolean;
}

const StatCard = ({ value, title, withBorder }: StatCardProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Paper
      customClass={clsx(classes.paper, withBorder && classes.border)}
      elevation={3}
    >
      <div>
        <AnimatedNumber value={value} />
        <Typography variant="button">{title}</Typography>
      </div>
    </Paper>
  );
};

export default StatCard;
