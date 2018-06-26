import {
  START_PAYMENT,
  TRANSACTION_DATA_ENTERED,
  STORE_TRANSACTION_DATA,
  TRANSACTION_DATA_FETCHED,
  PROCEED_WITH_PAYMENT
} from "../constants";
import { PaymentIdentifier, PaymentData } from "../../reducers/wallet/payment";

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

export type PaymentActions =
  | StartPayment
  | TransactionDataEntered
  | StoreTransactionData
  | TransactionDataFetched
  | ProceedWithPayment;

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
