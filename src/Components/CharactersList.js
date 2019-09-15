import React, { useState, useEffect, useContext, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import chunk from 'lodash-es/chunk';
import throttle from 'lodash-es/throttle';
import Pagination from './Pagination';
import getCharacters from '../ApiModules/getCharacters';
import CharactersRecord from './CharactersRecord';
import FilterSection from './FilterSection';
import Loader from './Loader';
import ErrorBoundaryContext from './ErrorBoundary/ErrorBoundaryContext';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [nameStartsWith, setNameStartsWith] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [loading, setLoading] = useState(true);
  const errorContext = useContext(ErrorBoundaryContext);

  const throttled = useRef(
    throttle(params => {
      setLoading(true);
      getCharacters(params)
        .then(result => {
          setCharacters(result.results);
          setTotal(result.total);
          setLoading(false);
        })
        .catch(() => errorContext.informAboutError());
    }, 1000)
  );

  useEffect(
    () =>
      throttled.current({
        offset,
        orderBy,
        ...(nameStartsWith && { nameStartsWith }),
      }),
    [offset, nameStartsWith, orderBy]
  );

  return (
    <>
      <FilterSection
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        nameStartsWith={nameStartsWith}
        setNameStartsWith={setNameStartsWith}
      />
      <Loader show={loading}>
        {characters.length ? (
          <>
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

            <Pagination setOffset={setOffset} offset={offset} total={total} />
          </>
        ) : (
          <h2>No characters found for these selection criteria!</h2>
        )}
      </Loader>
    </>
  );
};

export default CharactersList;
