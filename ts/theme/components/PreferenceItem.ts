import { Theme } from "../types";
import variables from "../variables";

export default (): Theme => ({
  "NativeBase.ListItem": {
    "NativeBase.Left": {
      "NativeBase.Text": {
        alignSelf: "flex-start"
      },
      alignSelf: "center",
      flex: 1,
      flexDirection: "column"
    },
    "NativeBase.Right": {
      "UIComponent.IconFont": {
        color: variables.brandPrimary
      },
      alignSelf: "center",
      flex: 0,
      flexDirection: "column"
    },
    borderBottomColor: variables.brandLightGray,
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    marginLeft: 0,
    minHeight: 96
  }
});
