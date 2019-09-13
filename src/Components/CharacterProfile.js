import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import getCharacter from '../ApiModules/getCharacter';

const useStyles = makeStyles({
  bigAvatar: {
    margin: '50px 0',
    width: 300,
    height: 300,
  },
  chip: {
    margin: '10px 25px',
  },
  stories: {
    margin: '10px 25px',
    backgroundColor: 'orange',
    color: 'white',
  },
});

const CharacterProfile = ({ match, location }) => {
  const classes = useStyles();

  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let tempCharacter = location.character;
      if (!tempCharacter) {
        const data = await getCharacter({
          id: match.params.id,
        });

        tempCharacter = data.results[0];
      }
      setCharacter(tempCharacter);
    };
    fetchData();
  }, []);

  console.log(character);

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      {character && (
        <>
          <Avatar
            src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
            className={classes.bigAvatar}
          />
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <h1>{character.name}</h1>
            <h3>{character.description}</h3>
          </Grid>
          <Grid container justify="center" alignItems="center" direction="row">
            <h2>Comics:</h2>
            {character.comics.items.map(comic => (
              <Chip
                label={comic.name}
                key={`comic-${comic.name}`}
                className={classes.chip}
              />
            ))}
          </Grid>
          <Grid container justify="center" alignItems="center" direction="row">
            <h2>Stories:</h2>
            {character.stories.items.map(story => (
              <Chip
                label={story.name}
                key={`story-${story.name}`}
                className={classes.stories}
              />
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CharacterProfile;
