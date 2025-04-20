const express = require("express");
const axios = require("axios");
const app = express();

app.get("/proxy", async (req, res) => {
  try {
    const apiUrl =
      "http://openapi.seoul.go.kr:8088/6e786a614970696733336d62577357/json/TbSeoulmetroStOrigin/1/599/"; // (여기에 진짜 키 전체 넣기)
    const response = await axios.get(apiUrl);
    res.json(response.data); // 받아온 데이터를 그대로 응답
  } catch (error) {
    console.error(error);
    res.status(500).send("API 요청 실패");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}번에서 실행 중`);
});
