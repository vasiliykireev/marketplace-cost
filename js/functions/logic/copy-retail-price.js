"use strict";

const inputRetailPrice = document.querySelector(".retail-price__value");
export const buttonRetailPriceCopy = document.querySelector(".retail-price__copy");

buttonRetailPriceCopy.addEventListener('click', function (event) {
    window.navigator.clipboard.writeText(inputRetailPrice.value).then(() => console.log(this));
})