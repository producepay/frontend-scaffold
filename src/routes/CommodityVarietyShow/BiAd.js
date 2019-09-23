import React from 'react';
import cx from 'classnames';

import { useAuth } from '../../contexts/auth';

import dmrBiLaptop from '../../assets/images/dmr-bi-laptop.png';

const Cta = ({ className, email }) => (
  <a
    className={cx(
      className,
      'block py-3 px-6 bg-secondary no-underline rounded text-white font-semibold text-center'
    )}
    href={`https://join.producepay.com/bi-free-trial-9_15_2019/?email=${email}`}
    target='_blank'
    rel='noopener noreferrer'
  >
    Learn More
  </a>
);

function BiAd({ className }) {
  const { email = '' } = useAuth();

  const cName = cx(className, 'w-3/4 xl:w-2/3 xl:w mx-auto border-4 border-gray-300 bg-white p-6 flex items-center flex-col md:flex-row');

  return (
    <div className={cName}>
      <div className='w-full md:w-1/2 pr-0 md:pr-6'>
        <div className='text-xl font-medium mb-4 leading-normal text-center md:text-left'>
          Get a Free Trial of ProducePay’s Business Intelligence Software!
        </div>

        <Cta className='hidden md:inline-block px-10' email={email} />
      </div>

      <div className='w-full md:w-1/2'>
        <img src={dmrBiLaptop} />
      </div>

      <Cta className='md:hidden w-full mt-4' email={email} />
    </div>
  );
}

export default React.memo(BiAd);
