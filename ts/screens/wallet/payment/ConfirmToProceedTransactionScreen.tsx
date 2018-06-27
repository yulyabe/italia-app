/**
 * This screen ask the authorization to proceed with the transaction.
 * TODO:
 * - integrate credit card componet for visualization of the payment method selected for the transaction
 *    (implemented into the master)
 * - integrate contextual help:
 *    https://www.pivotaltracker.com/n/projects/2048617/stories/157874540
 *  - make API provides data correctly
 *   https://www.pivotaltracker.com/n/projects/2048617/stories/157483031
 * - implement the proper navigation
 *    https://www.pivotaltracker.com/n/projects/2048617/stories/158395136
 */

import {
  Body,
  Button,
  Container,
  Content,
  H1,
  Icon,
  Left,
  Text,
  View
} from "native-base";
import * as React from "react";
import { Col, Grid, Row } from "react-native-easy-grid";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { WalletStyles } from "../../../components/styles/wallet";
import AppHeader from "../../../components/ui/AppHeader";
import PaymentBannerComponent from "../../../components/wallet/PaymentBannerComponent";
import I18n from "../../../i18n";
import { PaymentData, paymentDataSelector } from '../../../store/reducers/wallet/payment';
import { Option } from 'fp-ts/lib/Option';
import { GlobalState } from '../../../store/reducers/types';
import { connect } from 'react-redux';

type ReduxMappedStateProps = Readonly<{
  paymentData: Option<PaymentData>
}>;

type ReduxMappedDispatchProps = Readonly<{
  CompletePayment: () => void;
}>;

type OwnProps = Readonly<{
  navigation: NavigationScreenProp<NavigationState>;
}>;

type Props = OwnProps & ReduxMappedStateProps & ReduxMappedDispatchProps;

class ConfirmToProceedTransactionScreen extends React.Component<
  Props,
  never
> {
  private goBack() {
    this.props.navigation.goBack();
  }

  public render(): React.ReactNode {
    if (this.props.paymentData.isNone()) {
      return <Text>ERROR</Text>;
    }

    const { transactionInfo } = this.props.paymentData.value; 

    return (
      <Container>
        <AppHeader>
          <Left>
            <Button transparent={true} onPress={() => this.goBack()}>
              <Icon name="chevron-left" />
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
            currentAmount={transactionInfo.totalAmount.toString()}
            entity={transactionInfo.entityName}
          />
          <View style={WalletStyles.paddedLR}>
            <View spacer={true} large={true} />
            <H1>{I18n.t("wallet.ConfirmPayment.askConfirm")}</H1>
            <View spacer={true} large={true} />
            <Text> INTEGRATE CREDIT CARD PREVIEW </Text>
            <View spacer={true} large={true} />
            <Grid>
              <Row>
                <Col>
                  <Text>{I18n.t("wallet.ConfirmPayment.partialAmount")}</Text>
                </Col>
                <Col>
                  <Text bold={true} style={WalletStyles.textRight}>
                    {`${transactionInfo.currentAmount}  €`}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col size={4}>
                  <Text>
                    {`${I18n.t("wallet.ConfirmPayment.fee")} `}
                    <Text link={true}>
                      {I18n.t("wallet.ConfirmPayment.why")}
                    </Text>
                  </Text>
                </Col>

                <Col size={1}>
                  <Text bold={true} style={WalletStyles.textRight}>
                    {`${transactionInfo.fee} €`}
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
                    {`${transactionInfo.totalAmount} €`}
                  </H1>
                </Col>
              </Row>
              <Row>
                <Col size={1} />
                <Col size={9}>
                  <View spacer={true} large={true} />
                  <Text style={WalletStyles.textCenter}>
                    {`${I18n.t("wallet.ConfirmPayment.info2")} `}
                    <Text link={true}>
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
          <Button block={true} primary={true}>
            <Text>{I18n.t("wallet.ConfirmPayment.goToPay")}</Text>
          </Button>
          <View spacer={true}/>
          <Button
            block={true}
            light={true}
            bordered={true}
            onPress={_ => this.goBack()}
          >
            <Text>{I18n.t("wallet.ConfirmPayment.cancelPayment")}</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state: GlobalState): ReduxMappedStateProps => ({
  paymentData: paymentDataSelector(state)
});

export default connect(mapStateToProps)(ConfirmToProceedTransactionScreen)