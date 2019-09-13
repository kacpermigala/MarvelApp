import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    minHeight: 400,
  },
  media: {
    height: 190,
  },
});

const CharactersRecord = ({ character }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Link to={{ pathname: `/character/${character.id}`, character }}>
        <CardHeader
          avatar={
            <Avatar aria-label="character">{character.name.charAt(0)}</Avatar>
          }
          title={character.name}
        />
        <CardMedia
          className={classes.media}
          image={`${character.thumbnail.path}/landscape_large.${character.thumbnail.extension}`}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {truncateText(character.description, 150)}
        </Typography>
      </CardContent>
    </Card>
  );
};

function truncateText(text, length) {
  if (text.length <= length) {
    return text;
  }

  return `${text.substr(0, length)}\u2026`;
}

export default CharactersRecord;
