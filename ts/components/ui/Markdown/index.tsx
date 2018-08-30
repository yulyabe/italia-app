import merge from "lodash/merge";
import { Text, View } from "native-base";
import * as React from "react";
import { connect } from "react-redux";
import * as SimpleMarkdown from "simple-markdown";

import { isDevEnvironment } from "../../../config";
import I18n from "../../../i18n";
import { Dispatch, ReduxProps } from "../../../store/actions/types";
import reactNativeRules from "./rules";

// A regex to test if a string ends with `/n/n`
const BLOCK_END_REGEX = /\n{2,}$/;

// Merge the default SimpleMarkdown rules with the react native ones
const rules = merge(SimpleMarkdown.defaultRules, reactNativeRules);

// instantiate the Markdown parser
const markdownParser = SimpleMarkdown.parserFor(rules);

// see https://www.npmjs.com/package/simple-markdown#simplemarkdownruleoutputrules-key
const ruleOutput = SimpleMarkdown.ruleOutput(rules, "react_native");
const reactOutput = SimpleMarkdown.reactFor(ruleOutput);

function renderMarkdown(
  body: string,
  initialState: SimpleMarkdown.State,
  dispatch: Dispatch
): React.ReactNode {
  try {
    /**
     * Since many rules expect blocks to end in "\n\n", we append that
     * (if needed) to markdown input manually, in addition to specifying
     * inline: false when creating the syntax tree.
     */
    const blockSource = BLOCK_END_REGEX.test(body) ? body : body + "\n\n";

    // We merge the initialState with always needed attributes
    const state: SimpleMarkdown.State = {
      ...initialState,
      inline: false,
      dispatch
    };

    // Generate the syntax tree
    const syntaxTree = markdownParser(blockSource, state);

    // Render the syntax tree using the rules and return the value
    return reactOutput(syntaxTree, state);
  } catch (error) {
    return isDevEnvironment ? (
      <Text>
        COULD NOT PARSE MARKDOWN:
        {body}
      </Text>
    ) : (
      <Text>{I18n.t("global.markdown.decodeError")}</Text>
    );
  }
}

/**
 * A component that accepts "markdown" as child and render react native
 * components.
 */

type OwnProps = {
  children: string;
  initialState?: SimpleMarkdown.State;
};

type Props = OwnProps & ReduxProps;

export const Markdown: React.SFC<Props> = ({
  children,
  initialState = {},
  // We need dispatch in case of internal link to navigate to a specific screen
  dispatch
}) => <View>{renderMarkdown(children, initialState, dispatch)}</View>;

export default connect()(Markdown);
