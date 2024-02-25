import axios from "axios";

const baseURL =
  "http://bigbbic-env.eba-ypkjnrek.us-east-1.elasticbeanstalk.com";
// "http://localhost:8080/barcode";

const BarcodeFetcher: Record<
  string,
  (searchValue: string | number) => Promise<any>
> = {};

BarcodeFetcher.getItemData = function (searchValue) {
  return axios.get(`${baseURL}/item?value=${searchValue}`);
};

BarcodeFetcher.getItems = function (searchValue) {
  return axios.get(`${baseURL}/items?value=${searchValue}`);
};

export default BarcodeFetcher;
