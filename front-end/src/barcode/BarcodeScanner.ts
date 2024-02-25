import Lodash from "lodash";
import { SetterOrUpdater } from "recoil";
import BarcodeFetcher from "./BarcodeFetcher";
import axios from "axios";

class BarcodeScanner {
  input: string;
  lastInput: string;
  inputKeys: Record<string, true>;
  timer: NodeJS.Timeout | null;
  isFetching: boolean;
  setMenu: SetterOrUpdater<string>;
  setItem: SetterOrUpdater<ItemData | "검색 결과 없음" | null>;
  setSimilerItems: SetterOrUpdater<ItemData[]>;

  constructor(
    setMenu: SetterOrUpdater<string>,
    setItem: SetterOrUpdater<ItemData | "검색 결과 없음" | null>,
    setSimilerItems: SetterOrUpdater<ItemData[]>
  ) {
    this.input = "";
    this.lastInput = "";
    this.inputKeys = {};
    this.timer = null;
    this.isFetching = false;
    this.setMenu = setMenu;
    this.setItem = setItem;
    this.setSimilerItems = setSimilerItems;

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

      if (
        !this.isFetching &&
        this.input.startsWith("st") &&
        this.input.replace("Enter", "").endsWith("end")
      ) {
        this.isFetching = true;
        this.setMenu("바코드검색");
        const barcode = this.input.slice(2, this.input.length - 3);

        BarcodeFetcher.getItemData(barcode)
          .then(({ data }) => {
            if (data == "검색 결과 없음") {
              this.setItem(data);
              return;
            }

            this.setItem(data.item);
            this.setSimilerItems(data.similerItems);
          })
          .finally(() => {
            this.isFetching = false;
          });
      }
    });
  }

  resetTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.input = "";
      this.lastInput = "";
      this.inputKeys = {};
    }, 300);
  }
}

export default BarcodeScanner;
