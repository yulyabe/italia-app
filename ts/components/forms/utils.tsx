/**
 * Useful methods to interact with redux-form
 */

import { Input, Item, Text, View } from "native-base";
import { KeyboardTypeOptions } from "react-native";

import * as React from "react";
import { WrappedFieldProps } from "redux-form";
import { isEmail } from "validator";

import I18n from "../../i18n";

const required = (value: string): string | undefined =>
  value ? undefined : I18n.t("forms.validators.required");

const email = (value: string): string | undefined =>
  value && !isEmail(value) ? I18n.t("forms.validators.email") : undefined;

/**
 * Methods used to validate redux-form `Field` components.
 * All methods takes a string, which represents the field value, as argument and returns
 * a error message if the validation is not fulfilled.
 */
export const validators = {
  required,
  email
};

export interface NativeBaseInputProps {
  name?: string;
  placeholder?: string;
  showError?: boolean;
  keyboardType?: KeyboardTypeOptions;
  // tslint:disable-next-line:max-union-size
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

/**
 * This method is used by redux-form `Field` components.
 * It takes as input the field properties and return a native-base `Input`.
 */
export const renderNativeBaseInput: React.SFC<
  WrappedFieldProps & NativeBaseInputProps
> = ({
  meta: { touched, error, active },
  placeholder,
  showError,
  keyboardType,
  autoCapitalize
}) => (
  <View>
    <Item error={error && touched} active={active}>
      <Input
        placeholder={placeholder}
        keyboardType={keyboardType || "default"}
        autoCapitalize={autoCapitalize || "none"}
      />
    </Item>
    {showError && error && touched && <Text>{error}</Text>}
  </View>
);
