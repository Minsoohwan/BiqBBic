import axios from "axios";

const baseURL =
  "http://bigbbic-env.eba-ypkjnrek.us-east-1.elasticbeanstalk.com";

const BarcodeFetcher: Record<
  string,
  (searchValue: string | number) => Promise<any>
> = {};

BarcodeFetcher.getItemData = function (searchValue) {
  return axios.get(`${baseURL}/barcode/item?value=${searchValue}`);
};

export default BarcodeFetcher;
