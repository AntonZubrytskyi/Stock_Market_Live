import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { ReactComponent as Arrow } from '../../assets/icons/Arrow.svg';
import Button from '../UI/Button/Button';
import styles from './TickerItem.module.scss';
import { checkPriceHelper, localStorageHelper } from '../../helpers';
import { useAppDispatch } from '../../hooks';
import { tickersActions } from '../../redux';
import { socketServices } from '../../socket';

interface ITickerItemProps {
  tickerItem:{
    ticker: string;
    price:string;
    dividend: string;
    change: string;
    change_percent: string;
    yieldValue: string;
  }
}

const TickerItem: FC<ITickerItemProps> = ({ tickerItem }) => {
  const {
    ticker, price, dividend, change, change_percent: changePercent, yieldValue,
  } = tickerItem;

  const dispatch = useAppDispatch();

  const comparePrice = checkPriceHelper(ticker, +price);

  const iconStyle = classNames({
    [styles.item__icon__up]: comparePrice,
    [styles.item__icon__down]: !comparePrice,
  });

  const iconBoxStyle = classNames({
    [styles.item__box__up]: comparePrice,
    [styles.item__box__down]: !comparePrice,
  });

  useEffect(() => {
    localStorageHelper.setToLocalStorage(ticker, price);
  }, []);

  const priceStr = `Price: ${price}`;
  const dividendStr = `Dividend: ${dividend}`;
  const changeStr = `Change: ${change}`;
  const changePercentStr = `Change percent: ${changePercent}`;
  const yieldStr = `Yield: ${yieldValue}`;

  const deleteTicker = () => {
    socketServices.removeTicker(ticker);
    dispatch(tickersActions.removeTicker(ticker));
  };

  return (
    <div className={styles.item__container}>
      <div className={iconBoxStyle}>
        <Arrow className={iconStyle} />
      </div>
      <div className={styles.item__section}>
        <span data-testid="tickerName" className={styles.item__section__name}>{ticker}</span>
        <span className={styles.item__section__price}>{priceStr}</span>
        <span className={styles.item__section__dividend}>{dividendStr}</span>
      </div>
      <div className={styles.item__section}>
        <span className={styles.item__section__change}>{changeStr}</span>
        <span className={styles.item__section__percent}>{changePercentStr}</span>
        <span className={styles.item__section__yield}>{yieldStr}</span>
      </div>
      <Button styleClass="btn__remove__ticker" label="Remove ticker" onClick={deleteTicker} />
    </div>
  );
};

export default TickerItem;
