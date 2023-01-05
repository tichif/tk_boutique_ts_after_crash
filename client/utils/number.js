export function getAmountInCurrency(amount, currency) {
  return `${currency.symbol} ${(amount / currency.amount).toFixed(2)}`;
}
