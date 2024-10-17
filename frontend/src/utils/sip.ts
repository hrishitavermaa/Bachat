export const fetchReturn = (amount: number): number => {
  if (amount/3 < 1200) {
    return 0;
  }
  
  const ret = amount/3 + (amount/3 * 39.78) / 100;

  return ret;
};
