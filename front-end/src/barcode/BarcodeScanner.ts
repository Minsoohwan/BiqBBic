import Lodash from "lodash";
import { SetterOrUpdater } from "recoil";
import BarcodeFetcher from "./BarcodeFetcher";
import axios from "axios";

class BarcodeScanner {
  input: string;
  lastInput: string;
  inputKeys: Record<string, true>;
  timer: NodeJS.Timeout | null;
  setMenu: SetterOrUpdater<string>;
  setItem: SetterOrUpdater<ItemData | null>;

  constructor(
    setMenu: SetterOrUpdater<string>,
    setItem: SetterOrUpdater<ItemData | null>
  ) {
    this.input = "";
    this.lastInput = "";
    this.inputKeys = {};
    this.timer = null;
    this.setMenu = setMenu;
    this.setItem = setItem;

    window.addEventListener("keydown", (e: any) => {
      if (
        e.key === "Process" &&
        e.code.startsWith("Key") &&
        e.code.length === 4 &&
        isNaN(Number(e.code[3]))
      )
        this.lastInput = e.code[3];
      else this.lastInput = e.key;

      this.inputKeys[this.lastInput] = true;
    });

    window.addEventListener("keyup", (e: any) => {
      this.resetTimer();

      if (Lodash.size(this.inputKeys) !== 1) {
        this.input = "";
        this.lastInput = "";
        this.inputKeys = {};

        return;
      }

      if (this.inputKeys[this.lastInput]) this.input += this.lastInput;
      else throw new Error("비정상적인 입력 감지");

      delete this.inputKeys[this.lastInput];
    });
  }

  resetTimer() {
    if (
      this.input.startsWith("st") &&
      this.input.replace("Enter", "").endsWith("end")
    ) {
      this.setMenu("바코드검색");
      const barcode = this.input.slice(2, this.input.length - 3);

      BarcodeFetcher.getItemData(barcode).then((res) => {
        if (res.data === null) return new Error("검색 실패");

        const itemData = res.data;
        if (itemData) {
          axios
            .get(
              `/v1/search/shop.json?query=${encodeURIComponent(itemData.text)}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
                  "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECRET,
                },
              }
            )
            .then((res) => {
              console.log(res);
            });
        }
      });
    }

    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.input = "";
      this.lastInput = "";
      this.inputKeys = {};
    }, 300);
  }
}

export default BarcodeScanner;
