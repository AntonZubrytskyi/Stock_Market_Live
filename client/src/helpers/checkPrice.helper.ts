import { localStorageHelper } from './localStorage.helper';

export const checkPriceHelper = (name:string, price: number) => {
  const currentPrice = +localStorageHelper.getFromLocalStorage(name);

  return price >= currentPrice;
};
