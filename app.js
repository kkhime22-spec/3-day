function toNumber(v) {
  if (typeof v !== "string") return v;
  const cleaned = v.replace(/,/g, "").trim();
  if (cleaned === "") return NaN;
  return Number(cleaned);
}

function validateInputs(target, cash, income) {
  const t = toNumber(target);
  const c = toNumber(cash);
  const i = toNumber(income);
  if (target === "" || cash === "" || income === "" || target == null || cash == null || income == null) {
    return { valid: false, message: "금액을 모두 입력해 주세요" };
  }
  if (Number.isNaN(t) || Number.isNaN(c) || Number.isNaN(i) || t < 0 || c < 0 || i < 0) {
    return { valid: false, message: "0 이상의 숫자로 입력해 주세요" };
  }
  return { valid: true, message: "" };
}

function calcFundGap(target, cash, income, rate) {
  const t = toNumber(target);
  const c = toNumber(cash);
  const i = toNumber(income);
  const r = typeof rate === "number" ? rate : LENDING_RATE_2025;
  const gap = Math.max(t - c, 0);
  const interestPerYear = Math.round(gap * r / 100 * 10) / 10;
  const monthsOfIncome = i > 0 ? Math.round((gap / i) * 10) / 10 : 0;
  return { gap, interestPerYear, monthsOfIncome };
}

function formatWon(n) {
  return n.toLocaleString("ko-KR");
}

function runCalculation() {
  const unitSelect = document.getElementById("unit-select");
  const targetInput = document.getElementById("target-input");
  const cashInput = document.getElementById("cash-input");
  const incomeInput = document.getElementById("income-input");
  const errorBox = document.getElementById("error-box");
  const resultBox = document.getElementById("result-box");
  const unitInfoBox = document.getElementById("unit-info-box");

  errorBox.textContent = "";
  errorBox.style.display = "none";
  resultBox.style.display = "none";

  const target = targetInput.value;
  const cash = cashInput.value;
  const income = incomeInput.value;

  const check = validateInputs(target, cash, income);
  if (!check.valid) {
    errorBox.textContent = check.message;
    errorBox.style.display = "block";
    return;
  }

  const unit = HOUSING_SUPPLY[unitSelect.value];
  const result = calcFundGap(target, cash, income, LENDING_RATE_2025);

  unitInfoBox.innerHTML =
    "<div class=\"unit-name\">" + unit.name + "</div>" +
    "<div class=\"unit-meta\">합계 " + unit.total + "세대 · 사전청약 " + unit.pre + " · 본청약 " + unit.main +
    " · 공급예정 " + unit.year + "년 " + unit.month + "월</div>";

  document.getElementById("gap-value").textContent = formatWon(result.gap) + "만원";
  document.getElementById("interest-value").textContent = "약 " + formatWon(result.interestPerYear) + "만원";
  document.getElementById("months-value").textContent = "약 " + formatWon(result.monthsOfIncome) + "개월치";

  resultBox.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("unit-select");
  HOUSING_SUPPLY.forEach(function (unit, idx) {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = unit.name;
    select.appendChild(opt);
  });
  document.getElementById("calc-btn").addEventListener("click", runCalculation);
});

