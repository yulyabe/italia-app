/**
 * This screen displays the summary on the transaction with the updated amount (if changed).
 * TODO: align with the Transaction details Screen
 */
import {
  Body,
  Button,
  Container,
  Content,
  H1,
  H3,
  Icon,
  Left,
  Text,
  View
} from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { WalletAPI } from "../../api/wallet/wallet-api";
import { WalletStyles } from "../../components/styles/wallet";
import AppHeader from "../../components/ui/AppHeader";
import I18n from "../../i18n";
import variables from "../../theme/variables";

type Props = Readonly<{
  navigation: NavigationScreenProp<NavigationState>;
}>;

const styles = StyleSheet.create({
  light: {
    color: variables.brandLight
  },

  padded: {
    paddingLeft: variables.contentPadding,
    paddingRight: variables.contentPadding
  },

  bolded: {
    textAlign: "right",
    fontWeight: "bold"
  }
});

export class SecondTransactionSummaryScreen extends React.Component<
  Props,
  never
> {
  constructor(props: Props) {
    super(props);
  }

  private goBackButton(): React.ReactNode {
    return (
      <Left>
        <Button
          transparent={true}
          onPress={_ => this.props.navigation.goBack()}
        >
          <Icon style={WalletStyles.white} name="chevron-left" />
        </Button>
      </Left>
    );
  }

  public render(): React.ReactNode {
    const acceptedTransaction = WalletAPI.getAcceptedTransaction();

    return (
      <Container>
        <AppHeader style={WalletStyles.header}>
          {this.goBackButton()}
          <Body>
            <Text style={WalletStyles.white}>
              {I18n.t("wallet.SecondSummary.header")}
            </Text>
          </Body>
        </AppHeader>

        <Content original={true}>
          <View style={WalletStyles.backContent}>
            <Grid>
              <Col size={1} />
              <Col size={5} style={{ alignItems: "center" }}>
                <View spacer={true} large={true} />
                <Row>
                  <Icon name="check" style={styles.light} />
                  <H1 style={styles.light}>
                    {I18n.t("wallet.SecondSummary.thanks")}
                  </H1>
                </Row>
                <Row>
                  <Text style={styles.light}>
                    {I18n.t("wallet.SecondSummary.endPayment")}
                  </Text>
                </Row>
                <View spacer={true} large={true} />
              </Col>
              <Col size={1} />
            </Grid>
          </View>
          <View spacer={true} />
          <View style={styles.padded}>
            <Grid>
              <Row>
                <Col size={6}>
                  <H1>{I18n.t("wallet.SecondSummary.details")}</H1>
                </Col>
                <Col size={1}>
                  <Icon name="cross" />
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  <View spacer={true} extralarge={true} />
                  <H3>{I18n.t("wallet.SecondSummary.total")}</H3>
                </Col>
                <Col size={2}>
                  <View spacer={true} extralarge={true} />
                  <H1>{acceptedTransaction.totalAmount.toString() + "€"}</H1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <View spacer={true} extralarge={true} />
                  <Text>{I18n.t("wallet.SecondSummary.amount")}</Text>
                  <View spacer={true} />
                </Col>
                <Col>
                  <View spacer={true} extralarge={true} />
                  <H3 style={styles.bolded}>
                    {acceptedTransaction.currentAmount.toString() + "€"}
                  </H3>
                  <View spacer={true} />
                </Col>
              </Row>
              <Row>
                <Col style={{ flexDirection: "row" }}>
                  <Text>{I18n.t("wallet.SecondSummary.fee")}</Text>
                  <Text link={true}>
                    {" " + I18n.t("wallet.SecondSummary.why")}
                  </Text>
                  <View spacer={true} />
                </Col>
                <Col>
                  <H3 style={styles.bolded}>
                    {acceptedTransaction.fee.toString() + "€"}
                  </H3>
                  <View spacer={true} />
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  <Text>{I18n.t("wallet.SecondSummary.purpose")}</Text>
                  <View spacer={true} />
                </Col>
                <Col size={2}>
                  <H3 style={styles.bolded}>
                    {acceptedTransaction.paymentReason}
                  </H3>
                </Col>
              </Row>
              <Row>
                <Col size={1}>
                  <Text>{I18n.t("wallet.SecondSummary.recipient")}</Text>
                  <View spacer={true} />
                </Col>
                <Col size={2}>
                  <H3 style={styles.bolded}>
                    {acceptedTransaction.entityName}
                  </H3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text>{I18n.t("wallet.SecondSummary.date")}</Text>
                  <View spacer={true} />
                </Col>
                <Col>
                  <H3 style={styles.bolded}>
                    {acceptedTransaction.date.toLocaleDateString()}
                  </H3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text>{I18n.t("wallet.SecondSummary.time")}</Text>
                  <View spacer={true} />
                </Col>
                <Col>
                  <H3 style={styles.bolded}>
                    {acceptedTransaction.date.toLocaleTimeString()}
                  </H3>
                </Col>
              </Row>
            </Grid>
          </View>
        </Content>
      </Container>
    );
  }
}
