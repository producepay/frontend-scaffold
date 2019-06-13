import React from 'react';
import { get } from 'lodash';

import { itemFromUuids } from '../../../helpers/commodities-and-varieties';
import { useAuth } from '../../../contexts/auth';

import CommoditySearch from './commodity-search';
import CommodityToggle from './commodity-toggle';
import CommodityTitle from './commodity-title';
import Button from '../../../components/elements/Button';

import logo from '../../../assets/images/pp-logo.svg';
import './header-nav.css';

const COMMODITY_IMAGE_WIDTH = 64;

function HeaderNav(props) {
  const { commodityId, varietyId, commodityData } = props;

  const { token: userToken } = useAuth();

  const selectedItem = itemFromUuids(commodityId, varietyId);
  const imageUrl = get(commodityData, 'imageUrls.original', null);

  return (
    <React.Fragment>
      <div className="pl-0 md:pl-8 py-2 h-12 bg-white border-b flex items-center justify-center md:hidden">
        <img
          src="/static/images/pp-logo.svg"
          alt="ProducePay"
          style={{ width: 135 }}
        />
      </div>

      <header className="px-4 lg:px-8 py-2 sticky top-0 md:fixed pn-t-3 md:pin-t pin-r pin-l bg-white border-b z-30">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row flex-grow">
            <div
              className="mr-1 md:mr-3"
              style={{ height: COMMODITY_IMAGE_WIDTH, width: COMMODITY_IMAGE_WIDTH }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={commodityData.name}
                  width={COMMODITY_IMAGE_WIDTH}
                />
              ) : null}
            </div>

            {/* DESKTOP */}
            <div className="hidden w-full md:flex md:flex-col md:justify-center">
              <CommoditySearch
                commodityId={commodityId}
                varietyId={varietyId}
              />
            </div>

            {/* MOBILE */}
            <div className="w-full ml-2 md:hidden flex items-center justify-start">
              <CommodityToggle selectedItem={selectedItem} />
            </div>
          </div>

          <div className="hidden md:flex flex-grow justify-end">
            {userToken ? null : (
              <div className="self-center">
                <a
                  href="https://reports.producepay.com?ref=insights-dash"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    label="Get this as a daily email"
                    className="text-sm font-medium"
                    variant="text"
                  />
                </a>
              </div>
            )}

            <div className="ml-8 self-center">
              <img
                src={logo}
                alt="ProducePay"
                style={{ width: 170 }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="hidden md:block md:h-20" />
      <CommodityTitle selectedItem={selectedItem} />
    </React.Fragment>
  );
}

export default React.memo(HeaderNav);
