/**
 * Transaction details screen, displaying
 * a list of information available about a
 * specific transaction.
 * TODO: check what controls implemented into this screen will be included into API
 *      - number deimals fixed to 2
 *      - get total amount from fee + amount
 *      - currency symbol
 *      - sum of amounts
 *      @https://www.pivotaltracker.com/n/projects/2048617/stories/157769657
 * TODO: insert contextual help to the Text link related to the fee
 *      @https://www.pivotaltracker.com/n/projects/2048617/stories/158108270
 */
import * as React from "react";

import { Content, H1, H3, Text, View, Button } from "native-base";
import { StyleSheet } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { WalletStyles } from "../../components/styles/wallet";
import WalletLayout, { CardEnum } from "../../components/wallet/WalletLayout";
import I18n from "../../i18n";
import { GlobalState } from "../../store/reducers/types";
import { selectedCreditCardSelector } from "../../store/reducers/wallet/cards";
import { transactionForDetailsSelector } from "../../store/reducers/wallet/transactions";
import { CreditCard, UNKNOWN_CARD } from "../../types/CreditCard";
import { UNKNOWN_TRANSACTION, WalletTransaction } from "../../types/wallet";
import IconFont from '../../components/ui/IconFont';
import { PaymentData, paymentCardSelector, paymentDataSelector, paymentIsInTransactionSelector } from '../../store/reducers/wallet/payment';
import { Option } from 'fp-ts/lib/Option';
import { Dispatch } from 'redux';
import { endPayment } from '../../store/actions/wallet/payment';
import ROUTES from '../../navigation/routes';

type ReduxMappedStateProps = Readonly<{
  transaction: WalletTransaction;
  selectedCard: CreditCard;
  paymentData: Option<PaymentData>;
  paymentCard: CreditCard;
  isInTransaction: boolean;
}>;

type ReduxMappedDispatchProps = Readonly<{
  EndPayment: () => void;
}>;

type OwnProps = Readonly<{
  navigation: NavigationScreenProp<NavigationState>;
}>;

type Props =OwnProps & ReduxMappedStateProps & ReduxMappedDispatchProps;

const styles = StyleSheet.create({
  value: {
    flex: 1,
    flexDirection: "row"
  },
  align: {
    textAlign: "right"
  },
  titleRow: {
    justifyContent: "space-between"
  }
});

/**
 * Details of transaction
 * TODO: implement the proper state control
 * @https://www.pivotaltracker.com/n/projects/2048617/stories/158395136
 */
export class TransactionDetailsScreen extends React.Component<Props, never> {
  
  /**private getTransaction() {
    return this.props.isInTransaction ?  this.props.paymentData : this.props.transaction
  }*/
   
  /**
   * It provide the currency EUR symbol
   * TODO: verify how approach the euro notation
   * @https://www.pivotaltracker.com/n/projects/2048617/stories/158330111
   */
  private getCurrencySymbol(currency: string) {
    if (currency === "EUR") {
      return "€";
    } else {
      return currency;
    }
  }

  /**
   * It sum the amount to pay and the fee requested to perform the transaction
   * TO DO: If required, it should be implemented the proper algorithm to manage values
   * from 10^13
   *  @https://www.pivotaltracker.com/n/projects/2048617/stories/157769657
   */
  private getTotalAmount(transaction: Readonly<WalletTransaction>) {
    return transaction.amount + transaction.transactionCost;
  }

  /**
   * It provides the proper header to the screen. If isTransactionStarted
   * (the user displays the screen during the process of identify and accept a transaction)
   * then the "Thank you message" is displayed
   */
  private getSubHeader() {
    return this.props.isInTransaction ? (
      <View>
        <Grid>
          <Col size={1} />
          <Col size={5} style={WalletStyles.alignCenter}>
            <View spacer={true} />
            <Row>
              <H1 style={WalletStyles.white}>{I18n.t("wallet.thanks")}</H1>
            </Row>
            <Row>
              <Text style={WalletStyles.white}>
                {I18n.t("wallet.endPayment")}
              </Text>
            </Row>
            <View spacer={true} />
          </Col>
          <Col size={1} />
        </Grid>
      </View>
    ) : (
      <View spacer={true} />
    );
  }

  /**
   * It provides the proper format to the listed content by using flex layout
   */
  private labelValueRow(
    label: string | React.ReactElement<any>,
    value: string | React.ReactElement<any>,
    labelIsNote: boolean = true
  ): React.ReactNode {
    return (
      <Col>
        <View spacer={true} />
        <Row>
          <Text note={labelIsNote}>{label}</Text>
          <Text style={[styles.value, styles.align]} bold={true}>
            {value}
          </Text>
        </Row>
      </Col>
    );
  }

  public render(): React.ReactNode {
    const { transaction } = this.props;

    return (
      <WalletLayout
        title={I18n.t("wallet.transaction")}
        navigation={this.props.navigation}
        headerContents={this.getSubHeader()}
        cardType={{ type: CardEnum.HEADER, card: this.props.selectedCard }}
        showPayButton={false}
      >
        <Content scrollEnabled={false} style={WalletStyles.whiteContent}>
          <Grid>
            <Row style={styles.titleRow}>
              <H3>{I18n.t("wallet.transactionDetails")}</H3>
              <Button light={true} onPress={(): void => {this.props.EndPayment(); this.props.navigation.navigate(ROUTES.WALLET_HOME)}}>
                <IconFont name="io-close"/>
              </Button>
            </Row>
            <View spacer={true} extralarge={true} />
            <Row>
              <Text>
                {`${I18n.t("wallet.total")}  `}
                <H3 style={styles.value}>
                  {`-${this.getTotalAmount(transaction).toFixed(
                    2
                  )} ${this.getCurrencySymbol(transaction.currency)}`}
                </H3>
              </Text>
            </Row>
            {this.labelValueRow(
              I18n.t("wallet.payAmount"),
              `${transaction.amount.toFixed(2)} ${this.getCurrencySymbol(
                transaction.currency
              )}`
            )}
            {this.labelValueRow(
              <Text>
                <Text note={true}>{`${I18n.t("wallet.transactionFee")} `}</Text>
                <Text note={true} style={WalletStyles.whyLink}>
                  {I18n.t("wallet.why")}
                </Text>
              </Text>,
              `${transaction.transactionCost.toFixed(
                2
              )} ${this.getCurrencySymbol(transaction.currency)}`
            )}
            {this.labelValueRow(
              I18n.t("wallet.paymentReason"),
              transaction.paymentReason
            )}
            {this.labelValueRow(
              I18n.t("wallet.recipient"),
              transaction.recipient
            )}
            {this.labelValueRow(I18n.t("wallet.date"), transaction.date)}
            {this.labelValueRow(I18n.t("wallet.time"), transaction.time)}
          </Grid>
        </Content>
      </WalletLayout>
    );
  }
}
const mapStateToProps = (state: GlobalState): ReduxMappedStateProps => ({
  transaction: transactionForDetailsSelector(state).getOrElse(
    UNKNOWN_TRANSACTION
  ),
  selectedCard: selectedCreditCardSelector(state).getOrElse(UNKNOWN_CARD),
  paymentCard: paymentCardSelector(state).getOrElse(UNKNOWN_CARD),
  paymentData: paymentDataSelector(state),
  isInTransaction: paymentIsInTransactionSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): ReduxMappedDispatchProps => ({
  EndPayment: () => dispatch(endPayment())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailsScreen);
