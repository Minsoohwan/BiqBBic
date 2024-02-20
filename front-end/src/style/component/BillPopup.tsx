import { Dispatch } from "react";
import palette from "../palette";

function BillPopup({
  setPopupVisible,
}: {
  setPopupVisible: Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      onClick={() => {
        setPopupVisible(false);
      }}
    >
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "650px",

          backgroundImage: "url('/asset/fakeBill.png')",
          backgroundSize: "cover",
          borderRadius: "10px",
          zIndex: 100,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: "24px",
            height: "24px",
            backgroundImage: "url('/asset/close.png')",
            backgroundSize: "cover",
            cursor: "pointer",
            zIndex: 101,
          }}
          onClick={() => {
            setPopupVisible(false);
          }}
        />
      </div>
    </div>
  );
}

export default BillPopup;
