import React from 'react';
import SignInForm from './form';

export default ({ handleSubmit }) => {
  return (
    <React.Fragment>
      <div className='p-8'>
        <SignInForm handleSubmit={handleSubmit} />
      </div>
    </React.Fragment>
  );
}