import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { optionType } from '../../../helpers/types';
import Checkbox from '../../elements/Checkbox';
import ChevronUp from '../../icons/ChevronUp';
import ChevronDown from '../../icons/ChevronDown';

const CHEVRON_COLOR = "#a0aec0";

function BiFilter(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        <div className="cursor-pointer" onClick={() => {setIsCollapsed(!isCollapsed)}}>
          {isCollapsed ? <ChevronDown color={CHEVRON_COLOR} /> : <ChevronUp color={CHEVRON_COLOR} />}
        </div>
      </div>
      <div>
        {
          isCollapsed ? null : (
            <ul>
              {items.map(item => (
                <li key={item.value} className="my-1">
                  <div className="flex items-center">
                    <Checkbox className="mr-2" value={item.value} />
                    <label htmlFor={item.value} className="text-sm">{item.label}</label>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
}

BiFilter.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  items: optionType.isRequired,
};

BiFilter.defaultProps = {
  className: '',
};

export default React.memo(BiFilter);
