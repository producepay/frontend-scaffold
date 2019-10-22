import React, { useRef } from 'react';
import _ from 'lodash';
import cx from 'classnames';

import {
  commodityDropdownListOptions,
  itemFromUuids,
} from '../../../helpers/commodities-and-varieties';
import { textSearchCompare } from '../../../helpers/common';
import routes from '../../../routes';

import { Link } from 'react-router-dom';
import Downshift from 'downshift';
import TextField from '../../../components/elements/TextField';

import './header-nav.css';

const DROPDOWN_ITEM_HEIGHT = 33;
const DROPDOWN_ITEM_MAX_SHOW = 5;

function downshiftStateReducer(state, changes) {
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
    case Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem: {
      return { ...changes, isOpen: false };
    }
    default:
      return changes;
  }
}

function CommoditySearch(props) {
  const { commodityId, varietyId } = props;

  const inputEl = useRef(null);

  const selectedItem = itemFromUuids(commodityId, varietyId);

  return (
    <Downshift
      id="commodity-selector"
      itemToString={item => _.get(item, 'label', '')}
      selectedItem={selectedItem}
      stateReducer={downshiftStateReducer}
    >
      {({ getInputProps, getLabelProps, isOpen, inputValue, setState }) => {
        const itemsWrapperCN = cx(
          'absolute w-full bg-white border-r border-b border-l shadow overflow-y-scroll',
          {
            hidden: !isOpen,
          },
        );

        return (
          <div className="relative">
            <div className="relative">
              <TextField
                {...getInputProps()}
                innerRef={inputEl}
                placeholder='Start typing a commodity and press enter'
                onFocus={() => setState({ isOpen: true })}
              />

              {inputEl.current !== document.activeElement ? (
                <span
                  className="text-field-change absolute font-medium cursor-pointer text-primary text-xs leading-base"
                  onClick={() => {
                    inputEl.current.focus();
                    setState({ inputValue: '', isOpen: true });
                  }}
                >
                  CHANGE
                </span>
              ) : null}
            </div>

            <div
              className={itemsWrapperCN}
              style={{
                maxHeight:
                  DROPDOWN_ITEM_HEIGHT * DROPDOWN_ITEM_MAX_SHOW,
              }}
            >
              {commodityDropdownListOptions
                .filter(option =>
                  textSearchCompare(inputValue, option.label),
                )
                .map(({ label, value }, idx) => {
                  const itemCN = cx(
                    'block p-2 text-gray-800 no-underline hover:bg-gray-200 text-sm',
                    {
                      'border-t': idx !== 0,
                    },
                  );
                  const ids = value.split(':');

                  return (
                    <Link
                      key={label}
                      className={itemCN}
                      to={routes.commodityVarietyShow(ids[0], ids[1] || null)}
                    >
                      {label}
                    </Link>
                  );
                })}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
}

export default React.memo(CommoditySearch);
