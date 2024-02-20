const express = require("express");
const router = express.Router();
const Barcode = require("../schemas/barcode");
const axios = require("axios");
const cheerio = require("cheerio");

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

    if (itemData) {
      axios
        .get(
          `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
            itemData.text
          )}`,
          {
            headers: {
              "X-Naver-Client-Id": process.env.CLiENT_ID,
              "X-Naver-Client-Secret": process.env.CLIENT_SECRET,
            },
          }
        )
        .then((naver) => {
          const data = naver.data.items[0];
          itemData.img = data.image;
          itemData.price = Number(data.lprice);

          const similerItems = naver.data.items.slice(1).map((item) => {
            const tempElement = cheerio.load(item.title);
            const text = tempElement.text();
            return {
              id: item.productId,
              text,
              img: item.image,
              price: Number(item.lprice),
            };
          });
          res.json({ item: itemData, similerItems });
        });
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
