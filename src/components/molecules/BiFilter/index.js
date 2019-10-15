import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import { optionType } from '../../../helpers/types';
import { textSearchCompare } from '../../../helpers/common';
import TextField from '../../elements/TextField';
import Button from '../../elements/Button';
import Checkbox from '../../elements/Checkbox';
import PlusIcon from '../../icons/Plus';
import MinusIcon from '../../icons/Minus';

const CHEVRON_COLOR = "#a0aec0";

function BiFilter(props) {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);

  const {
    title,
    className,
    items,
    limit,
  } = props;

  const wrapperClassName = cx(
    "w-full",
    className,
  );

  const filteredItems = _.filter(items, (option) => textSearchCompare(searchTerm, option.label));
  const finalItems = showMore ? filteredItems : _.take(filteredItems, limit);

  return (
    <div className={wrapperClassName}>
      <div className="flex justify-between items-center">
        <div className="font-medium">{title}</div>
        <div className="cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <MinusIcon size={14} color={CHEVRON_COLOR} /> : <PlusIcon size={14} color={CHEVRON_COLOR} />}
        </div>
      </div>
      {
        isCollapsed ? null : (
          <div>
            <TextField
              className="my-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              size="sm"
              rounded={false}
            />
            <ul>
              {finalItems.map(item => (
                <li key={item.value} className="my-1">
                  <div className="flex items-center">
                    <Checkbox className="mr-2" value={item.value} />
                    <label htmlFor={item.value} className="text-sm">{item.label}</label>
                  </div>
                </li>
              ))}
            </ul>
            {!showMore && finalItems.length > limit ? (
              <Button onClick={() => setShowMore(!showMore)} variant="text" />
              ) : null}
          </div>
        )
      }
    </div>
  );
}

BiFilter.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  items: optionType.isRequired,
  showSearch: PropTypes.bool,
  limit: PropTypes.number,
};

BiFilter.defaultProps = {
  className: '',
  showSearch: true,
  limit: 5,
};

export default React.memo(BiFilter);
