import { fromNullable, none, Option } from "fp-ts/lib/Option";
import { Text } from "native-base";
import * as React from "react";
import { Linking } from "react-native";
import { NavigationActions } from "react-navigation";
import { ReactOutput, SingleASTNode, State } from "simple-markdown";

import ROUTES from "../../../../navigation/routes";
import { makeReactNativeRule } from "./utils";

type ScreenNameToRouteMap = {
  [key: string]: string;
};

// Regex to match uri like `internal://screen/profile`
const INTERNAL_TARGET_REGEX = /^internal:\/\/screen\/([\w_-]+)$/;

// Here we put all the allowed screen name with the mapping to the react-navigation route
const SCREEN_NAME_TO_ROUTE_MAP: ScreenNameToRouteMap = {
  profile: ROUTES.PROFILE_MAIN
};

function getInternalRoute(target: string): Option<string> {
  const match = INTERNAL_TARGET_REGEX.exec(target);
  if (match) {
    // Reset the index for the next call
    // tslint:disable-next-line:no-object-mutation
    INTERNAL_TARGET_REGEX.lastIndex = 0;

    // Get the screen name from the regex group
    const screenName = match[1];

    // Return if available the react-navigation route
    return fromNullable(SCREEN_NAME_TO_ROUTE_MAP[screenName]);
  }
  return none;
}

function rule() {
  return (
    node: SingleASTNode,
    output: ReactOutput,
    state: State
  ): React.ReactNode => {
    const newState = { ...state, withinLink: true };
    const maybeInternalRoute = getInternalRoute(node.target);

    // tslint:disable-next-line:no-let
    let onPressHandler = () =>
      Linking.openURL(node.target).catch(_ => undefined);

    if (maybeInternalRoute.isSome() && state.dispatch) {
      const internalRoute = maybeInternalRoute.value;
      const navigateToRouteAction = NavigationActions.navigate({
        routeName: internalRoute
      });

      onPressHandler = () => state.dispatch(navigateToRouteAction);
    }

    // Create the Text element that must go inside <Button>
    return React.createElement(
      Text,
      {
        key: state.key,
        markdown: true,
        link: true,
        onPress: onPressHandler
      },
      output(node.content, newState)
    );
  };
}

export default makeReactNativeRule(rule());
