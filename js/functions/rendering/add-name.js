"use strict";

console.log("add-name.js loaded");

import { addElement } from "./add-element.js";
import { addData } from "./add-data.js";
import { sourceCosts, sourceCommissions, sourceFees } from "../../../script.js";
import { deleteObject } from "../logic/delete-object.js";

export function addName(parent, type, object) {
    if (object !== undefined) {
        console.log("function addName");
        console.log(object);
    }
    const displayNameBlockInputGroup = addElement(parent, "div", [type + "__input-group", "input-group"]);
    const displayNameElementFormFloating = addElement(displayNameBlockInputGroup, "div", [type + "__form-floating", "form-floating"]);
    const displayNameInputFormControl = addElement(
        displayNameElementFormFloating,
        "input",
        [type + "__form-control", "form-control"],
        {
            "placeholder": undefined,
            "id": 'name-' + object.id,
            "name": 'name-' + object.id,
        });
    const displayNameLabelFormContol = addElement(displayNameElementFormFloating, "label", type + "__label", {"for": 'name-' + object.id});
    // displayNameLabelFormContol.innerText = object.id + ". " + object.name;
    if (object.name === undefined) {
        displayNameLabelFormContol.innerText = "Введите название";
    } else {
        displayNameInputFormControl.value = object.name;
        displayNameLabelFormContol.innerText = "Переименовать";
    }
    displayNameInputFormControl.focus();
    const displayNameButtonSave = addElement(
        displayNameBlockInputGroup,
        "button",
        [type + "__save", "btn", "btn-primary"],
        {
            "type": "button",
            "aria-label": "Сохранить"
    });
    if (object.name === undefined) {
        displayNameButtonSave.setAttribute("disabled","true");
    }
    displayNameButtonSave.innerHTML = '<i class="bi bi-check"></i>';
    displayNameButtonSave.addEventListener("click", function(event) {
        object.name = displayNameInputFormControl.value;
        const displayTypeElement = addData(parent, type, object);
        /* console.log(costs);
        console.log(commissions);
        console.log(fees); */
        displayNameBlockInputGroup.remove();
    })
    if (object.name === undefined) {
        const displayNameButtonRemove = addElement(
            displayNameBlockInputGroup,
            "button",
            [type + "__remove", "btn", "btn-light", "btn-outline-danger"],
            {
                "type": "button",
                "aria-label": "Удалить"
        });
        displayNameButtonRemove.innerHTML = '<i class="bi bi-trash"></i>';
        displayNameButtonRemove.addEventListener("click", function(event) {
            deleteObject(object);  
            displayNameBlockInputGroup.remove();
        })
    }
    //nameInputGroup.insertBefore(displayNameButtonSave, displayNameButtonRemove);

    let displayNameButtonSaveShow;
    if (object.name === undefined) {
        displayNameButtonSaveShow = true;
    } else {
        displayNameButtonSaveShow = false;
    }
    
    displayNameInputFormControl.addEventListener("input", function(event) {
        if (displayNameButtonSaveShow) {
            displayNameButtonSave.removeAttribute("disabled", "true");
            displayNameButtonSaveShow = false;
        }
        if (displayNameInputFormControl.value.length === 0) {
            displayNameButtonSave.setAttribute("disabled", "true");
            displayNameButtonSaveShow = true;
        }
    })

    displayNameInputFormControl.addEventListener("keypress", function(event) { // Добавляем отслеживание события по нажатию клавиши в поле для ввода
        if (displayNameInputFormControl.value.length !== 0) { // Если название не пустое
            if (event.key === "Enter") { // Если нажата клавиша ввода
                object.name = displayNameInputFormControl.value;
                const displayTypeElement = addData(parent, type, object);
                displayNameBlockInputGroup.remove();
            }
        }
    })
    return displayNameBlockInputGroup;
}