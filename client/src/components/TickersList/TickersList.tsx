import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './TickersList.module.scss';
import { useAppSelector } from '../../hooks';
import TickerItem from '../TickerItem/TickerItem';
import TickerForm from '../TickerForm/TickerForm';

const TickersList = () => {
  const { tickers } = useAppSelector((state) => state.tickersReducer);

  const uniqueId = () => uuidv4();

  return (
    <div className={styles.list}>
      <TickerForm />
      {tickers.length > 0 ? (
        <div className={styles.list__container}>
          {tickers.map((ticker) => (
            <Fragment key={uniqueId()}>
              <TickerItem tickerItem={ticker} />
            </Fragment>
          ))}
        </div>
      ) : <span className={styles.list__info}>There are no available tickers</span>}
    </div>
  );
};

export default TickersList;
