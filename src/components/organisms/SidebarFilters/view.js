import React from 'react';
import BiFilter from '../../molecules/BiFilter';

function SidebarView(props) {
  const { filters } = props;

  return (
    <React.Fragment>
      {
        filters.map((filter) => (
          <div className="px-6 pt-4" key={filter.title}>
            <div className="pb-4 border-b border-gray-300">
              <BiFilter
                title={filter.title}
                items={filter.items}
                selectAll
              />
            </div>
          </div>
        ))
      }
    </React.Fragment>
  )
}

export default React.memo(SidebarView);