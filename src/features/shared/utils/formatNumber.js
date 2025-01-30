export function formatNumber(amount, round = true, places = 1) {
  //zapewnij, że amount jest liczbą
  let number = +amount;

  // Zaokrąglaj liczbę do flagi places, jeśli flaga round jest ustawiona na true
  return round ? number.toFixed(places) : +number;
}
