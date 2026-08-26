export function formatCityTime(t: number, shift: number) {
  const cityTime = new Date((t + shift) * 1000);

  return cityTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}