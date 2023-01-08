export function getAmountInCurrency(amount, currency) {
  return `${currency.symbol} ${(amount / currency.amount).toFixed(2)}`;
}

export function addDecimal(amount) {
  return (Math.round(amount * 100) / 100).toFixed(2);
}
