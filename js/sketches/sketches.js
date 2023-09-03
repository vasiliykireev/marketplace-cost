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

// При нажатии на кнопку добавить, нужно создавать идентификатор и сразу записывать в массив
// После нажатия на кнопку сохранения, нужно присваивать этому элементу имя
// После изменения значения, нужно записывать это значение в массив

export function addNewData(type) { // Функция добавления новых данных в зависимости от типа
    switch (type) {
        case "cost": // Если добавляем расход
            let idCost = costs.length + 1; // Записываем id расхода 
            costs.push({ // Добавляем в конец массива расходов
                "id": idCost // Идентификатор 
            })
            console.log(costs);
            let newCost = addBlock(type, divCosts); // Добавляем новый элемент расхода
            newCost.classList.add("mb-3");  // Добавляем отступ снизу
            let newCostName = addName(idCost, type, newCost); // Добавляем новое название для расхода
            
        break;
        case "commission": // Если добавляем комиссию
            let idCommission = commissions.length + 1; // Записываем id комиссии
            commissions.push({ // Добавляем в конец массива комиссий
                "id": idCommission // Идентификатор
            })
            console.log(commissions);
            let newCommission = addBlock(type, divCommissions); // Добавляем новый элемент комиссии
            newCommission.classList.add("mb-3");  // Добавляем отступ снизу
            let newCommissionName = addName(idCommission, type, newCommission); // Добавляем новое название для комиссии
        break;
        case "fee": // Если добавляем тариф
            let idFee = fees.length + 1; // Записываем id тарифа
            fees.push({ // Добавляем в конец массива тарифов
                "id": idFee // Идентификатор
            })
            console.log(fees);
            let newFee = addBlock(type, divFees); // Добавляем новый элемент тарифа
            newFee.classList.add("mb-3");  // Добавляем отступ снизу
            let newFeeName = addName(idFee, type, newFee); // Добавляем новое название для тарифа

        break;
        default: // В любом другом случае
            console.error("Ошибка при попытке добавления неизвестного типа!")
    }
}

export function saveName(name, place, removeElement) { // Функция сохранения названия с переданными названием, местом и элементом для удаления
    costs.push({
        "name": name,
        "type": "fix",
        "value": ""
    })
    showCost(costs[Number(costs.length - 1)], Number(costs.length - 1));
    //place.append(name); // Размещаем название
    removeElement.remove(); // Удаляем элемент для удаления
}