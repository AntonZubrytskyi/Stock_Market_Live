import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import Button from '../UI/Button/Button';
import styles from './TickerForm.module.scss';
import { socketServices } from '../../socket';
import { useAppSelector } from '../../hooks';
import 'react-toastify/dist/ReactToastify.css';
import { formTextValues } from '../../constants';

interface IFormInputs {
  tickerName: string,
}

const TickerForm:FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>();

  const [isExist, setIsExist] = useState<boolean>(false);

  const { tickers } = useAppSelector((state) => state.tickersReducer);

  const handleSubmitForm:SubmitHandler<IFormInputs> = (data) => {
    const isTickerExist = tickers.some((ticker) => ticker.ticker === data.tickerName.toUpperCase());

    if (isTickerExist) {
      setIsExist(true);
      return;
    }
    socketServices.addTicker(data.tickerName.toUpperCase());
    toast.success(formTextValues.added, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
    setValue('tickerName', '');
    setIsExist(false);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.ticker__form}>
      <div>
        <input
          {...register('tickerName', {
            required: true,
            onChange: () => setIsExist(false),
          })}
          className={styles.add__ticker__input}
          type="text"
          name="tickerName"
          placeholder="Ticker Name"
        />
        {errors.tickerName && <p className={styles.error__message}>{formTextValues.required}</p>}
        {isExist && <p className={styles.error__message}>{formTextValues.exist}</p>}
      </div>
      <Button styleClass="btn__add__ticker" label="Add Ticker" type="submit" />
      <ToastContainer />
    </form>
  );
};

export default TickerForm;
