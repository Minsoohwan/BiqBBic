const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./schemas");

connect();

app.use(cors({ origin: true, credentials: true }));

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
  })
);

app.use("/barcode", require("./routes/barcodeRouter"));

app.listen(8080, () => {
  console.log("말같지도 않은 서버");
});
