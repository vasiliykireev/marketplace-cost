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
        id: 1,
        name: "Прибыль",
        type: "percent",
        percent: 20
    },
    /*{
        id: 2,
        name: "Персонал 1",
        type: "fix",
        value: 200
    },
    {
        id: 3,
        name: "Персонал 2",
        type: "fix",
        value: 300
    },
    {
        id: 4,
        name: "Маркетинг 1",
        type: "percent",
        percent: 3
    },
    {
        id: 5,
        name: "Маркетинг 2",
        type: "percent",
        percent: 2
    },*/
    {
        id: 6,
        name: "Маркетинг 3",
        type: "percent",
        percent: 3
    },
    {
        id: 7,
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
        id: 1,
        name: "Размещение",
        type: "commission",
        percent: 2
    },
    {
        id: 2,
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
            id: 1,
            name: "Обработка",
            type: "fee",
            value: 20
        },
        {
            id: 2,
            name: "Логистика",
            type: "fee",
            value: 300
        },
        {
            id: 3,
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

costs.forEach(function(cost) { // Каждый объект расходов и прибыли должен иметь значение, поэтому 
    if (cost["type"] === "percent") { // Если расход указан в процентах,
        cost["value"] = wholesalePrice * cost["percent"]/100; // то он пересчитывается в числовое значение.
        console.log(cost);
    }
})
/* Сумма расходов и прибыли */
console.log("- Расходы и прибыль:")
costs.forEach(function(cost) { // Сумма всех расходов и прибыли
    sumCosts = sumCosts + Number(cost["value"]); // В sumCosts суммируются все значения value из расходов и прибылей costs.
    console.log("name: " + cost["name"] + ", value: " + cost["value"]);
    console.log("sumCosts: " + sumCosts)
})
console.log("sumCosts (final): " + sumCosts);

/* Сумма комиссий */
console.log("- Комиссии:")
commissions.forEach(function(commission) { // Сумма всех комиссий
    sumCommissions = sumCommissions + Number(commission["percent"]); // В sumCommissions суммируются все значения percent из комиссий commissions.
    if (sumCommissions > 99) { // Сумма не может быть больше 99,
        // потому что тогда в расчетах получится отрицательное число,
        // потому что сумма комиссий не может превышать стоимость товара
        console.alert("Сумма комиссий не может быть 100 или больше процентов.")
    }
    console.log(commission["name"] + ": " + commission["percent"]);
})
console.log(sumCommissions);

/* Сумма тарифов */
console.log("- Тарифы:")
fees.forEach(function(fee) { // Сумма всех тарифов
    sumFees = sumFees + fee["value"]; // В sumFees суммируются все значения value из тарифов fees.
    console.log(fee["name"] + ": " + fee["value"]);
})
console.log(sumFees);

console.log("- Оптовая цена: " + wholesalePrice);

/* Розничная цена */
let result = (wholesalePrice + sumCosts + sumFees) / (1 - sumCommissions / 100); // Розничная цена равна сумме оптовой цены, расходов и прибыли и тарифов маркетплейса, деленых на разницу 1 (100%) и суммы процентов комиссий маркетплейсов
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
buttonAddCost.addEventListener('click', function () {addNewData("cost");});

const divCommissions = document.querySelector(".commissions");
const buttonAddComission = document.querySelector(".add__commission");
buttonAddComission.addEventListener('click', function () {addNewData("commission");});

const divFees = document.querySelector(".fees");
const buttonAddFee= document.querySelector(".add__fee");
buttonAddFee.addEventListener('click', function () {addNewData("fee");});

function addNewData(type) {
    switch (type) {
        case "cost":
            let newCost = addElement(type, divCosts);
            let newCostName = addName(type, newCost);
        break;
        case "commission":
            let newCommission = addElement(type, divCommissions);
            let newCommissionName = addName(type, newCommission);
        break;
        case "fee":
            let newFee = addElement(type, divFees);
            let newFeeName = addName(type, newFee);

        break;
        default:
            console.error("Ошибка при попытке добавления неизвестного типа!")
    }
}

function addElement(className, place) {
    const element = document.createElement("div");
    element.classList.add(className, "mb-3");
    place.append(element);
    return element;
}

function addName(type, place, name) {
    let newNameInputGroup = addInputGroup(type + "__name", place);
    let newNameFormFloating = addFormFloating(type + "__form-floating", newNameInputGroup);
    let newNameFormControl = addFormControl(type + "__form-control", newNameFormFloating);
    if (name !== undefined) {
        newNameFormControl.value = name;
    }
    newNameFormControl.focus();
    let newNameFormControlLabel = addFormControlLabel(type + "__form-control-label", newNameFormFloating);
    let newNameButtonSave = addButtonSave(type + "button-save", newNameInputGroup);
    newNameButtonSave.addEventListener('click', function (event) {
        let newName = newNameFormControl.value;
        saveName(newName, place, newNameInputGroup);
    })
    newNameFormControl.addEventListener("keypress", function(event) {
        let newName = newNameFormControl.value;
        if (event.key === "Enter") {
            saveName(newName, place, newNameInputGroup);
        }
    })
    return newNameInputGroup;
}

function saveName(name, place, remove) {
    if (name.length === 0) {
        console.warn("Нужно добавить ошибку в валидации из-за пустого имени");
        place.remove();
    } else {
        place.append(name);
        remove.remove();
    }
    console.log(name);
    console.log(name.length);
    console.log(place);

}

function addInputGroup(className, place) {
    const element = document.createElement("div");
    element.classList.add(className, "input-group");
    place.append(element);
    return element;
}

function addFormFloating(className, place) {
    const element = document.createElement("div");
    element.classList.add(className, "form-floating");
    place.append(element);
    return element;
}

function addFormControl(className, place) {
    const element = document.createElement("input");
    element.classList.add(className, "form-control");
    place.append(element);
    return element;
}

function addFormControlLabel(className, place) {
    const element = document.createElement("label");
    element.classList.add(className);
    element.innerText = "Название";
    place.append(element);
    return element;
}

function addButtonSave(className, place) {
    const element = document.createElement("button");
    element.classList.add("new-cost__button", "btn", "btn-primary");
    element.setAttribute("type", "button");
    element.setAttribute("aria-label", "Сохранить");
    element.innerHTML = '<i class="bi bi-check"></i>';
    place.append(element);
    return element;
}

function showCosts () {
    costs.forEach(function(cost) {
        let newCost = addElement("cost", divCosts);
        newCost.append(cost["id"], ". ", cost["name"], " = ", cost["value"]);
        if (cost["type"] === "percent") {
            newCost.append(" (", cost["percent"], " %)");
        }
    })
}

function showCommissions () {
    commissions.forEach(function(commission) {
        let newCommision = addElement("commission", divCommissions);
        newCommision.append(commission["id"], ". ", commission["name"], " = ", commission["percent"], " %");
    })
}

function showFees () {
    fees.forEach(function(fee) {
        let newFee = addElement("fee", divFees);
        newFee.append(fee["id"], ". ", fee["name"], " = ", fee["value"], " руб.");
    })
}

/* --- */
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
            removeElement(addCostInputGroup);
        }
    })
};

function removeElement(element) {
element.remove();
};

