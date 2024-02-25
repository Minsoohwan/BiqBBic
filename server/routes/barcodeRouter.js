const express = require("express");
const router = express.Router();
const Barcode = require("../schemas/barcode");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = router;

router.get("/item", async (req, res) => {
  try {
    const searchValue = req.query.value;
    const result = await Barcode.find({ BRCD_NO: Number(searchValue) });
    const itemData =
      result.length != 0
        ? {
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
          if (naver.data.items.length == 0) {
            res.json("검색 결과 없음");
            return;
          }
          const data = naver.data.items[0];
          itemData.id = data.productId;
          itemData.img = data?.image;
          itemData.price = Number(data?.lprice);

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
    } else {
      res.json("검색 결과 없음");
    }
  } catch (err) {
    console.error(err);
    res.json("검색 실패");
  }
});

router.get("/items", async (req, res) => {
  try {
    const searchValue = req.query.value;

    axios
      .get(
        `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
          searchValue
        )}`,
        {
          headers: {
            "X-Naver-Client-Id": process.env.CLiENT_ID,
            "X-Naver-Client-Secret": process.env.CLIENT_SECRET,
          },
        }
      )
      .then((naver) => {
        if (naver.data.items.length == 0) {
          res.json("검색 결과 없음");
          return;
        }

        const items = naver.data.items.map((item) => {
          const tempElement = cheerio.load(item.title);
          const text = tempElement.text();
          return {
            id: item.productId,
            text,
            img: item.image,
            price: Number(item.lprice),
          };
        });
        res.json(items);
      });
  } catch (err) {
    console.error(err);
    res.json("검색 실패");
  }
});
