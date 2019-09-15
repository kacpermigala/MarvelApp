import React from 'react';
import classNames from 'classnames';

const elementsPerPage = 20;

const Pagination = ({ offset, setOffset, total }) => {
  const currentPage = (offset + 20) / elementsPerPage;
  const lastPage = Math.floor(total / 20);

  return (
    <div id="pagination">
      {currentPage > 1 && (
        <>
          <div className="page" onClick={() => setOffset(0)}>
            {'<<'}
          </div>
          <Page
            number={currentPage - 1}
            currentPage={currentPage}
            setOffset={setOffset}
          />
        </>
      )}
      <Page
        number={currentPage}
        currentPage={currentPage}
        setOffset={setOffset}
      />
      {currentPage <= lastPage && (
        <>
          <Page
            number={currentPage + 1}
            currentPage={currentPage}
            setOffset={setOffset}
          />

          <div
            className="page"
            onClick={() => setOffset(lastPage * elementsPerPage)}
          >
            {'>>'}
          </div>
        </>
      )}
    </div>
  );
};

const Page = ({ number, currentPage, setOffset }) => (
  <div
    className={classNames('page', { active: number === currentPage })}
    onClick={() => setOffset(elementsPerPage * number - 20)}
  >
    {number}
  </div>
);

export default React.memo(Pagination);
