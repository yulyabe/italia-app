/**
 * A saga that manages the Wallet.
 */

import { call, Effect, put, takeLatest, take } from "redux-saga/effects";

import { WalletAPI } from "../api/wallet/wallet-api";
import {
  FETCH_CARDS_REQUEST,
  FETCH_TRANSACTIONS_REQUEST,
  START_PAYMENT,
  TRANSACTION_DATA_ENTERED,
  PROCEED_WITH_PAYMENT
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
import { none, Option } from "fp-ts/lib/Option";

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

// enum ScreenEnum {
//   SHOW_SELECTED,
//   SHOW_LIST,
//   PROCEED
// }

// function* handlePaymentMethodSelection(
//   currentSituation: ScreenEnum,
//   paymentMethod?: CreditCard
// ): Iterator<Effect> {
//   switch (currentSituation) {
//     case ScreenEnum.SHOW_SELECTED: {
//       // set "selectedCardId" to some(paymentMethod)
//       // navigate to SHOW_SELECTED screen
//       // break
//     }
//     case ScreenEnum.SHOW_LIST: {
//       // navigate to SHOW_LIST
//     }
//     case ScreenEnum.PROCEED: {
//       // navigate to next screen
//     }
//   }
// }

function* paymentSaga(): Iterator<Effect> {
  /**
   * Display initial code(s) acquisitiion screen
   */
  yield put(
    NavigationActions.navigate({
      routeName: ROUTES.WALLET_MANUAL_TRANSACTION_IDENTIFICATION
    })
  );
  // wait for data acquisition to be over
  const action = yield take(TRANSACTION_DATA_ENTERED);
  // store data in redux state
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
  // save transaction data in redux state
  yield put(transactionDataFetched(mockedPaymentData));

  // navigate to first transaction recap
  yield put(
    NavigationActions.navigate({
      routeName: ROUTES.WALLET_FIRST_TRANSACTION_SUMMARY
    })
  );

  // wait for user to proceed with the payment
  yield take(PROCEED_WITH_PAYMENT);

  // TODO: get favorite card from redux state
  const mockedFavorite: Option<number> = none; // some(1)

  // if (mockedFavorite.isSome()) {
  //   const initialSituation = ScreenEnum.SHOW_SELECTED;
  //   const optionalFavouriteCard = // selectFavouriteCardSelector()
  // }
  // else {
  //   const initialSituation = ScreenEnum.SHOW_LIST;
  //   const optionalFaveCard = undefined;
  // }
  // // to be done with an "if-else" + set optionalFaveCard to favorite card or undefined
  // yield call(handlePaymentMethodSelection, initialSituation, optionalFavouriteCard)

  // while (true) {
  //   const action = take([SHOW_SELECTED, SHOW_LIST, PROCEED])
  //   if (action.type === SHOW_SELECTED) {
  //     nextAction = ScreenEnum.SHOW_SELECTED;
  //     optionalFavoriteCard = action.payload;
  //   }
  //   else if (action.type === SHOW_LIST) {
  //     nextAction = ScreenEnum.SHOW_LIST;
  //   }
  //   else {
  //     nextAction = PROCEED;
  //   }
  //   yield call(handlePaymentMethodSelection, nextAction, optionalFavoriteCard);
  //   if (action === PROCEED) {
  //     break;
  //   }
  // }
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
