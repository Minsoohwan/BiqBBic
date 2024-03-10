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
  setItem: SetterOrUpdater<ItemData | null>;
  setSimilerItems: SetterOrUpdater<ItemData[]>;
  setSearchResult: SetterOrUpdater<ItemData[] | "검색 결과 없음">;
  setLoading: SetterOrUpdater<boolean>;

  constructor(
    setMenu: SetterOrUpdater<string>,
    setItem: SetterOrUpdater<ItemData | null>,
    setSimilerItems: SetterOrUpdater<ItemData[]>,
    setSearchResult: SetterOrUpdater<ItemData[] | "검색 결과 없음">,
    setLoading: SetterOrUpdater<boolean>
  ) {
    this.input = "";
    this.lastInput = "";
    this.inputKeys = {};
    this.timer = null;
    this.isFetching = false;
    this.setMenu = setMenu;
    this.setItem = setItem;
    this.setSimilerItems = setSimilerItems;
    this.setSearchResult = setSearchResult;
    this.setLoading = setLoading;

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
        this.setMenu("검색");
        const barcode = this.input.slice(2, this.input.length - 3);

        this.setLoading(true);
        BarcodeFetcher.getItemData(barcode)
          .then(({ data }) => {
            if (data == "검색 결과 없음") {
              this.setSearchResult(data);
              this.setMenu("검색");
              return;
            }

            this.setItem(data.item);
            this.setSimilerItems(data.similerItems);
          })
          .finally(() => {
            this.isFetching = false;
            this.setLoading(false);
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
