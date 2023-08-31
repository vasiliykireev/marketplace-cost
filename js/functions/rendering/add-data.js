"use strict";

console.log("add-data.js loaded");

import { addElement } from "../elements/add-element.js";
import { wholesalePrice, costs, commissions, fees } from "../../../script.js";
import { inputWholesalePrice } from "../../../script.js";
import { retailPrice } from "../logic/retail-price.js";
import { deleteObject } from "../logic/delete-object.js";
import { addName } from "./add-name.js";

export function addData(place, parentClass, object) {
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
    let valueInputGroup;
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
            valueInputGroup = addElement(place, "div", [parentClass + "__value-input-group", "input-group"]);
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
            console.log("valueInputGroup");
            console.log(valueInputGroup);
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
    const dataDropdown = addElement(
        dataInputGroup,
        "button", [parentClass + "__dropdown-options", "btn", "btn-primary", "dropdown-toggle"],
        {
            "data-bs-toggle": "dropdown",
            "aria-label": "Изменить",
            "aria-expanded": "false"
        }
        );

    const dataDropdownMenu = addElement(
        dataInputGroup,
        "ul",
        [parentClass + "__dropdown-menu", "dropdown-menu", "dropdown-menu-end"]
    );
    let dataDropdownMenuItemFix;
    let dataDropdownMenuItemPercent;
    let dataDropdownMenuHr;

    /* Фиксированная стоимость */
    if (object.type === "fix" || object.type === "percent") {
        dataDropdownMenuItemFix = addElement(
            dataDropdownMenu,
            "li",
            parentClass + "__dropdown-menu-item-fix"
        );
        const dataDropdownMenuItemFixLink = addElement(
            dataDropdownMenuItemFix,
            "button",
            [parentClass + "__dropdown-menu-item-fix-link", "dropdown-item", "btn", "btn-light"],
            {
                "type": "button"
            }
        );
        dataDropdownMenuItemFixLink.innerText = "Фиксированная стоимость";
        if (object.type === "fix") {
            dataDropdownMenuItemFixLink.setAttribute("disabled", "true");
            console.log("dataDropdownMenuItemFixLink.setAttribute")
        }
        dataDropdownMenuItemFixLink.addEventListener('click', function (event) {
            dataInputGroup.remove();
            if (valueInputGroup !== undefined) {
                valueInputGroup.remove();
            }
            object.type = "fix";
            addData(place, parentClass, object);
        });

        /* Процент от оптовой цены */
            dataDropdownMenuItemPercent = addElement(
                dataDropdownMenu,
                "li",
                parentClass + "__dropdown-menu-item-percent"
            );
            const dataDropdownMenuItemPercentLink = addElement(
                dataDropdownMenuItemPercent,
                "button",
                [parentClass + "__dropdown-menu-item-percent-link", "dropdown-item", "btn", "btn-light"],
                {
                    "type": "button"
                }
            );
            dataDropdownMenuItemPercentLink.innerText = "Процент от оптовой цены";
            if (object.type === "percent") {
                dataDropdownMenuItemPercentLink.setAttribute("disabled", "true");
            }
            dataDropdownMenuItemPercentLink.addEventListener('click', function (event) {
                dataInputGroup.remove();
                if (valueInputGroup !== undefined) {
                    valueInputGroup.remove();
                }
                object.type = "percent";
                object.percent = object.value / wholesalePrice * 100;
                addData(place, parentClass, object);
            });

        /* Разделитель */
        dataDropdownMenuHr = addElement(
            dataDropdownMenu,
            "li",
            parentClass + "__dropdown-menu-item-hr"
        );
        const dataDropdownMenuHrDivider = addElement(
            dataDropdownMenuHr,
            "hr",
            "dropdown-divider"
        )

        }

    /* Переименовать */
    const dataDropdownMenuItemRename = addElement(
        dataDropdownMenu,
        "li",
        parentClass + "__dropdown-menu-item-rename"
    );
    const dataDropdownMenuItemRenameLink = addElement(
        dataDropdownMenuItemRename,
        "button",
        [parentClass + "__dropdown-menu-item-rename-link", "dropdown-item", "btn", "btn-light"],
        {
            "type": "button"
        }
    );
    dataDropdownMenuItemRenameLink.innerText = "Переименовать";
    dataDropdownMenuItemRenameLink.addEventListener('click', function (event) {
        addName(place, parentClass, object);
        dataInputGroup.remove();
        if (valueInputGroup !== undefined) {
            valueInputGroup.remove();
        }

    });

    /* Удалить */
    const dataDropdownMenuItemDelete = addElement(
        dataDropdownMenu,
        "li",
        parentClass + "__dropdown-menu-item-delete"
    );
    const dataDropdownMenuItemDeleteLink = addElement(
        dataDropdownMenuItemDelete,
        "button",
        [parentClass + "__dropdown-menu-item-delete-link", "dropdown-item", "text-danger", "btn", "btn-light"],
        {
            "type": "button"
        }
    );
    dataDropdownMenuItemDeleteLink.innerText = "Удалить";
    dataDropdownMenuItemDeleteLink.addEventListener('click', function (event) {
        deleteObject(object);
        place.remove();
        retailPrice(wholesalePrice, costs, commissions, fees); // Пересчитываем розничную цену
    })
    console.log("end function: valueInputGroup");

}