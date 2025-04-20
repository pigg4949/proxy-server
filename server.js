const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// ✅ CORS 정책 명시적으로 설정
const corsOptions = {
  origin: "*", // 또는 "https://pigg4949.github.io" (보안 강화 시)
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// ✅ 서울열린데이터광장 지하철 역 정보 API
app.get("/proxy", async (req, res) => {
  try {
    const apiUrl =
      "http://openapi.seoul.go.kr:8088/6e786a614970696733336d62577357/json/TbSeoulmetroStOrigin/1/599/";
    const response = await axios.get(apiUrl, {
      timeout: 7000,
    });
    res.json(response.data);
  } catch (error) {
    console.error("❌ API 요청 실패:", error.message);
    res
      .status(500)
      .json({ error: "서울 API 요청 실패", detail: error.message });
  }
});

// ✅ 서버 상태 확인용 엔드포인트 (옵션)
app.get("/health", (req, res) => {
  res.send("✅ 서버 정상 작동 중");
});

// ✅ 포트 설정 및 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중`);
});
