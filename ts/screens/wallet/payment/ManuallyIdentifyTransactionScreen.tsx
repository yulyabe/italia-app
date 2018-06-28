/**
 * This screen allows the user to manually insert the data which identify the transaction:
 * - Numero Avviso, which includes: aux, digit, application code, codice IUV
 * - Codice Fiscale Ente CReditore (corresponding to codiceIdentificativoEnte)
 * - amount of the transaction
 *  TO DO:
 *  - integrate contextual help to obtain details on the data to insert for manually identifying the transaction
 *    https://www.pivotaltracker.com/n/projects/2048617/stories/157874540
 */

import { none, some } from "fp-ts/lib/Option";
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  H1,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Text,
  View
} from "native-base";
import * as React from "react";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import AppHeader from "../../../components/ui/AppHeader";
import I18n from "../../../i18n";
import * as t from "io-ts";
import { Dispatch } from '../../../store/actions/types';
import { PaymentIdentifier, NoticeNumber, AuthorityId } from '../../../store/reducers/wallet/payment';
import { transactionDataEntered } from '../../../store/actions/wallet/payment';
import { connect } from 'react-redux';
import ROUTES from '../../../navigation/routes';

type ReduxMappedDispatchProps = Readonly<{
  transactionDataEntered: (payment: PaymentIdentifier) => void;
}>;

type OwnProps = Readonly<{
  navigation: NavigationScreenProp<NavigationState>;
}>;

type Props = OwnProps & ReduxMappedDispatchProps;

type State = PaymentIdentifier;

class ManuallyIdentifyTransactionScreen extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      noticeNumber: none,
      authorityId: none,
      originalAmount: none
    };
  }

  private goBack() {
    this.props.navigation.goBack();
  }

  public render(): React.ReactNode {
    return (
      <Container>
        <AppHeader>
          <Left>
            <Button transparent={true} onPress={() => this.goBack()}>
              <Icon name="chevron-left" />
            </Button>
          </Left>
          <Body>
            <Text>{I18n.t("wallet.insertManually.header")}</Text>
          </Body>
        </AppHeader>
        <Content>
          <H1>{I18n.t("wallet.insertManually.title")}</H1>
          <Text>{I18n.t("wallet.insertManually.info")}</Text>
          <Text link={true}>{I18n.t("wallet.insertManually.link")}</Text>
          <Form>
            <Item floatingLabel={true}>
              <Label>{I18n.t("wallet.insertManually.noticeCode")}</Label>
              <Input
                keyboardType={"numeric"}
                onChangeText={value => {
                  const noticeNumber = NoticeNumber.decode(value);
                  if (noticeNumber.isRight()) {
                      this.setState({ noticeNumber: some(noticeNumber.value) });
                  }
                }}
              />
            </Item>
            <Item floatingLabel={true}>
              <Label>{I18n.t("wallet.insertManually.entityCode")}</Label>
              <Input
                keyboardType={"numeric"}
                onChangeText={value => {
                  const authorityId = AuthorityId.decode(value);
                  if (authorityId.isRight()) {
                    this.setState({ authorityId: some(authorityId.value) });
                  }
                }}
                />
            </Item>
            <Item floatingLabel={true}>
              <Label>{I18n.t("wallet.insertManually.amount")}</Label>
              <Input
                keyboardType={"numeric"}
                onChangeText={value => {
                  const originalAmount = t.number.decode(parseInt(value));
                  if (originalAmount.isRight() && originalAmount.value !== 0) {
                    this.setState({ originalAmount: some(originalAmount.value) });
                  }
                  else {
                    console.warn(originalAmount);
                  }
                }}
              />
            </Item>
          </Form>
        </Content>
        <View footer={true}>
          <Button
            block={true}
            primary={true}
            onPress={() => this.props.transactionDataEntered(this.state)}>
            <Text>{I18n.t("wallet.insertManually.proceed")}</Text>
          </Button>
          <View spacer={true} />
          <Button
            block={true}
            light={true}
            bordered={true}
            onPress={(): boolean => this.props.navigation.navigate(ROUTES.WALLET_HOME) }
          >
            <Text>{I18n.t("wallet.cancel")}</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): ReduxMappedDispatchProps => ({
  transactionDataEntered: (payment: PaymentIdentifier) => dispatch(transactionDataEntered(payment)),
});

export default connect(undefined, mapDispatchToProps)(ManuallyIdentifyTransactionScreen);