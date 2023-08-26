"use strict";

export function showCost(cost, index) { // Функция отображения расхода
    console.log("showCost:")
    console.log(cost);
    let newCost = addBlock("cost", divCosts); // Добавляем новый элемент для расхода
    newCost.classList.add("mb-3");  // Добавляем отступ снизу
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
        
        retailPrice(wholesalePrice, costs, commissions, fees);
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