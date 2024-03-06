import styled from "styled-components";
import { Shadow } from "../basicComponent/MyModal";

function LoadPanel() {
  return (
    <Shadow>
      <img src="/asset/loading.gif" width="75px" height="75px" />
    </Shadow>
  );
}

export default LoadPanel;
