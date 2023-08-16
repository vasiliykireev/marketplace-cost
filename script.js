let marketplaceCostData = {};

/* Начальные данные для примера
*/
let wholesalePrice = 10000 ; // Оптовая цена

/* Расходы и прибыль
/* name: Наименование
/* type: percent - процент от оптовой цены, fix - фиксированное значение
/* percent - значение процента от оптовой цены, число
/* value - значение расхода или прибыли, число
*/
let costs = [ // Расходы и прибыль
    {
        name: "Прибыль",
        type: "percent",
        percent: 20
    },
    /*{
        name: "Персонал 1",
        type: "fix",
        value: 200
    },
    {
        name: "Персонал 2",
        type: "fix",
        value: 300
    },
    {
        name: "Маркетинг 1",
        type: "percent",
        percent: 3
    },
    {
        name: "Маркетинг 2",
        type: "percent",
        percent: 2
    },*/
    {
        name: "Маркетинг 3",
        type: "percent",
        percent: 3
    },
    {
        name: "Логистика",
        type: "fix",
        value: 200
    }
];

/* Комиссии
/* name: Наименование
/* type: commission - комиссия маркетплейса
/* percent - значение процента комиссии, число */
let commissions = [
    {
        name: "Размещение",
        type: "commission",
        percent: 2
    },
    {
        name: "Продвижение",
        type: "commission",
        percent: 5
    }
];

/* Тарифы */
/* name: Наименование
/* type: fee - тариф маркетплейса
/* value - значение расхода или прибыли, число */
let fees = [
        {
            name: "Обработка",
            type: "fee",
            value: 20
        },
        {
            name: "Логистика",
            type: "fee",
            value: 300
        },
        {
            name: "Последняя миля",
            type: "fee",
            value: 500
        }
    ];

/* --- */

/* Расчеты */
function retailPrice() {

let sumCosts = 0; // Сумма расходов и прибыли
let sumCommissions = 0; // Сумма комиссий маркетплейса
let sumFees = 0; // Сумма тарифов маркетплейса

/* Каждый объект расходов и прибыли должен иметь значение,
/* поэтому если расход указан в процентах, то он пересчитывается в числовое значение
*/
costs.forEach(function(cost) {
    if (cost["type"] === "percent") {
        cost["value"] = wholesalePrice * cost["percent"]/100;
        console.log(cost);
    }
})

/* Сумма расходов и прибыли
/* В sumCosts суммируются все значения value из расходов и прибылей costs. */
console.log("- Расходы и прибыль:")
costs.forEach(function(cost) {
    sumCosts = sumCosts + Number(cost["value"]);
    console.log("name: " + cost["name"] + ", value: " + cost["value"]);
    console.log("sumCosts: " + sumCosts)
})
console.log("sumCosts (final): " + sumCosts);

/* Сумма комиссий */
/* В sumCommissions суммируются все значения percent из комиссий commissions.
/* Сумма не может быть больше 100, иначе получится отрицательное число,
/* потому что сумма комиссий не может превышать стоимость товара
*/
console.log("- Комиссии:")
commissions.forEach(function(commission) {
    sumCommissions = sumCommissions + commission["percent"];
    console.log(commission["name"] + ": " + commission["percent"]);
})
console.log(sumCommissions);

/* Сумма тарифов */
/* В sumFees суммируются все значения value из тарифов fees.
*/
console.log("- Тарифы:")
fees.forEach(function(fee) {
    sumFees = sumFees + fee["value"];
    console.log(fee["name"] + ": " + fee["value"]);
})
console.log(sumFees);

console.log("- Оптовая цена: " + wholesalePrice);

/* Розничная цена */
/* Розничная цена равна сумме оптовой цены, расходов и прибыли и тарифов маркетплейса,
деленых на разницу 1 (100%) и суммы процентов комиссий маркетплейсов
*/
let result = (wholesalePrice + sumCosts + sumFees) / (1 - sumCommissions / 100);
result = result.toFixed(2);
console.log("- Результат: " + result);

const retailPriceValue = document.querySelector(".retail-price__value");
retailPriceValue.value = result;
}


retailPrice();


/* --- */

/* Вывод оптовой цены */
const inputWholesalePrice = document.querySelector(".wholesale-price__number");
inputWholesalePrice.value = wholesalePrice;

/* Добавить расход */
const divCosts = document.querySelector(".costs");
const buttonAddCost = document.querySelector(".add__cost");
buttonAddCost.addEventListener('click', function () {
    addCost();
});

function addCost() {
    /* Добавить название */
    const addCostInputGroup = document.createElement("div");
    addCostInputGroup.classList.add("cost", "input-group", "mb-3");
    divCosts.append(addCostInputGroup);
    const addCostFormFloating = document.createElement("div");
    addCostFormFloating.classList.add("form-floating");
    addCostInputGroup.append(addCostFormFloating);
    const addCostName = document.createElement("input");
    addCostName.classList.add("new-cost__name", "form-control");
    const addCostNameLabel = document.createElement("label");
    addCostNameLabel.innerText = "Название";
    addCostFormFloating.append(addCostName, addCostNameLabel);
    const addCostButton = document.createElement("button");
    addCostButton.classList.add("new-cost__button", "btn", "btn-primary");
    addCostButton.setAttribute("type", "button");
    addCostButton.setAttribute("aria-label", "Сохранить");
    addCostButton.innerHTML = '<i class="bi bi-check"></i>';
    addCostInputGroup.append(addCostButton);
    
    /* Добавить ввод расходов */
    const addCostFixedInputGroup = document.createElement("div");
    addCostFixedInputGroup.classList.add("fixed-cost", "input-group", "mb-3");
    const addCostFixedFormFloating = document.createElement("div");
    addCostFixedFormFloating.classList.add("form-floating");
    const addCostFixedInput = document.createElement("input");
    addCostFixedInput.classList.add("fixed-cost__input", "form-control");
    addCostFixedInput.setAttribute("type", "number");
    addCostFixedInput.setAttribute("min", "0");
    addCostFixedInput.setAttribute("step", "0.01");
    const addCostFixedLabel = document.createElement("label");

    addCostButton.addEventListener('click', function () {
        let costName = addCostName.value;
        console.log(costName.length);
        if (costName.length === 0) {
            alert("Добавить ошибку в валидации из-за пустого имени");
        } else {
            addCostInputGroup.after(addCostFixedInputGroup); //divCosts.append(addCostFixedInputGroup);
            addCostFixedInputGroup.append(addCostFixedFormFloating);
            //addCostFixedInput.setAttribute("placeholder", "Введите " + costName);
            addCostFixedInput.setAttribute("aria-label", costName);
            addCostFixedLabel.innerText = costName;
            addCostFixedFormFloating.append(addCostFixedInput, addCostFixedLabel);

            costs.push({name:costName});
            // Надо что-то придумать с айдишниками
            addCostFixedInput.addEventListener('input', function () {
                costName = addCostFixedInput.ariaLabel;
                console.log("change: " + costName);
                let addCostIndex = costs.find(findCost => findCost.name === costName);
                addCostIndex["value"] = addCostFixedInput.value;
                console.log(addCostIndex);
                console.log(costs);
                retailPrice();
            });
            removeName(addCostInputGroup);
        }
    })
};

function removeName(element) {
element.remove();
};

