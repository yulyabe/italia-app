import { CreditCard } from "../../../types/CreditCard";
import {
  CARDS_FETCHED,
  END_PAYMENT,
  FETCH_CARDS_REQUEST,
  SELECT_CARD_FOR_DETAILS,
  SELECT_CARD_FOR_TRANSACTION
} from "../constants";

export type FetchCardsRequest = Readonly<{
  type: typeof FETCH_CARDS_REQUEST;
}>;

export type CardsFetched = Readonly<{
  type: typeof CARDS_FETCHED;
  payload: ReadonlyArray<CreditCard>;
}>;

export type CardSelectedForDetails = Readonly<{
  type: typeof SELECT_CARD_FOR_DETAILS;
  payload: CreditCard | number; // either a card or its id
}>;

export type CardSelectedForTransaction = Readonly<{
  type: typeof SELECT_CARD_FOR_TRANSACTION;
  payload: CreditCard;
}>;

export type EndPayment = Readonly<{
  type: typeof END_PAYMENT;
}>;

export type CardsActions =
  | FetchCardsRequest
  | CardsFetched
  | CardSelectedForDetails
  | CardSelectedForTransaction
  | EndPayment;

export const fetchCardsRequest = (): FetchCardsRequest => ({
  type: FETCH_CARDS_REQUEST
});

export const cardsFetched = (
  cards: ReadonlyArray<CreditCard>
): CardsFetched => ({
  type: CARDS_FETCHED,
  payload: cards
});

export const selectCardForDetails = (
  card: CreditCard | number
): CardSelectedForDetails => ({
  type: SELECT_CARD_FOR_DETAILS,
  payload: card
});

export const selectCardForTransaction = (
  card: CreditCard
): CardSelectedForTransaction => ({
  type: SELECT_CARD_FOR_TRANSACTION,
  payload: card
});
