/**
 * A saga that manages the Wallet.
 */

import { call, Effect, put, takeLatest, take } from "redux-saga/effects";

import { WalletAPI } from "../api/wallet/wallet-api";
import {
  FETCH_CARDS_REQUEST,
  FETCH_TRANSACTIONS_REQUEST,
  START_PAYMENT,
  TRANSACTION_DATA_ENTERED
} from "../store/actions/constants";
import { cardsFetched } from "../store/actions/wallet/cards";
import { transactionsFetched } from "../store/actions/wallet/transactions";
import { CreditCard } from "../types/CreditCard";
import { WalletTransaction } from "../types/wallet";
import { NavigationActions } from "react-navigation";
import ROUTES from "../navigation/routes";
import {
  storeTransactionData,
  transactionDataFetched
} from "../store/actions/wallet/payment";
import { PaymentData } from "../store/reducers/wallet/payment";

function* fetchTransactions(
  loadTransactions: () => Promise<ReadonlyArray<WalletTransaction>>
): Iterator<Effect> {
  const transactions: ReadonlyArray<WalletTransaction> = yield call(
    loadTransactions
  );
  yield put(transactionsFetched(transactions));
}

function* fetchCreditCards(
  loadCards: () => Promise<ReadonlyArray<CreditCard>>
): Iterator<Effect> {
  const cards: ReadonlyArray<CreditCard> = yield call(loadCards);
  yield put(cardsFetched(cards));
}

function* paymentSaga(): Iterator<Effect> {
  yield put(
    NavigationActions.navigate({
      routeName: ROUTES.WALLET_MANUAL_TRANSACTION_IDENTIFICATION
    })
  );
  const action = yield take(TRANSACTION_DATA_ENTERED);
  yield put(storeTransactionData(action.payload));

  // TODO: fetch transaction data from pagopa proxy

  const mockedPaymentData: PaymentData = {
    transactionInfo: {
      noticeCode: "112324875636161",
      notifiedAmount: 198.0,
      currentAmount: 215.0,
      expireDate: new Date("03/01/2018"),
      tranche: "unica",
      paymentReason: "Tari 2018",
      cbill: "A0EDT",
      iuv: "111116000001580"
    },
    recipient: {
      code: "01199250158",
      name: "Comune di Gallarate - Settore Tributi",
      address: "Via Cavour n.2 - Palazzo Broletto,21013",
      city: "Gallarate (VA)",
      tel: "0331.754224",
      webpage: "www.comune.gallarate.va.it",
      email: "tributi@coumne.gallarate.va.it",
      pec: "protocollo@pec.comune.gallarate.va.it"
    },
    subject: {
      name: "Mario Rossi",
      address: "Via Murillo 8, 20149 Milano (MI)"
    }
  };
  yield put(transactionDataFetched(mockedPaymentData));

  yield put(
    NavigationActions.navigate({
      routeName: ROUTES.WALLET_FIRST_TRANSACTION_SUMMARY
    })
  );
}

/**
 * saga that manages the wallet (transactions + credit cards)
 */
// TOOD: currently using the mocked API. This will be wrapped by
// a saga that retrieves the required token and uses it to build
// a client to make the requests, @https://www.pivotaltracker.com/story/show/158068259
export default function* root(): Iterator<Effect> {
  yield takeLatest(
    FETCH_TRANSACTIONS_REQUEST,
    fetchTransactions,
    WalletAPI.getTransactions
  );
  yield takeLatest(
    FETCH_CARDS_REQUEST,
    fetchCreditCards,
    WalletAPI.getCreditCards
  );
  yield takeLatest(START_PAYMENT, paymentSaga);
}
