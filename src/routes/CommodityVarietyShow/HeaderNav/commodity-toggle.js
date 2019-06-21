import React, { useState } from 'react';
import { get, isEqual } from 'lodash';
import cx from 'classnames';

import { commodityDropdownListOptions } from '../../../helpers/commodities-and-varieties';
import routes from '../../../routes';

import { Link } from 'react-router-dom';
import List from '../../../components/elements/List';
import ListItem from '../../../components/elements/ListItem';
import Button from '../../../components/elements/Button';
import CancelIcon from '../../../components/icons/Cancel';

import './header-nav.css';

const LIST_ITEM_CLASS =
  'p-3 text-sm no-underline text-gray-800 font-normal';

function CommodityToggle(props) {
  const { selectedItem } = props;

  const [showMenu, setShowMenu] = useState(false);
  const slideMenuClasses = cx(
    'w-full bg-white fixed top-0 right-0 left-0 bottom-0 z-50 cursor-pointer',
  );

  const slideMenuStyle = {
    transformOrigin: '0% 0%',
    transform: showMenu ? 'none' : 'translate(-100%, 0)',
    transition: 'transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1)',
  };

  return (
    <div className="w-full">
      <div className={slideMenuClasses} style={slideMenuStyle}>
        <div className="p-4 flex justify-end items-center">
          <CancelIcon
            color="#3d4852"
            size={18}
            onClick={() => setShowMenu(false)}
          />
        </div>
        <div className="overflow-y-scroll list-container">
          <List>
            {commodityDropdownListOptions.map(option => {
              const cvIds = option.value.split(':');

              const itemClassName = cx(LIST_ITEM_CLASS, {
                'bg-white': !isEqual(option, selectedItem),
                'bg-primary text-white font-semibold': isEqual(
                  option,
                  selectedItem,
                ),
              });

              return (
                <ListItem
                  key={option.value}
                  component={Link}
                  to={routes.commodityVarietyShow(cvIds[0], cvIds[1] || null)}
                  className={itemClassName}
                  onClick={() => setShowMenu(false)}
                  borderless
                >
                  {option.label}
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>
          <div className="font-normal text-sm">Daily Market Report For</div>
          <div className="leading-snug font-bold text-lg">
            {get(selectedItem, 'label')}
          </div>
        </div>
        <div className="flex items-center">
          <Button
            className="uppercase text-sm"
            variant="outlined"
            label="Change"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(CommodityToggle);
