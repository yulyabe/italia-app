/**
 * This screen allows the user to select the payment method for a selected transaction
 * TODO:
 *  - implement the proper navigation
 *    https://www.pivotaltracker.com/n/projects/2048617/stories/158395136
 *  - define what to do when the cancel button is pressed (now come back to wallethome)
 */
import { Option } from "fp-ts/lib/Option";
import {
  Body,
  Button,
  Container,
  Content,
  H1,
  Left,
  List,
  Text,
  View
} from "native-base";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { WalletStyles } from "../../../components/styles/wallet";
import AppHeader from "../../../components/ui/AppHeader";
import IconFont from "../../../components/ui/IconFont";
import CreditCardComponent from "../../../components/wallet/card";
import PaymentBannerComponent from "../../../components/wallet/PaymentBannerComponent";
import I18n from "../../../i18n";
import ROUTES from "../../../navigation/routes";
import { selectCardForTransaction } from "../../../store/actions/wallet/cards";
import { endPayment } from "../../../store/actions/wallet/payment";
import { GlobalState } from "../../../store/reducers/types";
import { creditCardsSelector } from "../../../store/reducers/wallet/cards";
import {
  PaymentData,
  paymentDataSelector
} from "../../../store/reducers/wallet/payment";
import { CreditCard } from "../../../types/CreditCard";

type ReduxMappedStateProps = Readonly<{
  cards: ReadonlyArray<CreditCard>;
  paymentData: Option<PaymentData>;
}>;

type ReduxMappedDispatchProps = Readonly<{
  CardForTransactionSelected: (selectedCard: CreditCard) => void;
  EndPayment: () => void;
}>;

type OwnProps = Readonly<{
  navigation: NavigationScreenProp<NavigationState>;
}>;

type Props = OwnProps & ReduxMappedStateProps & ReduxMappedDispatchProps;

class ChoosePaymentMethodScreen extends React.Component<Props, never> {
  private goBack() {
    this.props.navigation.goBack();
  }

  public render(): React.ReactNode {
    if (this.props.paymentData.isNone()) {
      return <Text>ERROR</Text>;
    }

    const { transactionInfo, entity } = this.props.paymentData.value;

    return (
      <Container>
        <AppHeader>
          <Left>
            <Button transparent={true} onPress={() => this.goBack()}>
              <IconFont name="io-back" />
            </Button>
          </Left>
          <Body>
            <Text>{I18n.t("wallet.payWith.header")}</Text>
          </Body>
        </AppHeader>
        <Content noPadded={true}>
          <PaymentBannerComponent
            navigation={this.props.navigation}
            paymentReason={transactionInfo.paymentReason}
            currentAmount={transactionInfo.currentAmount.toFixed(2).toString()}
            entity={entity.name}
          />

          <View style={WalletStyles.paddedLR}>
            <View spacer={true} />
            <H1> {I18n.t("wallet.payWith.title")} </H1>
            <View spacer={true} />
            <Text> {I18n.t("wallet.payWith.info")}</Text>
            <View spacer={true} />
            <List
              removeClippedSubviews={false}
              dataArray={this.props.cards as CreditCard[]} // tslint:disable-line: readonly-array
              renderRow={(item: CreditCard): React.ReactElement<CreditCard> => (
                <TouchableOpacity
                  onPress={(): void =>
                    this.props.CardForTransactionSelected(item)
                  }
                >
                  <CreditCardComponent
                    navigation={this.props.navigation}
                    item={item}
                    menu={false}
                    favorite={false}
                    lastUsage={false}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </Content>
        <View footer={true}>
          <Button
            block={true}
            onPress={(): boolean =>
              this.props.navigation.navigate(ROUTES.WALLET_ADD_PAYMENT_METHOD)
            }
          >
            <Text>{I18n.t("wallet.newPaymentMethod.newMethod")}</Text>
          </Button>
          <View spacer={true} />
          <Button
            block={true}
            cancel={true}
            onPress={(): void => this.props.EndPayment()}
          >
            <Text>{I18n.t("global.buttons.cancel")}</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state: GlobalState): ReduxMappedStateProps => ({
  cards: creditCardsSelector(state),
  paymentData: paymentDataSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): ReduxMappedDispatchProps => ({
  CardForTransactionSelected: (selectedCard: CreditCard) =>
    dispatch(selectCardForTransaction(selectedCard)),
  EndPayment: () => dispatch(endPayment())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoosePaymentMethodScreen);
