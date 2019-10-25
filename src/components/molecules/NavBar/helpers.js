import { useCallback } from 'react';
import _ from 'lodash';

import useStorage from '../../../hooks/use-storage';

export function usePreviousSearches() {
  const [previousSearches, setPreviousSearches] = useStorage('previous-searches', [], localStorage);

  const addSearchObj = useCallback((searchObj) => {
    setPreviousSearches((oldPreviousSearches) => {
      const uniqSearches = _.uniqBy([searchObj, ...oldPreviousSearches], 'identifier');
      return uniqSearches.slice(0, 5);
    });
  }, [setPreviousSearches]);

  return [
    previousSearches,
    addSearchObj,
  ];
}
