import { CardsActions } from "./cards";
import { TransactionsActions } from "./transactions";
import { PaymentActions } from "./payment";

export type WalletActions = CardsActions | TransactionsActions | PaymentActions;
