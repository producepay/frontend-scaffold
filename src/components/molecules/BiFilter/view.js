import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import PlusIcon from '../../icons/Plus';
import MinusIcon from '../../icons/Minus';
import Button from '../../elements/Button';
import TextField from '../../elements/TextField';
import { textSearchCompare } from '../../../helpers/common';

import { optionsWithSubItemsType } from './helpers';
import BiFilterItem from './item';

const ICON_COLOR = "#a0aec0";

function BiFilterView(props) {
  const {
    title,
    className,
    items,
    limit,
    showSearch,
    dispatch,
    state,
  } = props;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);

  const wrapperClassName = cx(
    "w-full",
    className,
  );

  const filteredItems = _.filter(items,
    (option) => textSearchCompare(searchTerm, option.label) || _.some(
      _.get(option, 'subItems', []),
      (subItem) => textSearchCompare(searchTerm, subItem.label)
    )
  );
  const finalItems = showMore ? filteredItems : _.take(filteredItems, limit);

  return (
    <div className={wrapperClassName}>
      <div className="flex justify-between items-center">
        <div className="font-medium">{title}</div>
        <div className="cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <PlusIcon size={14} color={ICON_COLOR} /> : <MinusIcon size={14} color={ICON_COLOR} />}
        </div>
      </div>
      {
        isCollapsed ? null : (
          <div>
            {showSearch && (
              <TextField
                className="my-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                size="sm"
                rounded={false}
              />
            )}
            <ul>
              {finalItems.map((item) => {
                return (
                  <BiFilterItem
                    key={item.value}
                    item={item}
                    searchTerm={searchTerm}
                    dispatch={dispatch}
                    filterState={state}
                  />
                );
              })}
            </ul>
            {
              filteredItems.length > limit ? (
                <Button
                  onClick={() => setShowMore(!showMore)}
                  variant="text"
                  label={showMore ? "Show Less" : "Show More"}
                  className="text-xs font-medium"
                />
              ) : null
            }
          </div>
        )
      }
    </div>
  );
}

BiFilterView.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  items: optionsWithSubItemsType.isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  showSearch: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
};

BiFilterView.defaultProps = {
  className: '',
};

export default React.memo(BiFilterView);
