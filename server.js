const express = require("express");
const axios = require("axios");
const cors = require("cors"); // 추가
const app = express();

// 🔵 CORS 허용 미들웨어 추가
app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    const apiUrl =
      "https://openapi.seoul.go.kr:8088/6e786a614970696733336d62577357/json/TbSeoulmetroStOrigin/1/599/";
    const response = await axios.get(apiUrl, {
      validateStatus: () => true,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("API 요청 실패");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}번에서 실행 중`);
});
