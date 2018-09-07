/**
 * A reduced for deferred navigation actions.
 */

import {
  CLEAR_DEFERRED_NAVIGATION_ACTION,
  SAVE_NAVIGATION_STATE,
  SAVE_NAVIGATION_WHEN_LOGGED_IN
} from "../actions/constants";
import { Action } from "../actions/types";
import { GlobalState } from "./types";

export interface DeferredNavigationActionState {
  // Navigation saved before going to background.
  navigationState: Action | undefined;
  navigation: Action | undefined;
}

const INITIAL_STATE: DeferredNavigationActionState = {
  navigationState: undefined,
  navigation: undefined
};

export const deferredNavigationActionSelector = (
  state: GlobalState
): DeferredNavigationActionState => state.deferredNavigation;

export default (
  state: DeferredNavigationActionState = INITIAL_STATE,
  action: Action
) => {
  switch (action.type) {
    case SAVE_NAVIGATION_STATE:
      return {
        ...state,
        navigationState: action.payload
      };

    case SAVE_NAVIGATION_WHEN_LOGGED_IN:
      return {
        ...state,
        navigation: action.payload
      };

    case CLEAR_DEFERRED_NAVIGATION_ACTION:
      return {
        navigationState: undefined,
        navigation: undefined
      };

    default:
      return state;
  }
};
