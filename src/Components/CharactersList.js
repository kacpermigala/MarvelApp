import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import chunk from 'lodash-es/chunk';
import Pagination from './Pagination';
import getCharacters from '../ApiModules/getCharacters';
import CharactersRecord from './CharactersRecord';
import FilterSection from './FilterSection';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [nameStartsWith, setNameStartsWith] = useState('');
  const [orderBy, setOrderBy] = useState('name');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCharacters({
        offset,
        orderBy,
        ...(nameStartsWith && { nameStartsWith }),
      });
      setCharacters(result.results);
      setTotal(result.total);
    };
    fetchData();
  }, [offset, nameStartsWith, orderBy]);

  return (
    <>
      <FilterSection
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        nameStartsWith={nameStartsWith}
        setNameStartsWith={setNameStartsWith}
      />
      {chunk(characters, 4).map(charactersBatch => (
        <Grid
          container
          spacing={4}
          key={`row-${charactersBatch.map(ch => ch.id).join()}`}
        >
          {charactersBatch.map(character => (
            <Grid item xs={12} md={3} key={`character-${character.id}`}>
              <CharactersRecord character={character} />
            </Grid>
          ))}
        </Grid>
      ))}
      {Boolean(characters.length) && (
        <Pagination setOffset={setOffset} offset={offset} total={total} />
      )}
    </>
  );
};

export default CharactersList;
