let personNumber = 1;
let price = 0;
let tipPrice = 0;
let totalPrice = 0;
let tipRatio = 0;

var selectedTipButton = null;

const tipButtons = document.querySelectorAll(".calculator__tip-button");
const resetButton = document.querySelector(".calculator__reset-button");

const billInput = document.querySelector("#bill");
const personInput = document.querySelector("#people");

const tipPriceOutput = document.querySelector("#tip_price");
const totalPriceOutput = document.querySelector("#total_price");

resetButton.addEventListener("click", reset);
tipButtons.forEach((tipButton) => {
    tipButton.addEventListener("click", () => {
        clearSelectedTipButton();
        selectTipButton(tipButton);
        calculatePrice();
        showResult();
    });
});

billInput.addEventListener("input", () => {
    price = Number(billInput.value);
    calculatePrice();
    showResult();
});

personInput.addEventListener("input", () => {
    personNumber = Number(personInput.value);
    calculatePrice();
    showResult();
});

// 입력, 출력 창, 변수 초기화
function reset() {
    personNumber = 1;
    price = 0;
    tipPrice = 0;
    totalPrice = 0;
    tipRatio = 0;

    billInput.value = "";
    personInput.value = "";
    tipPriceOutput.textContent = "$0.00";
    totalPriceOutput.textContent = "$0.00";
    clearSelectedTipButton();
}

// 가격 계산
function calculatePrice() {
    if (personNumber <= 0) {
        tipPriceOutput.textContent = "$0.00";
        totalPriceOutput.textContent = "$0.00";
        return;
    }
    tipPrice = price * tipRatio;
    totalPrice = price + tipPrice;
}

// 결과 출력
function showResult() {
    tipPriceOutput.textContent = "$" + (tipPrice / personNumber).toFixed(2);
    totalPriceOutput.textContent = "$" + (totalPrice / personNumber).toFixed(2);
}

// 선택된 팁 버튼 초기화
function clearSelectedTipButton() {
    if (selectedTipButton)
        selectedTipButton.setAttribute("class", "calculator__tip-button");
}

// 팁 버튼을 선택했을 때 실행되는 함수
function selectTipButton(button) {
    if (selectedTipButton === button) {
        selectedTipButton = null;
        tipRatio = 0;
    } else {
        selectedTipButton = button;
        selectedTipButton.setAttribute(
            "class",
            "calculator__tip-button--selected"
        );
        tipRatio = Number(button.textContent.replace("%", "")) / 100;
    }
}
