export const handleFontStyle = (font: string | undefined) => {
  switch (font) {
    case "title32":
      return "font-family: title; font-size: 32px;;";
    case "bold28":
      return "font-family: bold; font-size: 28px; ";
    case "bold24":
      return "font-family: bold; font-size: 24px;  ";
    case "bold20":
      return "font-family: bold; font-size: 20px;  ";
    case "bold16":
      return "font-family: bold; font-size: 16px;  ";
    case "regular24":
      return "font-family: regular; font-size: 24px;";
    case "regular20":
      return "font-family: regular; font-size: 20px;  ";
    case "regular16":
      return "font-family: regular; font-size: 16px;";
    case "regular14":
      return "font-family: regular;  font-size: 14px; ";
    default:
      return "font-family: regular;  font-size: 14px; ";
  }
};
