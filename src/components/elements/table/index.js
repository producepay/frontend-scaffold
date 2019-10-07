import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function Table(props) {
  const {
    className,
    color,
    alternatingRows,
    padding,
    border,
    children,
    ...rest
  } = props;

  const cName = cx(className,
    `table-p-${padding} table-border-${border}`, {
    'table-primary': color === 'primary',
    'table-secondary': color === 'secondary',
    'table-alternating-rows': alternatingRows,
  });

  return (
    <table
      valign='center'
      className={cName}
      {...rest}
    >
      {children}
    </table>
  );
}

Table.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  padding: PropTypes.oneOf(['none', 'sm', 'lg']), // sm: commodity customers tables, pricing tables. lg: insights watchlist table
  alternatingRows: PropTypes.bool,
  border: PropTypes.oneOf(['none', 'solid', 'dotted', 'dashed']),
};

Table.defaultProps = {
  color: 'primary',
  alternatingRows: true,
  padding: 'sm',
  border: 'none',
};

export default React.memo(Table);
