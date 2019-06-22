import React from 'react';

const CommodityTitle = props => {
  const { selectedItem } = props;

  return (
    <h1 className="hidden md:block bg-white px-4 lg:px-8 py-6 text-2xl font-normal border-b">
      Daily Market Report For&nbsp;
      <span className="font-bold">{selectedItem.label}</span>
    </h1>
  );
};

export default CommodityTitle;
