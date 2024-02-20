const express = require("express");
const router = express.Router();
const Barcode = require("../schemas/barcode");

module.exports = router;

router.get("/item", async (req, res) => {
  try {
    const searchValue = req.query.value;

    let result;
    if (isNaN(searchValue)) {
      result = await Barcode.find({
        $or: [
          { PRDLST_NM: { $regex: searchValue, $options: "i" } },
          { PRDT_NM: { $regex: searchValue, $options: "i" } },
          { CMPNY_NM: { $regex: searchValue, $options: "i" } },
        ],
      });
    } else {
      result = await Barcode.find({ BRCD_NO: Number(searchValue) });
    }

    const itemData = result
      ? {
          id: result[0].BRCD_NO,
          text: result[0].PRDT_NM,
        }
      : null;

    // if (itemData) {
    //   fetch(
    //     `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
    //       itemData.text
    //     )}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "X-Naver-Client-Id": process.env.client_id,
    //         "X-Naver-Client-Secret": process.env.client_secret,
    //       },
    //     }
    //   ).then((res) => {
    //     console.log(res);
    //   });
    // }

    res.json(itemData);
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
