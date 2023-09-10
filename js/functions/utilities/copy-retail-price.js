"use strict";

import { displayRetailPriceInputFormControl } from '../../../script.js';

export const displayRetailPriceButtonCopy = document.querySelector(".retail-price__copy");

displayRetailPriceButtonCopy.addEventListener('click', function (event) {
    window.navigator.clipboard.writeText(displayRetailPriceInputFormControl.value).then(() => console.log(this));
})