import React from 'react';
import LoadingSpinner from '../../elements/LoadingSpinner';
import BiFilter from '../../molecules/BiFilter';

function SidebarView(props) {
  const { filters, loading } = props;

  if (loading) {
    return (
      <div className='py-8 flex justify-center items-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    filters.map((filter) => (
      <div className="px-6 pt-4" key={filter.title}>
        <div className="pb-4 border-b border-gray-300">
          <BiFilter
            title={filter.title}
            items={filter.items}
            onChange={filter.onChange}
            selectedItems={filter.selectedItems || []}
          />
        </div>
      </div>
    ))
  );
}

export default React.memo(SidebarView);
