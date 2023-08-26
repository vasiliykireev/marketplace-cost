"use strict";

console.log("add-data.js loaded");

import { addElement } from "../elements/add-element.js";
import { wholesalePrice, costs, commissions, fees } from "../../../script.js";
import { inputWholesalePrice } from "../../../script.js";
import { retailPrice } from "../logic/retail-price.js";

export function addData(place, parentClass, object) {
    //place.append(object.name + ": " + object.value);
    const dataInputGroup = addElement(place, "div", [parentClass + "__input-group", "input-group"]);
    const dataFormFloating = addElement(dataInputGroup, "div", [parentClass + "__form-floating", "form-floating"]);
    const dataFormControl = addElement(
        dataFormFloating,
        "input",
        [parentClass + "__form-control", "form-control"],
        {
            "type": "number",
            "min": 0,
            "step": 0.01,
            "placeholder": ""
        });
    const dataFormControlLabel = addElement(dataFormFloating, "label", parentClass + "__label");
    switch (object.type) {
        case "fix":
            console.log('case fix')
            dataFormControl.value = object.value;
            dataFormControlLabel.innerText = object.name + ", руб.";
            dataFormControl.addEventListener('input', function (event) {
                object.value = dataFormControl.value;
                console.log(costs);
                retailPrice(wholesalePrice, costs, commissions, fees);
            })
            break;
        case "percent":
            console.log('case percent')
            dataFormControl.value = object.percent;
            dataFormControlLabel.innerText = object.name + ", %";
            const valueInputGroup = addElement(place, "div", [parentClass + "__value-input-group", "input-group"]);
            const valueFormFloating = addElement(valueInputGroup, "div", [parentClass + "__value-form-floating", "form-floating"]);
            const valueFormControl = addElement(
                valueFormFloating,
                "input",
                [parentClass + "__value-form-control-plaintext", "form-control-plaintext"],
                {
                    "type": "number",
                    "min": 0,
                    "step": 0.01,
                    "placeholder": "",
                    "readonly": true
                });
            const valueFormControlLabel = addElement(valueFormFloating, "label", parentClass + "__value-label");
            valueFormControl.value = object.value;
            valueFormControlLabel.innerText = object.name + ", руб.";
            dataFormControl.addEventListener('input', function (event) {
                object.percent = dataFormControl.value;
                console.log(costs);
                retailPrice(wholesalePrice, costs, commissions, fees);
                valueFormControl.value = object.value;
                //dataFormControlLabel.innerText = object.value;
            })
            inputWholesalePrice.addEventListener('input', function (event) {
                object.percent = dataFormControl.value;
                valueFormControl.value = object.value;
            })
            break;
        case 'commission':
            console.log('case commission')
            dataFormControl.value = object.percent;
            dataFormControlLabel.innerText = object.name + ", %";
            dataFormControl.addEventListener('input', function (event) {
                object.percent = dataFormControl.value;
                console.log(commissions);
                retailPrice(wholesalePrice, costs, commissions, fees);
            })
            break;
        case 'fee':
            console.log('case fee')
            dataFormControl.value = object.value;
            dataFormControlLabel.innerText = object.name + ", руб.";
            dataFormControl.addEventListener('input', function (event) {
                object.value = dataFormControl.value;
                console.log(fees);
                retailPrice(wholesalePrice, costs, commissions, fees);
            })
            break;
        }
    dataFormControl.focus();

    

}