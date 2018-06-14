import { Theme } from "../types";
import variables from "../variables";

declare module "native-base" {
  namespace NativeBase {
    interface Content {
      alternative?: boolean;
      primary?: boolean;
      original?: boolean;
    }
  }
}

export default (): Theme => {
  return {
    ".alternative": {
      backgroundColor: variables.contentAlternativeBackground
    },
    ".primary": {
      backgroundColor: variables.contentPrimaryBackground
    },
    ".original": {
      padding: 0
    },
    padding: variables.contentPadding,
    backgroundColor: variables.contentBackground
  };
};
