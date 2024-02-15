export const handleFontStyle = (font: string | undefined) => {
  switch (font) {
    case "title32":
      return "font-family: title; font-size: 32px; lineHeight: 40px; ";
    case "title24":
      return "font-family: title; font-size: 24px; lineHeight: 36px; ";
    case "bold28":
      return "font-family: bold; font-size: 28px; lineHeight: 28px; ";
    case "bold24":
      return "font-family: bold; font-size: 24px;  lineHeight: 28px; ";
    case "bold20":
      return "font-family: bold; font-size: 20px;  lineHeight: 20px; ";
    case "bold16":
      return "font-family: bold; font-size: 16px;  lineHeight: 16px; ";
    case "regular24":
      return "font-family: regular; font-size: 24px; lineHeight: 24px; ";
    case "regular20":
      return "font-family: regular; font-size: 20px;  lineHeight: 24px; ";
    case "regular16":
      return "font-family: regular; font-size: 16px; lineHeight: 20px; ";
    case "regular14":
      return "font-family: regular;  font-size: 14px; lineHeight: 14px; ";
    default:
      return "font-family: regular;  font-size: 14px; lineHeight: 14px; ";
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
