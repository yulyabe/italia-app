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
  PROCEED_WITH_PAYMENT,
  CONFIRM_TRANSACTION,
  SHOW_CARDS_LIST_FOR_TRANSACTION,
  SHOW_SELECTED_CARD_FOR_TRANSACTION,
} from "../store/actions/constants";
import { cardsFetched, setCardForTransaction } from "../store/actions/wallet/cards";
import { transactionsFetched } from "../store/actions/wallet/transactions";
import { CreditCard, UNKNOWN_CARD } from "../types/CreditCard";
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

enum DefineWhatDisplay {
  SHOW_SELECTED_CARD_FOR_TRANSACTION, // alla transazione è associata la carta preferita
  SHOW_CARDS_LIST_FOR_TRANSACTION, // l'utente deve scegliere quale carta associare alla transazione
  CONFIRM_TRANSACTION // L'utente conferma definitivamente di voler procedere alla transazione
}

function* handlePaymentMethodSelection(
  currentChoice: DefineWhatDisplay,
  cardforTransaction: CreditCard
): Iterator<Effect> {
  switch (currentChoice) {
    case DefineWhatDisplay.SHOW_SELECTED_CARD_FOR_TRANSACTION: {
      yield put(setCardForTransaction(cardforTransaction));
      // navigate to the preview of both the card to use for the transaction and the transaction 
      yield put(
        NavigationActions.navigate({
          routeName: ROUTES.WALLET_CONFIRM_TO_PROCEED
        })
      );
      break;
    }
    case DefineWhatDisplay.SHOW_CARDS_LIST_FOR_TRANSACTION: {
      // navigate to the list of available cards in the user wallet
      yield put(
        NavigationActions.navigate({
          routeName: ROUTES.WALLET_CONFIRM_TO_PROCEED //WALLET_PAY_WITH it giv error!!!
        })
      );
      break;
    }
    case DefineWhatDisplay.CONFIRM_TRANSACTION: {
      // navigate to screen which ask the last confirm before proceed with the activation of the transaction.
      yield put(
        NavigationActions.navigate({
          routeName: ROUTES.WALLET_TRANSACTION_DETAILS
        })
      );
      break;
      /** TODO: 
       *   - once the user confirm the transaction, the PagoPA actionavtion 
       *        of the transaction must be performed
       *   - ensure the detail screen manage the occurence con the thank you screen
       */
    }
  }
}

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

  // navigate to first transaction summary
  yield put(
    NavigationActions.navigate({
      routeName: ROUTES.WALLET_FIRST_TRANSACTION_SUMMARY
    })
  );

  // wait for user to proceed with the payment pressing the corresponding button
  yield take(PROCEED_WITH_PAYMENT);

  // TODO: get favorite card from redux state or PagoPA
  //TODO: define if change UNKNOWN CARD with undefined
  const mockedFavoriteCard: CreditCard = UNKNOWN_CARD; // some(1)
  
  /**
   * Depending of the existence of a favourite credit card, the navigation will change:
   * - if it exists, the user will navigate to the transaction summary with the favourite card
   * - if it does not exist, the user will navigate to the list of available cards
   */
  let EventToManage;
  let CardForTransaction: CreditCard = mockedFavoriteCard;

  if (mockedFavoriteCard !== UNKNOWN_CARD) {
    EventToManage = DefineWhatDisplay.SHOW_SELECTED_CARD_FOR_TRANSACTION;
  }
  else {
    EventToManage = DefineWhatDisplay.SHOW_CARDS_LIST_FOR_TRANSACTION;
  }

  yield call(handlePaymentMethodSelection, EventToManage, CardForTransaction);


  // the proper navigation is performed depending on the previous check
  //yield call(handlePaymentMethodSelection, EventToManage, CardForTransaction);

  while (true) {
    const action = yield take([SHOW_SELECTED_CARD_FOR_TRANSACTION, SHOW_CARDS_LIST_FOR_TRANSACTION, CONFIRM_TRANSACTION ]);
    switch (action.type) {
      case SHOW_SELECTED_CARD_FOR_TRANSACTION: 
        EventToManage = DefineWhatDisplay.SHOW_SELECTED_CARD_FOR_TRANSACTION;
        CardForTransaction = action.payload;
      case SHOW_CARDS_LIST_FOR_TRANSACTION:
        EventToManage = DefineWhatDisplay.SHOW_CARDS_LIST_FOR_TRANSACTION;
      case CONFIRM_TRANSACTION:
        EventToManage = DefineWhatDisplay.CONFIRM_TRANSACTION;
    }
    yield call(handlePaymentMethodSelection, EventToManage, CardForTransaction);
    if (action.type === CONFIRM_TRANSACTION) {
      break
    }
  }
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
