const mongoose = require("mongoose");

const { Schema } = mongoose;
const barcodeSchema = new Schema({
  PRDLST_REPORT_NO: {
    type: Number,
  },
  HTRK_PRDLST_NM: {
    type: String,
  },
  LAST_UPDT_DTM: {
    type: Number,
  },
  HRNK_PRDLST_NM: {
    type: String,
  },
  BRCD_NO: {
    type: Number,
  },
  PRDLST_NM: {
    type: String,
  },
  PRDT_NM: {
    type: String,
  },
  CMPNY_NM: {
    type: String,
  },
});

module.exports = mongoose.model("Barcode", barcodeSchema);
