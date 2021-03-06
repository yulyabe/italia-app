/**
 * A reducer to store the serviceIds by organization fiscal codes
 */

import { NonEmptyString } from "italia-ts-commons/lib/strings";

import { SERVICE_LOAD_SUCCESS } from "../../../actions/constants";
import { Action } from "../../../actions/types";

/**
 * Maps organization fiscal code to serviceId
 */
export type ServiceIdsByOrganizationFiscalCodeState = Readonly<{
  [key: string]: ReadonlyArray<NonEmptyString> | undefined;
}>;

const INITIAL_STATE: ServiceIdsByOrganizationFiscalCodeState = {};

export function serviceIdsByOrganizationFiscalCodeReducer(
  state: ServiceIdsByOrganizationFiscalCodeState = INITIAL_STATE,
  action: Action
): ServiceIdsByOrganizationFiscalCodeState {
  switch (action.type) {
    case SERVICE_LOAD_SUCCESS:
      const service = action.payload;
      // get the current serviceIds for the organization fiscal code
      const servicesForOrganization =
        state[service.organization_fiscal_code] || [];
      // append the serviceId to the list
      return {
        ...state,
        [service.organization_fiscal_code]: [
          ...servicesForOrganization,
          service.service_id
        ]
      };
    default:
      return state;
  }
}
