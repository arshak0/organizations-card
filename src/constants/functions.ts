import {FIELDS_MINIMUM_NUMBER} from "./constants";

export function changeOrganizationValidation (newOrgName: string, newTrInUse: number, newTrAssigned: number, newPrInUse: number, newPrAssigned: number) {
    if (newOrgName!=='' && newTrInUse!==0 && newTrAssigned!==0
        && newTrAssigned%FIELDS_MINIMUM_NUMBER===0 && newPrInUse!==0 && newPrAssigned!==0
        && newPrAssigned%FIELDS_MINIMUM_NUMBER===0 ) {
        return true
    }
    else return false
}