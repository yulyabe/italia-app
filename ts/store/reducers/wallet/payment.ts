import { PatternString } from "italia-ts-commons/lib/strings";
import * as t from "io-ts";
import { Option, none, some } from "fp-ts/lib/Option";
import { Action } from "../../actions/types";
import {
  STORE_TRANSACTION_DATA,
  TRANSACTION_DATA_FETCHED,
  SELECT_CARD_FOR_TRANSACTION,
  START_PAYMENT,
  END_PAYMENT
} from "../../actions/constants";
import {
  NotifiedTransaction,
  TransactionEntity,
  TransactionSubject
} from "../../../types/wallet";
import { GlobalState } from "../types";
import { CreditCard } from '../../../types/CreditCard';

export const NoticeNumber = PatternString("^\\d{8,18}$");
export type NoticeNumber = t.TypeOf<typeof NoticeNumber>;

export const AuthorityId = PatternString("^\\d{11,13}$");
export type AuthorityId = t.TypeOf<typeof AuthorityId>;

export type PaymentIdentifier = Readonly<{
  noticeNumber: Option<NoticeNumber>;
  authorityId: Option<AuthorityId>;
  originalAmount: Option<number>;
}>;

export type PaymentData = Readonly<{
  transactionInfo: NotifiedTransaction;
  entity: TransactionEntity;
  recipient: TransactionSubject;
}>;

export type PaymentState = Readonly<{
  paymentIdentifier: Option<PaymentIdentifier>;
  paymentData: Option<PaymentData>;
  paymentCard: Option<CreditCard>;
  isInTransaction: boolean;
}>;

export const PAYMENT_INITIAL_STATE: PaymentState = {
  paymentIdentifier: none,
  paymentData: none,
  paymentCard: none,
  isInTransaction: false
};

export const paymentDataSelector = (state: GlobalState): Option<PaymentData> =>
  state.wallet.payment.paymentData;

export const paymentCardSelector = (state: GlobalState): Option<CreditCard> =>
  state.wallet.payment.paymentCard;

export const paymentIsInTransactionSelector = (state:GlobalState): boolean =>
  state.wallet.payment.isInTransaction;

const reducer = (
  state: PaymentState = PAYMENT_INITIAL_STATE,
  action: Action
): PaymentState => {
  if (action.type === STORE_TRANSACTION_DATA) {
    return {
      ...state,
      paymentIdentifier: some(action.payload)
    };
  }
  if (action.type === TRANSACTION_DATA_FETCHED) {
    return {
      ...state,
      paymentData: some(action.payload)
    };
  }
  if (action.type === SELECT_CARD_FOR_TRANSACTION) {
    return {
      ...state,
      paymentCard: some(action.payload)
    }
  }
  if (action.type === START_PAYMENT) {
    return {
      ...state,
      isInTransaction: true
    }
  }
  if (action.type === END_PAYMENT) {
    return{
      ...state,
      isInTransaction: false
    }
  }
  
  return state;
};

export default reducer;
