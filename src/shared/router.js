const router = require("express").Router();
const axios =  require("axios");

const rate = async (req, res) => {
  const result = await axios(
    `https://bank.gov.ua/ua/markets/exchangerate-chart?cn%5B%5D=EUR&startDate=${req.query.startDate}&endDate=${req.query.endDate}`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  )
    .then((respose) => {
      const a = respose.data.split("window.exchangeRate = JSON.parse('");
      const b = a[1].split("window.currNames");
      return JSON.parse(b[0].substring(0, b[0].length - 12));
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
  console.log("result", result);
  return res.json(result.data);
};

const configure = (app) => {
  router.route(`/api/rate`).get(rate);

  return router;
};

module.exports = {
  configure
}
