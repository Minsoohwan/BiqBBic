export const handleFontStyle = (font: string | undefined) => {
  switch (font) {
    case "title32":
      return "font-family: title; font-size: 32px; line-height: 40px;";
    case "title24":
      return "font-family: title; font-size: 24px; line-height: 36px;";
    case "title20":
      return "font-family: title; font-size: 20px; line-height: 24px;";
    case "bold28":
      return "font-family: bold; font-size: 28px;";
    case "bold24":
      return "font-family: bold; font-size: 24px;  line-height: 28px;";
    case "bold20":
      return "font-family: bold; font-size: 20px;";
    case "bold16":
      return "font-family: bold; font-size: 16px;";
    case "bold14":
      return "font-family: bold; font-size: 14px;  lineHeight: 16px;";
    case "regular24":
      return "font-family: regular; font-size: 24px;";
    case "regular20":
      return "font-family: regular; font-size: 20px;  lineHeight: 24px;";
    case "regular16":
      return "font-family: regular; font-size: 16px; lineHeight: 20px;";
    case "regular14":
      return "font-family: regular;  font-size: 14px;";
    default:
      return "font-family: regular;  font-size: 14px;";
  }
};

export function getTimeCount(
  time: number,
  formatOption?: { hour?: string; minute?: string }
): string {
  const hourFormat = formatOption?.hour ?? "시간";
  const minuteFormat = formatOption?.minute ?? "분";

  const seconds = time / 1000;
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor((seconds - hours * 60 * 60) / 60);

  return `${hours}${hourFormat} ${minutes}${minuteFormat}`;
}

export function formatPrice(price: number, useRound?: boolean) {
  const $_price = useRound ? Math.round(price) : price;
  return $_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
}
