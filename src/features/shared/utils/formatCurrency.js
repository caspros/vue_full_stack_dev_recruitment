export function formatCurrency(
  amount,
  currency = "EUR",
  round = true,
  format = "de-DE",
) {
  // Zaokrąglaj liczbę, jeśli flaga round jest ustawiona na true
  const roundedAmount = round ? Math.round(amount) : amount;

  // Sprawdź, czy liczba jest całkowita
  // const isInteger = roundedAmount % 1 === 0;

  return new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: round ? 0 : 2,
    maximumFractionDigits: round ? 0 : 2,
  }).format(roundedAmount);
}
