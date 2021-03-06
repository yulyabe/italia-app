import { PaymentNoticeNumber, RptId } from "italia-ts-commons/lib/pagopa";
import { AmountInEuroCents } from "italia-ts-commons/lib/pagopa";
import { OrganizationFiscalCode } from "italia-ts-commons/lib/strings";
import { EnteBeneficiario } from "../../definitions/backend/EnteBeneficiario";
import { Amount } from "../types/pagopa";
import { Transaction } from "../types/pagopa";
import { Wallet } from "../types/pagopa";

export const UNKNOWN_STRING = "?";
export const UNKNOWN_NUMBER = -1;
export const UNKNOWN_DATE = new Date("?");

export const UNKNOWN_RECIPIENT: EnteBeneficiario = {
  identificativoUnivocoBeneficiario: UNKNOWN_STRING,
  denominazioneBeneficiario: UNKNOWN_STRING,
  codiceUnitOperBeneficiario: UNKNOWN_STRING,
  denomUnitOperBeneficiario: UNKNOWN_STRING,
  indirizzoBeneficiario: UNKNOWN_STRING,
  civicoBeneficiario: UNKNOWN_STRING,
  capBeneficiario: UNKNOWN_STRING,
  localitaBeneficiario: UNKNOWN_STRING,
  provinciaBeneficiario: UNKNOWN_STRING,
  nazioneBeneficiario: UNKNOWN_STRING
};

export const UNKNOWN_ORGANIZATION_FISCAL_CODE = "00000000000" as OrganizationFiscalCode;

export const UNKNOWN_PAYMENT_NOTICE_NUMBER = {
  auxDigit: "0",
  applicationCode: "00",
  iuv13: "0000000000000"
} as PaymentNoticeNumber;

export const UNKNOWN_RPTID: RptId = {
  organizationFiscalCode: UNKNOWN_ORGANIZATION_FISCAL_CODE,
  paymentNoticeNumber: UNKNOWN_PAYMENT_NOTICE_NUMBER
};

export const UNKNOWN_CARD_PAN = "0000";
export const UNKNOWN_CARD_HOLDER = "NO HOLDER";
export const UNKNWON_CARD_TYPE = "UNKNOWN";
export const UNKNOWN_LAST_USAGE = UNKNOWN_DATE;
export const UNKNOWN_EXPIRATION_MONTH = "??";
export const UNKNOWN_EXPIRATION_YEAR = "??";
export const UNKNOWN_EXPIRATION_DATE = `${UNKNOWN_EXPIRATION_MONTH}/${UNKNOWN_EXPIRATION_YEAR}`;

export const UNKNOWN_AMOUNT_PAGOPA: Amount = {
  amount: 0,
  currency: "EUR",
  currencyNumber: "0",
  decimalDigits: 2
};

export const UNKNOWN_CARD: Wallet = {
  creditCard: {
    brandLogo: UNKNWON_CARD_TYPE,
    expireMonth: UNKNOWN_EXPIRATION_MONTH,
    expireYear: UNKNOWN_EXPIRATION_YEAR,
    flag3dsVerified: false,
    holder: UNKNOWN_CARD_HOLDER,
    id: UNKNOWN_NUMBER,
    pan: UNKNOWN_CARD_PAN
  },
  type: "CREDIT_CARD",
  favourite: false,
  idPsp: UNKNOWN_NUMBER,
  idWallet: UNKNOWN_NUMBER,
  lastUsage: UNKNOWN_LAST_USAGE,
  psp: {
    businessName: UNKNOWN_STRING,
    fixedCost: UNKNOWN_AMOUNT_PAGOPA,
    id: UNKNOWN_NUMBER,
    logoPSP: UNKNOWN_STRING
  }
};

export const UNKNOWN_TRANSACTION: Transaction = {
  amount: UNKNOWN_AMOUNT_PAGOPA,
  created: UNKNOWN_DATE,
  description: UNKNOWN_STRING,
  error: false,
  fee: UNKNOWN_AMOUNT_PAGOPA,
  grandTotal: UNKNOWN_AMOUNT_PAGOPA,
  id: UNKNOWN_NUMBER,
  idPayment: UNKNOWN_NUMBER,
  idPsp: UNKNOWN_NUMBER,
  idStatus: UNKNOWN_NUMBER,
  idWallet: UNKNOWN_NUMBER,
  merchant: UNKNOWN_STRING,
  nodoIdPayment: UNKNOWN_STRING,
  paymentModel: UNKNOWN_NUMBER,
  statusMessage: UNKNOWN_STRING,
  success: false,
  token: UNKNOWN_STRING,
  updated: UNKNOWN_DATE,
  urlCheckout3ds: UNKNOWN_STRING,
  urlRedirectPSP: UNKNOWN_STRING
};

export const UNKNOWN_AMOUNT = "9999999999" as AmountInEuroCents;
export const UNKNOWN_PAYMENT_REASON = UNKNOWN_STRING;
