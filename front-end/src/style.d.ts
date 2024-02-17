interface LayoutProps {
  background?: string;
  backgroundColor?: string;
}

type Item = {
  preset: string;
  img: string;
  text?: string;
  price?: number;
  useIcon?: boolean;
  favorite?: boolean;
  buyCount?: number;
  imgOnly?: boolean;
  useCount?: boolean;
};

type CSSPropertiesWithPrefix<T extends keyof CSSStyleDeclaration> = {
  [K in T as `$${string & K}`]: CSSStyleDeclaration[K];
};

type FontType =
  | "title32"
  | "bold28"
  | "bold24"
  | "bold20"
  | "bold16"
  | "regular24"
  | "regular20"
  | "regular16"
  | "regular14";
type Font = {
  $font: FontType;
};

type StyledComponentProps = Partial<
  Font & CSSPropertiesWithPrefix<keyof CSSStyleDeclaration>
>;
