import axios from "axios";

const baseURL = "http://localhost:8080";

const BarcodeFetcher: Record<
  string,
  (searchValue: string | number) => Promise<any>
> = {};

BarcodeFetcher.getItemData = function (searchValue) {
  return axios.get(`${baseURL}/barcode/item?value=${searchValue}`);
};

export default BarcodeFetcher;
