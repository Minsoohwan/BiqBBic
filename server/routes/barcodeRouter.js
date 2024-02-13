const express = require("express");
const router = express.Router();
const Barcode = require("../schemas/barcode");

module.exports = router;

router.get("/item", async (req, res) => {
  try {
    const searchValue = req.query.value;
    console.log(searchValue);

    if (isNaN(searchValue)) {
      const result = await Barcode.find({
        $or: [
          { PRDLST_NM: { $regex: searchValue, $options: "i" } },
          { PRDT_NM: { $regex: searchValue, $options: "i" } },
          { CMPNY_NM: { $regex: searchValue, $options: "i" } },
        ],
      });

      res.json(result.map((item) => item.PRDT_NM));
    } else {
      const result = await Barcode.find({ BRCD_NO: Number(searchValue) });

      res.json(result.map((item) => item.PRDT_NM));
    }
  } catch (err) {
    console.error(err);
    res.json("검색 실패");
  }
});

router.post("/add", (req, res) => {
  try {
    const barcodeData = req.body;
    barcodeData.forEach((data) => {
      const newData = {
        PRDLST_REPORT_NO: Number(data.PRDLST_REPORT_NO),
        HTRK_PRDLST_NM: data.HTRK_PRDLST_NM,
        LAST_UPDT_DTM: Date.parse(data.LAST_UPDT_DTM),
        HRNK_PRDLST_NM: data.HRNK_PRDLST_NM,
        BRCD_NO: Number(data.BRCD_NO),
        PRDLST_NM: data.PRDLST_NM,
        PRDT_NM: data.PRDT_NM,
        CMPNY_NM: data.CMPNY_NM,
      };

      const barcode = new Barcode(newData);
      barcode.save();
    });

    res.json("저장 완료");
  } catch (err) {
    console.error(err);
  }
});
