// 출처: 서울주택도시개발공사 · 서울주택도시공사_주택분양 정보
// 등록 2026-06-22(수정 2026-06-24) · https://www.data.go.kr/data/15008820/fileData.do
// (data/raw/서울주택도시공사_주택분양정보_20260622.csv 를 그대로 옮김)
const HOUSING_SUPPLY = [
  { name: "마곡지구 17단지 59㎡", complex: "마곡지구 17단지", type: "59", total: 355, pre: 175, main: 180, month: "02", year: "2026" },
  { name: "마곡지구 17단지 84㎡", complex: "마곡지구 17단지", type: "84", total: 26, pre: 0, main: 26, month: "02", year: "2026" },
  { name: "고덕강일 3단지 49㎡", complex: "고덕강일 3단지", type: "49", total: 590, pre: 590, main: 0, month: "08", year: "2026" },
  { name: "고덕강일 3단지 59㎡", complex: "고덕강일 3단지", type: "59", total: 715, pre: 500, main: 215, month: "08", year: "2026" }
];

// 출처: World Bank Open Data · FR.INR.LEND(Lending interest rate), 2025년(연간)
// https://api.worldbank.org/v2/country/KOR/indicator/FR.INR.LEND?format=json
// (data/public/kor_macro_annual.js 의 2025년 lending_rate_pct 값)
const LENDING_RATE_2025 = 4.192;

