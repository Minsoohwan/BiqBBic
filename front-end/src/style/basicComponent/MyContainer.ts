import styled from "styled-components";
import palette from "../palette";
import { handleFontStyle } from "../common";

export const MyContainer = styled.div<StyledComponentProps>`
  ${({ $font }) => handleFontStyle($font)};
  position: ${(props) => props.$position};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  bottom: ${(props) => props.$bottom};
  right: ${(props) => props.$right};
  display: ${(props) => props.$display ?? "block"};
  width: ${(props) => props.$width ?? "100%"};
  min-width: ${(props) => props.$minWidth};
  height: ${(props) => props.$height};
  line-height: ${(props) => props.$lineHeight};
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  border: ${(props) => props.$border};
  border-left: ${(props) => props.$borderLeft};
  border-right: ${(props) => props.$borderRight};
  border-radius: ${(props) => props.$borderRadius};
  opacity: ${(props) => props.$opacity ?? "100%"};
  flex-grow: ${(props) => props.$flexGrow};
  flex-shrink: ${(props) => props.$flexShrink};
  align-self: ${(props) => props.$alignSelf};
  text-align: ${(props) => props.$textAlign};
  color: ${(props) => props.$color};
  overflow-x: ${(props) => props.$overflowX ?? "hidden"};
  overflow-y: ${(props) => props.$overflowY};
  background-image: url(${(props) => props.$backgroundImage});
  background-color: ${(props) => props.$backgroundColor};
  background-size: ${(props) => props.$backgroundSize};
  background-repeat: no-repeat;
  background-position: ${(props) => props.$backgroundPosition ?? "center"};
  cursor: ${(props) => props.$cursor};

  .heart-white {
    path {
      fill: ${palette.whilt};
    }
  }

  .heart-green {
    path {
      fill: ${palette.green.green4};
    }
  }
`;

export const MyFlexContainer = styled(MyContainer)`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection ?? "row"};
  justify-content: ${(props) => props.$justifyContent ?? "flex-start"};
  align-items: ${(props) => props.$alignItems ?? "flex-start"};
  gap: ${(props) => props.$gap ?? "20px"};
  flex-wrap: ${(props) => props.$flexWrap};

  .check-box {
    width: 24px;
    height: 24px;
  }
`;

export const RowDiv = styled.div<StyledComponentProps>`
  width: ${(props) => (props.$width ? props.$width : "100%")};
  height: ${(props) => props.$height};
  display: flex;
  column-gap: ${(props) => (props.$columnGap ? props.$columnGap : "20px")};
  justify-content: ${(props) =>
    props.$justifyContent ? props.$justifyContent : "center"};
  align-items: ${(props) => (props.$alignItems ? props.$alignItems : "center")};
  position: relative;
  margin: ${(props) => props.$margin};
`;

export const Line1px = styled.div<StyledComponentProps>`
  width: 100%;
  height: 1px;
  background-color: ${palette.gray.gray2};
  margin: ${(props) => props.$margin};
`;
