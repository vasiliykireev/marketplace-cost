"use strict";

import { addElement } from "../elements/add-element.js";
import { wholesalePrice, costs, commissions, fees } from "../../../script.js";
import { retailPrice } from "../logic/retail-price.js";

export function addData(place, parentClass, object) {
    //place.append(object.name + ": " + object.value);
    const dataInputGroup = addElement(place, "div", [parentClass + "__input-group", "input-group"]);
    const dataFormFloating = addElement(dataInputGroup, "div", [parentClass + "__form-floating", "form-floating"]);
    const dataFormControl = addElement(dataFormFloating,"input",[parentClass + "__form-control", "form-control"],{"placeholder": "Название"});
    switch (object.type) {
        case "fix":
            dataFormControl.value = object.value;
            break;
        case "percent":
            dataFormControl.value = object.percent;
    }
    const dataFormControlLabel = addElement(dataFormFloating, "label", parentClass + "__label");
    dataFormControlLabel.innerText = object.name;
    dataFormControl.addEventListener('input', function (event) {
    //dataFormControl.focus();
        object.value = dataFormControl.value;
        retailPrice(wholesalePrice, costs, commissions, fees);
    })
}