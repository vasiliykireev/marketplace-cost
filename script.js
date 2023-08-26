"use strict";

let marketplaceCostData = {};

/* Начальные данные для примера
*/
let wholesalePrice = 10000 ; // Оптовая цена

/* Расходы и прибыль
/* id: порядковый номер, число
/* name: Наименование, строка
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
/* id: порядковый номер, число
/* name: Наименование, строка
/* type: commission - комиссия маркетплейса
/* percent - значение процента комиссии, число
*/
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
/* id: порядковый номер, число
/* name: Наименование, строка
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

let currency = " руб.";

/* Получение оптовой цены */
const inputWholesalePrice = document.querySelector(".wholesale-price__number"); // Определяем элемент, где находится поле для ввода оптовой цена
inputWholesalePrice.value = wholesalePrice; // Добавляем в него оптовую цену из примера
inputWholesalePrice.addEventListener('input', function (event) { // Добавляем отслеживание событий по вводу данных в поле для ввода
    wholesalePrice = Number(inputWholesalePrice.value); // Записываем новую оптовую цену из поля для ввода
    retailPrice(); // Пересчитываем розничную цену
})

/* Кнопки добавления новых данных */
const divCosts = document.querySelector(".costs"); // Определяем элемент, куда добавлять новые расходы
const buttonAddCost = document.querySelector(".add__cost"); // Определяем кнопку, нажатие на которую добавляет новые расходы
buttonAddCost.addEventListener('click', function () {addNewData("cost");}); // Добавляем отслеживание событий по этой кнопке

const divCommissions = document.querySelector(".commissions"); // Определяем элемент, куда добавлять новые комиссии
const buttonAddComission = document.querySelector(".add__commission"); // Определяем кнопку, нажатие на которую добавляет новые комиссии
buttonAddComission.addEventListener('click', function () {addNewData("commission");}); // Добавляем отслеживание событий по этой кнопке

const divFees = document.querySelector(".fees"); // Определяем элемент, куда добавлять новые тарифы
const buttonAddFee= document.querySelector(".add__fee"); // Определяем кнопку, нажатие на которую добавляет новые тарифы
buttonAddFee.addEventListener('click', function () {addNewData("fee");}); // Добавляем отслеживание событий по этой кнопке

/* Функции */

function retailPrice() { // Расчет розничной цены

    let sumCommissions = 0; // Сумма комиссий маркетплейса
    let sumCosts = 0; // Сумма расходов и прибыли
    let sumFees = 0; // Сумма тарифов маркетплейса
    costs.forEach(function(cost) { // Каждый объект расходов и прибыли должен иметь значение, поэтому 
    if (cost["type"] === "percent") { // Если расход указан в процентах,
        
            cost["value"] = wholesalePrice * cost["percent"]/100; // то он пересчитывается в числовое значение.
            //console.log(cost);
        }
    })
    /* Сумма расходов и прибыли */
    //console.log("- Расходы и прибыль:")
    costs.forEach(function(cost) { // Сумма всех расходов и прибыли
        sumCosts = sumCosts + Number(cost["value"]); // В sumCosts суммируются все значения value из расходов и прибылей costs.
        //console.log("name: " + cost["name"] + ", value: " + cost["value"]);
        //console.log("sumCosts: " + sumCosts)
    })
    //console.log("sumCosts (final): " + sumCosts);
    /* Сумма комиссий */
    //console.log("- Комиссии:")
    
    commissions.forEach(function(commission) { // Сумма всех комиссий
        sumCommissions = sumCommissions + Number(commission["percent"]); // В sumCommissions суммируются все значения percent из комиссий commissions.
        if (sumCommissions > 99) { // Сумма не может быть больше 99,
            // потому что тогда в расчетах получится отрицательное число,
            // потому что сумма комиссий не может превышать стоимость товара
            console.alert("Сумма комиссий не может быть 100 или больше процентов.")
        }
        //console.log(commission["name"] + ": " + commission["percent"]);
    })
    //console.log(sumCommissions);
    
    /* Сумма тарифов */
    //console.log("- Тарифы:")
    fees.forEach(function(fee) { // Сумма всех тарифов
        sumFees = sumFees + fee["value"]; // В sumFees суммируются все значения value из тарифов fees.
        //console.log(fee["name"] + ": " + fee["value"]);
    })
    //console.log(sumFees);
    
    //console.log("- Оптовая цена: " + wholesalePrice);
    
    /* Розничная цена */
    let result = (wholesalePrice + sumCosts + sumFees) / (1 - sumCommissions / 100); // Розничная цена равна сумме оптовой цены, расходов и прибыли и тарифов маркетплейса, деленых на разницу 1 (100%) и суммы процентов комиссий маркетплейсов
    result = result.toFixed(2);
    //console.log("- Результат: " + result);
    
    const retailPriceValue = document.querySelector(".retail-price__value");
    retailPriceValue.value = result;
    console.log("Розничная цена: " + result);
}

function addNewData(type) { // Функция добавления новых данных в зависимости от типа
    switch (type) {
        case "cost": // Если добавляем расход
            let newCost = addElement(type, divCosts); // Добавляем новый элемент расхода
            let newCostName = addName(type, newCost); // Добавляем новое название для расхода
        break;
        case "commission": // Если добавляем комиссию
            let newCommission = addElement(type, divCommissions); // Добавляем новый элемент комиссии
            let newCommissionName = addName(type, newCommission); // Добавляем новое название для комиссии
        break;
        case "fee": // Если добавляем тариф
            let newFee = addElement(type, divFees); // Добавляем новый элемент тарифа
            let newFeeName = addName(type, newFee); // Добавляем новое название для тарифа

        break;
        default: // В любом другом случае
            console.error("Ошибка при попытке добавления неизвестного типа!")
    }
}

function addElement(className, place) { // Функция добавления нового элемента с переданным именем класса и местом
    const element = document.createElement("div"); // Создаем элемент
    element.classList.add(className, "mb-3"); // Добавляем нужный класс и отступ снизу
    place.append(element); // Размещаем элемент
    return element; // Возвращаем элемент
}

function addName(type, place, name) { // Функция добавления нового названия с переданным именем класса, местом и названием
    let newNameInputGroup = addInputGroup(type + "__name", place); // Добавляем группу ввода для добавления названия
    let newNameFormFloating = addFormFloating(type + "__form-floating", newNameInputGroup); // Добавляем плавающую форму
    let newNameFormControl = addFormControl(type + "__form-control-name", newNameFormFloating); // Добавляем поле для ввода в форму
    if (name !== undefined) { // Если в функции передано название
        newNameFormControl.value = name; // Выводим его в значении поля для вводаа
    }
    newNameFormControl.focus(); // Устанавливаем фокус в созданном поле для ввода
    let newNameFormControlLabel = addFormControlLabel(type + "__form-control-name-label", newNameFormFloating, "Название"); // Добавляем подпись в форму
    let newNameButtonDeleteStatus = true; // Определяем, что кнопка удаления названия должна быть
    let newNameButtonSaveStatus = false; // Определяем, что кнопки сохранения названия не должно быть
    let newNameButtonDelete = addNameButtonDelete(type, newNameInputGroup); // Добавляем кнопку для удаления названия
    newNameButtonDelete.addEventListener('click', function (event) { // Добавляем отслеживание события по этой кнопке
        newNameInputGroup.remove(); // Удаляем группу для добавления названия
    })

    newNameFormControl.addEventListener("keypress", function(event) { // Добавляем отслеживание события по нажатию клавиши в поле для ввода
        let newName = newNameFormControl.value; // Записываем в название значение поля для ввода
        if (newName.length !== 0) { // Если название не пустое
            if (event.key === "Enter") { // Если нажата клавиша ввода
                saveName(newName, place, newNameInputGroup); // Сохраняем название и удаляем группу для добавления названия
            }
        }
    })

    newNameFormControl.addEventListener("input", function(event) { // Добавляем отслеживание события по вводу данных в поле для ввода
        let newName = newNameFormControl.value; // Записываем в название значение поля для ввода
        if (newName.length === 0) { // Если название пустое
            const oldNameButtonSave = newNameInputGroup.querySelector("." + type + "__button-save"); // Находим старую кнопку сохранения названия
            if (newNameButtonSaveStatus === true) { // Если статус для кнопки сохранения названия верен
                oldNameButtonSave.remove(); // Удаляем старую кнопку
            }
            if (newNameButtonDeleteStatus === false) { // Если определено, что кнопка удаления названия не должна быть
                let newNameButtonDelete = addNameButtonDelete(type, newNameInputGroup); // Добавляем кнопку удаления названия
                newNameButtonDelete.addEventListener('click', function (event) { // Добавляем отслеживание события по нажатию на эту кнопку
                    newNameInputGroup.remove(); // Удаляем группу для добавления названия
                })
            }
            newNameButtonDeleteStatus = true; // Определяем, что кнопка удаления названия должна быть
            newNameButtonSaveStatus = false; // Определяем, что кнопки сохранения названия не должно быть
        }
        else { // Если название не пустое
            const oldNameButtonDelete = newNameInputGroup.querySelector("." + type + "__button-delete"); // Находим старую кнопку удаления названия
            if (newNameButtonDeleteStatus === true) { // Если определено, что кнопка удаления названия должна быть
                oldNameButtonDelete.remove(); // Удаляем кнопку удаления названия
            }
            if (newNameButtonSaveStatus === true) { // Если определено, что кнопка сохранения названия должна быть
                let oldNameButtonSave = newNameInputGroup.querySelector("." + type + "__button-save"); // Находим старую кнопку сохранения названия
                oldNameButtonSave.remove(); // Удаляем старую кнопку сохранения названия
            }
            const newNameButtonSave = addNameButtonSave(type, newNameInputGroup); // Добавляем кнопку сохранения названия
            newNameButtonSave.addEventListener('click', function (event) { // Добавляем отслеживание события по нажатию на эту кнопку
                saveName(newName, place, newNameInputGroup); // Сохраняем название и удаляем группу для добавления названия
            })
            newNameButtonDeleteStatus = false; // Определяем, что кнопки удаления названия не должно быть
            newNameButtonSaveStatus = true; // Определяем, что кнопка сохранения названия должна быть
        }
    })

    return newNameInputGroup; // Возвращаем группу для добавления названия
}

function saveName(name, place, removeElement) { // Функция сохранения названия с переданными названием, местом и элементом для удаления
    costs.push({
        "name": name,
        "type": "fix",
        "value": ""
    })
    showCost(costs[Number(costs.length - 1)], Number(costs.length - 1));
    //place.append(name); // Размещаем название
    removeElement.remove(); // Удаляем элемент для удаления
}

function addInputGroup(className, place) { // Функция добавления группы ввода с переданным именем класса и местом
    const element = document.createElement("div"); // Создаем элемент
    element.classList.add(className, "input-group"); // Добавляем в него названия классов
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function addFormFloating(className, place) { // Функция добавления плавающей формы с переданным именем класса и местом
    const element = document.createElement("div"); // Создаем элемент
    element.classList.add(className, "form-floating"); // Добавляем в него названия классов
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function addFormControl(className, place) { // Функция добавления поля для ввода с переданным именем класса и местом
    const element = document.createElement("input"); // Создаем поле для ввода
    element.classList.add(className, "form-control"); // Добавляем в него названия классов
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function setFormControlNumber(element, min, step) { // Функция преобразование поля для ввода только для чисел с переданным элементом, минимальным значением и шагом 
    element.setAttribute("type", "number"); // Устанавливаем тип число
    element.setAttribute("min", min); // Устанавливаем минимальное значение
    element.setAttribute("step", step); // Устанавливаем шаг
    return element; // Возвращаем элемент
}

function addFormControlLabel(className, place, label) { // Функция добавления подписи с переданным именем класса, местом и подписью
    const element = document.createElement("label"); // Создаем подпись
    element.classList.add(className); // Добавляем в него названия классов
    element.innerText = label; // Добавляем подпись
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function addButton(className, place) { // Функция добавления кнопки с переданным именем класса, местом и стилистикой
    const element = document.createElement("button"); // Создаем кнопку
    element.classList.add(className, "btn"); // Добавляем в него названия классов
    element.setAttribute("type", "button"); // Устанавливаем тип кнопка
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
}

function addNameButtonDelete(className, place) { // Функция добавления кнопки удаления названия с переданным именем класса и местом
    const element = addButton(className + "__button-delete", place); // Добавляем кнопку
    element.classList.add("btn-danger"); // Добавляем красный фон
    element.setAttribute("aria-label", "Удалить"); // Добавляем подпись для доступности
    element.innerHTML = '<i class="bi bi-trash-fill"></i>'; // Добавляем иконку корзины
    return element; // Возвращаем кнопку
}
function addNameButtonSave(className, place) { // Функция добавления кнопки добавления названия с переданным с именем класса и местом
    const element = addButton(className + "__button-save", place); // Добавляем кнопку
    element.classList.add("btn-primary"); // Добавляем основной фон
    element.setAttribute("aria-label", "Сохранить"); // Добавляем подпись для доступности
    element.innerHTML = '<i class="bi bi-check"></i>'; // Добавляем иконку галочки
    return element;
}

function addDataButtonActions(className, place) { // Функция добавляения кнопки изменения данных с переданным именем класса и местом
    const element = addButton(className + "__button-actions", place);
    element.classList.add("btn-primary", "dropdown-toggle"); // Добавляем основной фон и выпадающий треугольник
    element.setAttribute("data-bs-toggle", "dropdown"); // Добавляем логику выдадающего меню
    element.setAttribute("aria-expanded", "false"); // Добавляем информацию для доступности
    place.append(element); // Размещаем элемент в нужном месте
    return element; // Возвращаем элемент
    
}

function addDataButtonOptionRename(className, place, name) { // Функция добавляения кнопки изменения данных с переданным именем класса, местом и именем

}

function addDataButtonOptionDelete (className, place, name) { // Функция добавляения кнопки удаления данных с переданным именем класса, местом и именем

}

function showCosts() { // Функция отображения расходов
    let index; // Индекс для массива расходов
    for (index = 0; index < costs.length; ++index) { // Цикл перебора расходов
        showCost(costs[index], index); // Отображаем расход
    }
}

function showCost(cost, index) { // Функция отображения расхода
    console.log("showCost:")
    console.log(cost);
    let newCost = addElement("cost", divCosts); // Добавляем новый элемент для расхода
    let newCostInputGroup = addInputGroup("cost__input-group", newCost); // Добавляем новую группу
    let newCostFormFloating = addFormFloating("cost__form-floating", newCostInputGroup); // Добавляем новую плавующую форму
    let newCostFormControl = addFormControl("cost__form-control-" + cost["type"], newCostFormFloating); // Добавляем новое поле для ввода
    setFormControlNumber(newCostFormControl, 0, 0.01); // Преобразуем поле для ввода только для чисел от 0 с шагом 0.01
    newCostFormControl.value = cost["value"]; // Добавляем значение расхода в поле для ввода
    if (cost["value"] === "") { // Если значение расхода нет
        newCostFormControl.focus(); // Устанавливаем фокус в созданном поле для ввода
    }
    newCostFormControl.addEventListener('input', function () {
        console.log(newCostFormControl);
        
        retailPrice();
    })
    let newCostFormControlLabel = addFormControlLabel("cost__form-control-"+ cost["type"] + "-label", newCostFormFloating); // Добавляем подпись
    switch(cost["type"]) {
        case "fix": // Если расход фиксированный
            newCostFormControlLabel.innerText = Number(index + 1) + ". " + cost["name"] + ", " + currency; // Добавляем в подпись порядковый номер, название и курс валюты
        break;
        case "percent": // Если расход в процентах
            newCostFormControlLabel.innerText = Number(index + 1) + ". " + cost["name"] + ", " + "%"; // Добавляем в подпись порядковый номер, название и процент
        break;
        default: // В любом другом случае
            console.error("Ошибка при попытке добавления неизвестного расхода!")
        break;
    }
    let newCostDataButtonOptions = addDataButtonActions("cost", newCostInputGroup); // Добавляем кнопку с выпадающим списком для действий
}

function showCommissions () { // Функция отображения комиссий
    commissions.forEach(function(commission) {
        let newCommision = addElement("commission", divCommissions);
        newCommision.append(commission["id"], ". ", commission["name"], " = ", commission["percent"], " %");
    })
}

function showFees () { // Функция отображения тарифов
    fees.forEach(function(fee) {
        let newFee = addElement("fee", divFees);
        newFee.append(fee["id"], ". ", fee["name"], " = ", fee["value"], " руб.");
    })
}

/* Вывод начальных данных */

retailPrice(); // Пересчитываем розничную цену

showCosts(); // Выводим расходы