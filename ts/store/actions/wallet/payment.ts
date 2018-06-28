import { PaymentData, PaymentIdentifier } from "../../reducers/wallet/payment";
import {
  CONFIRM_TRANSACTION,
  END_PAYMENT,
  PROCEED_WITH_PAYMENT,
  SHOW_CARDS_LIST_FOR_TRANSACTION,
  SHOW_SELECTED_CARD_FOR_TRANSACTION,
  START_PAYMENT,
  STORE_TRANSACTION_DATA,
  TRANSACTION_DATA_ENTERED,
  TRANSACTION_DATA_FETCHED
} from "../constants";

export type StartPayment = Readonly<{
  type: typeof START_PAYMENT;
}>;

export type TransactionDataEntered = Readonly<{
  type: typeof TRANSACTION_DATA_ENTERED;
  payload: PaymentIdentifier;
}>;

export type StoreTransactionData = Readonly<{
  type: typeof STORE_TRANSACTION_DATA;
  payload: PaymentIdentifier;
}>;

export type TransactionDataFetched = Readonly<{
  type: typeof TRANSACTION_DATA_FETCHED;
  payload: PaymentData;
}>;

export type ProceedWithPayment = Readonly<{
  type: typeof PROCEED_WITH_PAYMENT;
}>;

export type ShowSelectedCardForTransaction = Readonly<{
  type: typeof SHOW_SELECTED_CARD_FOR_TRANSACTION;
}>;

export type ShowCardsListForTransaction = Readonly<{
  type: typeof SHOW_CARDS_LIST_FOR_TRANSACTION;
}>;

export type ConfirmTransaction = Readonly<{
  type: typeof CONFIRM_TRANSACTION;
}>;

export type EndPayment = Readonly<{
  type: typeof END_PAYMENT;
}>;

export type PaymentActions =
  | StartPayment
  | TransactionDataEntered
  | StoreTransactionData
  | TransactionDataFetched
  | ProceedWithPayment
  | ShowSelectedCardForTransaction
  | ShowCardsListForTransaction
  | ConfirmTransaction
  | EndPayment;

export const startPayment = (): StartPayment => ({
  type: START_PAYMENT
});

export const transactionDataEntered = (
  paymentIdentifier: PaymentIdentifier
): TransactionDataEntered => ({
  type: TRANSACTION_DATA_ENTERED,
  payload: paymentIdentifier
});

export const storeTransactionData = (
  paymentIdentifier: PaymentIdentifier
): StoreTransactionData => ({
  type: STORE_TRANSACTION_DATA,
  payload: paymentIdentifier
});

export const transactionDataFetched = (
  paymentData: PaymentData
): TransactionDataFetched => ({
  type: TRANSACTION_DATA_FETCHED,
  payload: paymentData
});

export const proceedWithPayment = (): ProceedWithPayment => ({
  type: PROCEED_WITH_PAYMENT
});

export const showSelectedCardForTransaction = (): ShowSelectedCardForTransaction => ({
  type: SHOW_SELECTED_CARD_FOR_TRANSACTION
});

export const showCardsListForTransaction = (): ShowCardsListForTransaction => ({
  type: SHOW_CARDS_LIST_FOR_TRANSACTION
});

export const confirmTransaction = (): ConfirmTransaction => ({
  type: CONFIRM_TRANSACTION
});

export const endPayment = (): EndPayment => ({
  type: END_PAYMENT
});
