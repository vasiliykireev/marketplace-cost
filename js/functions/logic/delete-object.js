"use strict";

let logs = true;

import { sourceWholesalePrice, sourceCosts, sourceCommissions, sourceFees } from "../../../script.js";

export function deleteObject(object) {
    console.log("function deleteObject");
    let dataArray;
    if (sourceCosts.indexOf(object) > -1) {
        dataArray = sourceCosts;
    } else if (sourceCommissions.indexOf(object) > -1) {
        dataArray = sourceCommissions;
    } else if(sourceFees.indexOf(object) > -1) {
        dataArray = sourceFees;
    } else {
        console.log("No array");
    }
    if (dataArray !== undefined) {
        dataArray.splice(dataArray.indexOf(object),1);
    }
    console.log(sourceCosts);
    console.log(sourceCommissions);
    console.log(sourceFees);


}