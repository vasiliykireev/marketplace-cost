"use strict";

import { wholesalePrice, costs, commissions, fees } from "../../../script.js";

export function deleteObject(object) {
    console.log("deleteObject");
    let dataArray;
    if (costs.indexOf(object) > -1) {
        console.log("costs: " + costs.indexOf(object));
        dataArray = costs;
    } else if (commissions.indexOf(object) > -1) {
        dataArray = "commissions";
        console.log("commissions: " + commissions.indexOf(object));
        dataArray = commissions;
    } else if(fees.indexOf(object) > -1) {
        dataArray = "fees";
        console.log("fees: " + fees.indexOf(object));
        dataArray = fees;
    } else {
        console.log("No array");
    }
    if (dataArray !== undefined) {
        dataArray.splice(dataArray.indexOf(object),1);
    }
    console.log(costs);
    console.log(commissions);
    console.log(fees);


}