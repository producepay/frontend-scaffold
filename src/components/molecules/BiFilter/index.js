import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import { optionType } from '../../../helpers/types';
import { textSearchCompare } from '../../../helpers/common';
import TextField from '../../elements/TextField';
import Checkbox from '../../elements/Checkbox';
import ChevronUp from '../../icons/ChevronUp';
import ChevronDown from '../../icons/ChevronDown';

const CHEVRON_COLOR = "#a0aec0";

function BiFilter(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    title,
    className,
    items,
  } = props;

  const wrapperClassName = cx(
    "w-full",
    className,
  );

  return (
    <div className={wrapperClassName}>
      <div className="flex justify-between">
        <div className="font-medium">{title}</div>
        <div className="cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronDown color={CHEVRON_COLOR} /> : <ChevronUp color={CHEVRON_COLOR} />}
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
              {_.filter(items, (option) => textSearchCompare(searchTerm, option.label)).map(item => (
                <li key={item.value} className="my-1">
                  <div className="flex items-center">
                    <Checkbox className="mr-2" value={item.value} />
                    <label htmlFor={item.value} className="text-sm">{item.label}</label>
                  </div>
                </li>
              ))}
            </ul>
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
};

BiFilter.defaultProps = {
  className: '',
  showSearch: true,
};

export default React.memo(BiFilter);
