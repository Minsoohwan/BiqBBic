import styled from "styled-components";
import palette from "../style/palette";

type MyButtonProps = {
  content: string;
  disabled?: boolean;
};

type ButtonProps = {
  disabled?: boolean;
};

const Button = styled.button<ButtonProps>`
  width: fit-content;
  height: fit-content;
  padding: 7px 10px;
  border-radius: 10px;
  border: 0;
  color: white;
  background-color: ${(props) =>
    props.disabled ? palette.gray.gray2 : palette.blue.blue4};
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  cursor: pointer;

  &:hover {
    background-color: ${palette.blue.blue3};
  }

  &:active {
    background-color: ${palette.main.blue};
    font-weight: bold;
  }
`;

function MyButton(props: MyButtonProps) {
  return <Button disabled={props.disabled}>{props.content}</Button>;
}

export default MyButton;
