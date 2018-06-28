/**
 * This screen asks the authorization to proceed with the transaction.
 * TODO:
 * - integrate contextual help:
 *    https://www.pivotaltracker.com/n/projects/2048617/stories/157874540
 */
import { Option } from "fp-ts/lib/Option";
import {
  Body,
  Button,
  Container,
  Content,
  H1,
  Left,
  Text,
  View
} from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect, Dispatch } from "react-redux";
import { WalletStyles } from "../../../components/styles/wallet";
import AppHeader from "../../../components/ui/AppHeader";
import IconFont from "../../../components/ui/IconFont";
import CreditCardComponent from "../../../components/wallet/card";
import PaymentBannerComponent from "../../../components/wallet/PaymentBannerComponent";
import I18n from "../../../i18n";
import {
  confirmTransaction,
  endPayment,
  showCardsListForTransaction
} from "../../../store/actions/wallet/payment";
import { GlobalState } from "../../../store/reducers/types";
import {
  paymentCardSelector,
  PaymentData,
  paymentDataSelector
} from "../../../store/reducers/wallet/payment";
import { CreditCard, UNKNOWN_CARD } from "../../../types/CreditCard";

type ReduxMappedStateProps = Readonly<{
  paymentData: Option<PaymentData>;
  paymentCard: CreditCard;
}>;

type ReduxMappedDispatchProps = Readonly<{
  ConfirmTransaction: () => void;
  ChangeCard: () => void;
  EndPayment: () => void;
}>;

type OwnProps = Readonly<{
  navigation: NavigationScreenProp<NavigationState>;
}>;

type Props = OwnProps & ReduxMappedStateProps & ReduxMappedDispatchProps;

const styles = StyleSheet.create({
  child: {
    flex: 1,
    alignContent: "center"
  },
  parent: {
    flexDirection: "row"
  }
});

class ConfirmToProceedTransactionScreen extends React.Component<Props, never> {
  private goBack() {
    this.props.navigation.goBack();
  }

  /**
   * It sum the amount to pay and the fee requested to perform the transaction
   * TO DO: If required, it should be implemented to manage values
   * of the order of of higher 10^13
   *  @https://www.pivotaltracker.com/n/projects/2048617/stories/157769657
   */
  private getTotalAmount(currentAmount: number, transactionCost: number) {
    return currentAmount + transactionCost;
  }

  public render(): React.ReactNode {
    if (this.props.paymentData.isNone()) {
      return <Text>ERROR</Text>;
    }

    const { transactionInfo, recipient } = this.props.paymentData.value;

    return (
      <Container>
        <AppHeader>
          <Left>
            <Button transparent={true} onPress={(): void => this.goBack()}>
              <IconFont name="io-back" />
            </Button>
          </Left>
          <Body>
            <Text>{I18n.t("wallet.ConfirmPayment.header")}</Text>
          </Body>
        </AppHeader>

        <Content noPadded={true}>
          <PaymentBannerComponent
            navigation={this.props.navigation}
            paymentReason={transactionInfo.paymentReason}
            currentAmount={transactionInfo.currentAmount.toFixed(2).toString()}
            entity={recipient.name}
          />
          <View style={WalletStyles.paddedLR}>
            <View spacer={true} extralarge={true} />
            <H1>{I18n.t("wallet.ConfirmPayment.askConfirm")}</H1>
            <View spacer={true} />
            <CreditCardComponent
              navigation={this.props.navigation}
              item={this.props.paymentCard}
              menu={false}
              favorite={false}
              lastUsage={false}
            />
            <View spacer={true} large={true} />
            <Grid>
              <Row>
                <Col>
                  <Text>{I18n.t("wallet.ConfirmPayment.partialAmount")}</Text>
                </Col>
                <Col>
                  <Text bold={true} style={WalletStyles.textRight}>
                    {`${transactionInfo.currentAmount.toFixed(2)}  €`}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col size={4}>
                  <Text>
                    {`${I18n.t("wallet.ConfirmPayment.fee")} `}
                    <Text link={true} onPress={() => this.props.ChangeCard()}>
                      {I18n.t("wallet.ConfirmPayment.why")}
                    </Text>
                  </Text>
                </Col>

                <Col size={1}>
                  <Text bold={true} style={WalletStyles.textRight}>
                    {`${transactionInfo.transactionCost.toFixed(2)} €`}
                  </Text>
                </Col>
              </Row>
              <View spacer={true} large={true} />
              <Row style={WalletStyles.divider}>
                <Col>
                  <View spacer={true} large={true} />
                  <H1>{I18n.t("wallet.ConfirmPayment.totalAmount")}</H1>
                </Col>
                <Col>
                  <View spacer={true} large={true} />
                  <H1 style={WalletStyles.textRight}>
                    {`${this.getTotalAmount(
                      transactionInfo.currentAmount,
                      transactionInfo.transactionCost
                    ).toFixed(2)} €`}
                  </H1>
                </Col>
              </Row>
              <Row>
                <Col size={1} />
                <Col size={9}>
                  <View spacer={true} large={true} />
                  <Text style={WalletStyles.textCenter}>
                    {`${I18n.t("wallet.ConfirmPayment.info2")} `}
                    <Text
                      link={true}
                      onPress={(): void => this.props.ChangeCard()}
                    >
                      {I18n.t("wallet.ConfirmPayment.changeMethod")}
                    </Text>
                  </Text>
                  <View spacer={true} />
                </Col>
                <Col size={1} />
              </Row>
              <Row style={WalletStyles.divider}>
                <Col size={1} />
                <Col size={9}>
                  <View spacer={true} />

                  <Text style={WalletStyles.textCenter}>
                    {I18n.t("wallet.ConfirmPayment.info")}
                  </Text>
                  <View spacer={true} extralarge={true} />
                </Col>
                <Col size={1} />
              </Row>
            </Grid>
          </View>
        </Content>

        <View footer={true}>
          <Button
            block={true}
            primary={true}
            onPress={() => this.props.ConfirmTransaction()}
          >
            <Text>{I18n.t("wallet.ConfirmPayment.goToPay")}</Text>
          </Button>
          <View spacer={true} />
          <View style={styles.parent}>
            <Button
              style={styles.child}
              block={true}
              light={true}
              bordered={true}
              onPress={(): void => this.props.ChangeCard()}
            >
              <Text>{I18n.t("wallet.ConfirmPayment.change")}</Text>
            </Button>
            <View spacer={true} />
            <Button
              style={styles.child}
              block={true}
              cancel={true}
              onPress={(): void => this.props.EndPayment()}
            >
              <Text>{I18n.t("global.buttons.cancel")}</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state: GlobalState): ReduxMappedStateProps => ({
  paymentCard: paymentCardSelector(state).getOrElse(UNKNOWN_CARD),
  paymentData: paymentDataSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): ReduxMappedDispatchProps => ({
  ConfirmTransaction: () => dispatch(confirmTransaction()),
  ChangeCard: () => dispatch(showCardsListForTransaction()),
  EndPayment: () => dispatch(endPayment())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmToProceedTransactionScreen);
