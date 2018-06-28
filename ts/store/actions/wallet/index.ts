import { CardsActions } from "./cards";
import { PaymentActions } from "./payment";
import { TransactionsActions } from "./transactions";

export type WalletActions = CardsActions | TransactionsActions | PaymentActions;
