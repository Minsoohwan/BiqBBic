interface LayoutProps {
  background?: string;
  backgroundColor?: string;
}

type ItemData = {
  id: number;
  img: string;
  text: string;
  price: number;
};

type ToBuyItem = {
  id: number;
  img: string;
  text: string;
  price: number;
  itemCount: number;
};

type Item = { item: ItemData } & {
  preset: string;
  useIcon?: boolean;
  buyCount?: number;
  imgOnly?: boolean;
  useCount?: boolean;
  itemCount?: number;
  onCountChanged?: (count: number) => void;
};

type CSSPropertiesWithPrefix<T extends keyof CSSStyleDeclaration> = {
  [K in T as `$${string & K}`]: CSSStyleDeclaration[K];
};

type FontType =
  | "title32"
  | "title24"
  | "title20"
  | "bold28"
  | "bold24"
  | "bold20"
  | "bold16"
  | "bold14"
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

type ysMenuType = "주문내역" | "옷장" | "홈" | "상품 분류";

type ysCartType = {
  clothKey: string;
  brand: string;
  title: string;
  option: string[];
  buyNum: number;
  price: number;
  src: string;
};
