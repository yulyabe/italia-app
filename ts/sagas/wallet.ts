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
  SELECT_CARD_FOR_TRANSACTION,
  END_PAYMENT
} from "../store/actions/constants";
import { cardsFetched, selectCardForTransaction } from "../store/actions/wallet/cards";
import { transactionsFetched } from "../store/actions/wallet/transactions";
import { CreditCard, UNKNOWN_CARD } from "../types/CreditCard";
import { WalletTransaction } from "../types/wallet";
import { NavigationActions } from "react-navigation";
import ROUTES from "../navigation/routes";
import {
  storeTransactionData,
  transactionDataFetched,
  startPayment
} from "../store/actions/wallet/payment";
import { PaymentData, PaymentIdentifier } from "../store/reducers/wallet/payment";

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
  SHOW_CARDS_LIST_FOR_TRANSACTION, // l'utente deve scegliere quale carta associare alla transazion
  SELECT_CARD_FOR_TRANSACTION,
  END_PAYMENT,
  CONFIRM_TRANSACTION // L'utente conferma definitivamente di voler procedere alla transazione
}

function* handlePaymentMethodSelection(
  currentChoice: DefineWhatDisplay,
  cardforTransaction: CreditCard
): Iterator<Effect> {
  switch (currentChoice) {
    case DefineWhatDisplay.SHOW_SELECTED_CARD_FOR_TRANSACTION: {
      yield put(selectCardForTransaction(cardforTransaction));
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
          routeName: ROUTES.WALLET_PAY_WITH
        })
      );
      break;
    }
    case DefineWhatDisplay.END_PAYMENT: {
      // navigate to the list of available cards in the user wallet
      yield put(
        NavigationActions.navigate({
          routeName: ROUTES.WALLET_HOME
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
    }
  }
}

/** TODO: verificare cosa deve contenere il campo CodStazPA. 
 * Se corrisponde all'application code, questo non è necessariamente presente.
 * La presenza dovrebbe essere in funzione del valore assunto dall'AUX DIGIT 
 * VEDI http://pagopa-docs-specattuative.readthedocs.io/it/latest/specifiche_attuative_pagamenti.html
 * SEZIONE 8.2. Generazione del Numero Avviso e del codice IUV
 */
function* createJSONtoVerifyTransaction(data: PaymentIdentifier): Iterator<Effect> {
  return { 
    codiceIdRPT: {
      CF: data.authorityId,
      CodStazPA: "12",
      AuxDigit: "0", //first digit of the number
      CodIUV: "1234567890123"
    },
    datiPagamentoPSP: {
      importoSingoloVersamento: data.originalAmount
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

  // fetch transaction data from pagopa proxy
  const dataToSend = yield call(createJSONtoVerifyTransaction, action.payload);


  //moked data
  const mockedPaymentData: PaymentData = {
    transactionInfo: {
      noticeCode: "112324875636161",
      notifiedAmount: 198.0,
      iuv: "111116000001580",

      currentAmount: 215.0,
      paymentReason: "Tari 2018",

      expireDate: new Date("03/01/2018"),
      tranche: "unica",
      cbill: "A0EDT",
      transactionCost: 0.50
    },
    entity: {
      code: "01199250158",
      
      name: "Comune di Gallarate - Settore Tributi",
      address: "Via Cavour n.2 - Palazzo Broletto,21013",
      city: "Gallarate (VA)",
      tel: "0331.754224",
      webpage: "www.comune.gallarate.va.it",
      email: "tributi@coumne.gallarate.va.it",
      pec: "protocollo@pec.comune.gallarate.va.it"
    },
    recipient: {
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
  
  yield call(startPayment);

  while (true) {
    const action = yield take([ SHOW_SELECTED_CARD_FOR_TRANSACTION, SHOW_CARDS_LIST_FOR_TRANSACTION, SELECT_CARD_FOR_TRANSACTION, END_PAYMENT, CONFIRM_TRANSACTION ]);
    switch (action.type) {
      case SHOW_SELECTED_CARD_FOR_TRANSACTION: 
        EventToManage = DefineWhatDisplay.SHOW_SELECTED_CARD_FOR_TRANSACTION;
        CardForTransaction = action.payload;
        break;
      case SELECT_CARD_FOR_TRANSACTION:
        CardForTransaction = action.payload;
        EventToManage = DefineWhatDisplay.SHOW_SELECTED_CARD_FOR_TRANSACTION;
        break;
      case SHOW_CARDS_LIST_FOR_TRANSACTION:
        EventToManage = DefineWhatDisplay.SHOW_CARDS_LIST_FOR_TRANSACTION;
        break;
      case END_PAYMENT:
        EventToManage = DefineWhatDisplay.END_PAYMENT;
        break;
      case CONFIRM_TRANSACTION:
        EventToManage = DefineWhatDisplay.CONFIRM_TRANSACTION;
    }
    yield call(handlePaymentMethodSelection, EventToManage, CardForTransaction);
    if (action.type === CONFIRM_TRANSACTION || action.type === END_PAYMENT) {
      break;
    }
  }

  //TODO: ask to PagoPA to activate the transaction

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
