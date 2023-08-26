"use strict";

console.log("add-name.js loaded");

import { addElement } from "../elements/add-element.js";
import { addData } from "./add-data.js";
import { costs, commissions, fees } from "../../../script.js";

export function addName(place, parentClass, object) {
    if (object !== undefined) {
        console.log("Add name object");
        console.log(object);
    }
    const nameInputGroup = addElement(place, "div", [parentClass + "__input-group", "input-group"]);
    const nameFormFloating = addElement(nameInputGroup, "div", [parentClass + "__form-floating", "form-floating"]);
    const nameFormControl = addElement(nameFormFloating,"input",[parentClass + "__form-control", "form-control"],{"placeholder": undefined});
    const nameFormControlLabel = addElement(nameFormFloating, "label", parentClass + "__label");
    // nameFormControlLabel.innerText = object.id + ". " + object.name;
    nameFormControlLabel.innerText = object.name;
    nameFormControl.focus();
    const nameButtonDelete = addElement(
        nameInputGroup,
        "button",
        [parentClass + "__delete", "btn", "btn-light", "btn-outline-danger"],
        {
            "type": "button",
            "aria-label": "Удалить"
    });
    nameButtonDelete.innerHTML = '<i class="bi bi-trash"></i>';
    nameButtonDelete.addEventListener("click", function(event) {
        switch (parentClass) {
            case "cost":
                console.log("case cost");
                console.log("indexof");
                console.log(costs.indexOf(object));
                costs.splice(costs.indexOf(object),1);
                console.log(costs);
                break;
            case "commission":
                console.log("case commission");
                console.log("indexof");
                console.log(commissions.indexOf(object));
                commissions.splice(commissions.indexOf(object),1);
                console.log(commissions);
                break;
            case "fee":
                console.log("case fee");
                console.log("indexof");
                console.log(fees.indexOf(object));
                fees.splice(fees.indexOf(object),1);
                console.log(fees);
                break;
            default: console.warn("Неверно передан родительский класс для удаления");
        }

        nameInputGroup.remove();
    })
    let showButtonSave = true;
    
    nameFormControl.addEventListener("input", function(event) {
        if (showButtonSave) {
            const nameButtonSave = addElement(
                nameInputGroup,
                "button",
                [parentClass + "__save", "btn", "btn-primary"],
                {
                    "type": "button",
                    "aria-label": "Сохранить"
            });
            nameButtonSave.innerHTML = '<i class="bi bi-check"></i>';
            nameButtonSave.addEventListener("click", function(event) {
                object.name = nameFormControl.value;
                const newData = addData(place, parentClass, object);
                console.log(costs);
                console.log(commissions);
                console.log(fees);
                nameInputGroup.remove();
            })
            nameInputGroup.insertBefore(nameButtonSave, nameButtonDelete);
            showButtonSave = false;
        }
        if (nameFormControl.value.length === 0) {
            nameInputGroup.querySelector("." + parentClass + "__save").remove();
            showButtonSave = true;
        }
    })

    nameFormControl.addEventListener("keypress", function(event) { // Добавляем отслеживание события по нажатию клавиши в поле для ввода
        if (nameFormControl.value.length !== 0) { // Если название не пустое
            if (event.key === "Enter") { // Если нажата клавиша ввода
                //saveName(newName, place, newNameInputGroup); // Сохраняем название и удаляем группу для добавления названия
                object.name = nameFormControl.value;
                const newCostFix = addData(place, "cost-fix", object);
                console.log(costs);
                nameInputGroup.remove();
            }
        }
    })

    return nameInputGroup;

    //addElement(place, tag, classes, attributes = [])
}






































function oldAddName(id, type, place, name) { // Функция добавления нового названия с переданным именем класса, местом и названием
    console.log(id);
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