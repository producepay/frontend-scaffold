import React, { useState, useRef, useEffect, useCallback } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import cx from 'classnames';
import _ from 'lodash';

import { isPresent } from '../../../helpers/lodash';
import { usePreviousSearches } from './helpers';

import Card from '../../elements/Card';
import SearchSection from './SearchSection';

const ERP_SEARCH_QUERY = gql`
  query ErpSearch($term:String!){
    erpSearch(term: $term) {
      objectType
      identifier
      value
    }
  }
`;

function Search({ className }) {
  const [searchText, setSearchText] = useState('');
  const [shouldShowSearchResults, setShouldShowSearchResults] = useState(false);
  const [previousSearches, addPreviousSearch] = usePreviousSearches();

  const searchBoxRef = useRef(null);
  const onWindowClick = useCallback((e) => {
    const hasClickedWithinSearch = searchBoxRef.current && searchBoxRef.current.contains(e.target);
    setShouldShowSearchResults(hasClickedWithinSearch);
  }, [searchBoxRef, setShouldShowSearchResults]);

  useEffect(() => {
    document.addEventListener('click', onWindowClick);
    return () => document.removeEventListener('click', onWindowClick);
  }, [onWindowClick]);

  const { data, loading } = useQuery(ERP_SEARCH_QUERY, {
    variables: { term: searchText },
    skip: _.isEmpty(searchText),
  });
  const searchResults = _.get(data, 'erpSearch');

  const handleRouteClick = (item) => {
    addPreviousSearch(item);
    setShouldShowSearchResults(false);
    setSearchText('');
  };

  const hasSomethingToShow = isPresent(searchResults) || isPresent(previousSearches);

  return (
    <div ref={searchBoxRef} className={cx(className, 'relative')}>
      <input
        className='h-full w-full py-4 outline-none'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder='Search Commodity or Customer'
      />

      {shouldShowSearchResults && hasSomethingToShow ? (
        <div className='absolute w-full' style={{ paddingTop: 1 }}>
          <Card>
            {isPresent(searchText.trim()) ? (
              isPresent(searchResults) ? (
                <React.Fragment>
                  <SearchSection
                    title='Customers'
                    items={_.filter(searchResults, { objectType: 'customer' })}
                    onRouteClick={handleRouteClick}
                  />

                  <SearchSection
                    className='border-t'
                    title='Products'
                    items={_.filter(searchResults, { objectType: 'product' })}
                    onRouteClick={handleRouteClick}
                  />
                </React.Fragment>
              ) : (
                !loading ? (
                  <div className='p-4 text-center'>
                    No Results Found
                  </div>
                ) : null
              )
            ) : (
              <SearchSection
                title='Recent Searches'
                items={previousSearches}
                onRouteClick={handleRouteClick}
              />
            )}
          </Card>
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(Search);
