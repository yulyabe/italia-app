/**
 * All the actions related constants.
 */

// Application
export const START_APPLICATION_INITIALIZATION: "START_APPLICATION_INITIALIZATION" =
  "START_APPLICATION_INITIALIZATION";
export const APP_STATE_CHANGE_ACTION: "APP_STATE_CHANGE_ACTION" =
  "APP_STATE_CHANGE_ACTION";

// Navigation
export const NAVIGATION_RESTORE: "NAVIGATION_RESTORE" = "NAVIGATION_RESTORE";

// Authentication
export const ANALYTICS_AUTHENTICATION_STARTED: "ANALYTICS_AUTHENTICATION_STARTED" =
  "ANALYTICS_AUTHENTICATION_STARTED";
export const ANALYTICS_AUTHENTICATION_COMPLETED: "ANALYTICS_AUTHENTICATION_COMPLETED" =
  "ANALYTICS_AUTHENTICATION_COMPLETED";
export const IDP_SELECTED: "IDP_SELECTED" = "IDP_SELECTED";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILURE: "LOGIN_FAILURE" = "LOGIN_FAILURE";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE: "LOGOUT_FAILURE" = "LOGOUT_FAILURE";
export const SESSION_INFO_LOAD_SUCCESS: "SESSION_INFO_LOAD_SUCCESS" =
  "SESSION_INFO_LOAD_SUCCESS";
export const SESSION_INFO_LOAD_FAILURE: "SESSION_INFO_LOAD_FAILURE" =
  "SESSION_INFO_LOAD_FAILURE";
// Used when an API call receive 401
export const SESSION_EXPIRED: "SESSION_EXPIRED" = "SESSION_EXPIRED";
// Used at startup if the session is not valid
export const SESSION_INVALID: "SESSION_INVALID" = "SESSION_INVALID";

// Onboarding
export const ANALYTICS_ONBOARDING_STARTED: "ANALYTICS_ONBOARDING_STARTED" =
  "ANALYTICS_ONBOARDING_STARTED";
export const TOS_ACCEPT_REQUEST: "TOS_ACCEPT_REQUEST" = "TOS_ACCEPT_REQUEST";
export const TOS_ACCEPT_SUCCESS: "TOS_ACCEPT_SUCCESS" = "TOS_ACCEPT_SUCCESS";
export const START_PIN_RESET: "START_PIN_RESET" = "START_PIN_RESET";
export const PIN_CREATE_REQUEST: "PIN_CREATE_REQUEST" = "PIN_CREATE_REQUEST";
export const PIN_CREATE_SUCCESS: "PIN_CREATE_SUCCESS" = "PIN_CREATE_SUCCESS";
export const PIN_CREATE_FAILURE: "PIN_CREATE_FAILURE" = "PIN_CREATE_FAILURE";

// Notifications
export const NOTIFICATIONS_INSTALLATION_TOKEN_UPDATE: "NOTIFICATIONS_INSTALLATION_TOKEN_UPDATE" =
  "NOTIFICATIONS_INSTALLATION_TOKEN_UPDATE";
export const NOTIFICATIONS_INSTALLATION_UPDATE_FAILURE: "NOTIFICATIONS_INSTALLATION_UPDATE_FAILURE" =
  "NOTIFICATIONS_INSTALLATION_UPDATE_FAILURE";

// Pinlogin
export const PIN_LOGIN_VALIDATE_REQUEST: "PIN_LOGIN_VALIDATE_REQUEST" =
  "PIN_LOGIN_VALIDATE_REQUEST";
export const PIN_LOGIN_VALIDATE_SUCCESS: "PIN_LOGIN_VALIDATE_SUCCESS" =
  "PIN_LOGIN_VALIDATE_SUCCESS";
export const PIN_LOGIN_VALIDATE_FAILURE: "PIN_LOGIN_VALIDATE_FAILURE" =
  "PIN_LOGIN_VALIDATE_FAILURE";

// Profile
export const RESET_PROFILE_STATE: "RESET_PROFILE_STATE" = "RESET_PROFILE_STATE";
export const PROFILE_LOAD_SUCCESS: "PROFILE_LOAD_SUCCESS" =
  "PROFILE_LOAD_SUCCESS";
export const PROFILE_LOAD_FAILURE: "PROFILE_LOAD_FAILURE" =
  "PROFILE_LOAD_FAILURE";

export const PROFILE_UPSERT_REQUEST: "PROFILE_UPSERT_REQUEST" =
  "PROFILE_UPSERT_REQUEST";
export const PROFILE_UPSERT_SUCCESS: "PROFILE_UPSERT_SUCCESS" =
  "PROFILE_UPSERT_SUCCESS";
export const PROFILE_UPSERT_FAILURE: "PROFILE_UPSERT_FAILURE" =
  "PROFILE_UPSERT_FAILURE";

// Wallet
// (transactions)
export const FETCH_TRANSACTIONS_REQUEST: "FETCH_TRANSACTIONS_REQUEST" =
  "FETCH_TRANSACTIONS_REQUEST";
export const TRANSACTIONS_FETCHED: "TRANSACTIONS_FETCHED" =
  "TRANSACTIONS_FETCHED";
export const SELECT_TRANSACTION_FOR_DETAILS: "SELECT_TRANSACTION_FOR_DETAILS" =
  "SELECT_TRANSACTION_FOR_DETAILS";
// (wallets)
export const FETCH_WALLETS_REQUEST: "FETCH_WALLETS_REQUEST" =
  "FETCH_WALLETS_REQUEST";
export const WALLETS_FETCHED: "WALLETS_FETCHED" = "WALLETS_FETCHED";
export const SELECT_WALLET_FOR_DETAILS: "SELECT_WALLET_FOR_DETAILS" =
  "SELECT_WALLET_FOR_DETAILS";
export const SET_FAVORITE_WALLET: "SET_FAVORITE_WALLET" = "SET_FAVORITE_WALLET";

// (payment)
export const PAYMENT_REQUEST_QR_CODE: "PAYMENT_REQUEST_QR_CODE" =
  "PAYMENT_REQUEST_QR_CODE";
export const PAYMENT_QR_CODE: "PAYMENT_QR_CODE" = "PAYMENT_QR_CODE";
export const PAYMENT_REQUEST_MANUAL_ENTRY: "PAYMENT_REQUEST_MANUAL_ENTRY" =
  "PAYMENT_REQUEST_MANUAL_ENTRY";
export const PAYMENT_MANUAL_ENTRY: "PAYMENT_MANUAL_ENTRY" =
  "PAYMENT_MANUAL_ENTRY";
export const PAYMENT_REQUEST_MESSAGE: "PAYMENT_REQUEST_MESSAGE" =
  "PAYMENT_REQUEST_MESSAGE";
export const PAYMENT_TRANSACTION_SUMMARY_FROM_RPT_ID: "PAYMENT_TRANSACTION_SUMMARY_FROM_RPT_ID" =
  "PAYMENT_TRANSACTION_SUMMARY_FROM_RPT_ID";
export const PAYMENT_TRANSACTION_SUMMARY_FROM_BANNER: "PAYMENT_TRANSACTION_SUMMARY_FROM_BANNER" =
  "PAYMENT_TRANSACTION_SUMMARY_FROM_BANNER";
export const PAYMENT_REQUEST_TRANSACTION_SUMMARY: "PAYMENT_REQUEST_TRANSACTION_SUMMARY" =
  "PAYMENT_REQUEST_TRANSACTION_SUMMARY";
export const PAYMENT_REQUEST_CONTINUE_WITH_PAYMENT_METHODS: "PAYMENT_REQUEST_CONTINUE_WITH_PAYMENT_METHODS" =
  "PAYMENT_REQUEST_CONTINUE_WITH_PAYMENT_METHODS";
export const PAYMENT_REQUEST_PICK_PAYMENT_METHOD: "PAYMENT_REQUEST_PICK_PAYMENT_METHOD" =
  "PAYMENT_REQUEST_PICK_PAYMENT_METHOD";
export const PAYMENT_PICK_PAYMENT_METHOD: "PAYMENT_PICK_PAYMENT_METHOD" =
  "PAYMENT_PICK_PAYMENT_METHOD";
export const PAYMENT_INITIAL_PICK_PAYMENT_METHOD: "PAYMENT_INITIAL_PICK_PAYMENT_METHOD" =
  "PAYMENT_INITIAL_PICK_PAYMENT_METHOD";
export const PAYMENT_REQUEST_CONFIRM_PAYMENT_METHOD: "PAYMENT_REQUEST_CONFIRM_PAYMENT_METHOD" =
  "PAYMENT_REQUEST_CONFIRM_PAYMENT_METHOD";
export const PAYMENT_CONFIRM_PAYMENT_METHOD: "PAYMENT_CONFIRM_PAYMENT_METHOD" =
  "PAYMENT_CONFIRM_PAYMENT_METHOD";
export const PAYMENT_INITIAL_CONFIRM_PAYMENT_METHOD: "PAYMENT_INITIAL_CONFIRM_PAYMENT_METHOD" =
  "PAYMENT_INITIAL_CONFIRM_PAYMENT_METHOD";
export const PAYMENT_REQUEST_PICK_PSP: "PAYMENT_REQUEST_PICK_PSP" =
  "PAYMENT_REQUEST_PICK_PSP";
export const PAYMENT_PICK_PSP: "PAYMENT_PICK_PSP" = "PAYMENT_PICK_PSP";
export const PAYMENT_INITIAL_PICK_PSP: "PAYMENT_INITIAL_PICK_PSP" =
  "PAYMENT_INITIAL_PICK_PSP";
export const PAYMENT_UPDATE_PSP: "PAYMENT_UPDATE_PSP" = "PAYMENT_UPDATE_PSP";
// TODO: temporary, until integration with pagoPA occurs @https://www.pivotaltracker.com/story/show/159494746
export const PAYMENT_UPDATE_PSP_IN_STATE: "PAYMENT_UPDATE_PSP_IN_STATE" =
  "PAYMENT_UPDATE_PSP_IN_STATE";
export const PAYMENT_REQUEST_COMPLETION: "PAYMENT_REQUEST_COMPLETION" =
  "PAYMENT_REQUEST_COMPLETION";
export const PAYMENT_COMPLETED: "PAYMENT_COMPLETED" = "PAYMENT_COMPLETED";
export const PAYMENT_STORE_NEW_TRANSACTION: "PAYMENT_STORE_NEW_TRANSACTION" =
  "PAYMENT_STORE_NEW_TRANSACTION";
export const PAYMENT_GO_BACK: "PAYMENT_GO_BACK" = "PAYMENT_GO_BACK";
export const PAYMENT_REQUEST_GO_BACK: "PAYMENT_REQUEST_GO_BACK" =
  "PAYMENT_REQUEST_GO_BACK";

// pagoPa actions
export const PAGOPA_STORE_TOKEN: "PAGOPA_STORE_TOKEN" = "PAGOPA_STORE_TOKEN";

// Messages
export const MESSAGES_LOAD_REQUEST: "MESSAGES_LOAD_REQUEST" =
  "MESSAGES_LOAD_REQUEST";
export const MESSAGES_LOAD_CANCEL: "MESSAGES_LOAD_CANCEL" =
  "MESSAGES_LOAD_CANCEL";
export const MESSAGES_LOAD_SUCCESS: "MESSAGES_LOAD_SUCCESS" =
  "MESSAGES_LOAD_SUCCESS";
export const MESSAGES_LOAD_FAILURE: "MESSAGES_LOAD_FAILURE" =
  "MESSAGES_LOAD_FAILURE";

export const MESSAGE_LOAD_REQUEST: "MESSAGE_LOAD_REQUEST" =
  "MESSAGE_LOAD_REQUEST";
export const MESSAGE_LOAD_SUCCESS: "MESSAGE_LOAD_SUCCESS" =
  "MESSAGE_LOAD_SUCCESS";
export const MESSAGE_LOAD_FAILURE: "MESSAGE_LOAD_FAILURE" =
  "MESSAGE_LOAD_FAILURE";

export const NAVIGATE_TO_MESSAGE_DETAILS: "NAVIGATE_TO_MESSAGE_DETAILS" =
  "NAVIGATE_TO_MESSAGE_DETAILS";

// Services
export const SERVICE_LOAD_SUCCESS: "SERVICE_LOAD_SUCCESS" =
  "SERVICE_LOAD_SUCCESS";

// BackendInfo

export const BACKEND_INFO_LOAD_SUCCESS: "BACKEND_INFO_LOAD_SUCCESS" =
  "BACKEND_INFO_LOAD_SUCCESS";

export const BACKEND_INFO_LOAD_FAILURE: "BACKEND_INFO_LOAD_FAILURE" =
  "BACKEND_INFO_LOAD_FAILURE";

// Preferences

export const PREFERENCES_LANGUAGES_LOAD_SUCCESS: "PREFERENCES_LANGUAGES_LOAD_SUCCESS" =
  "PREFERENCES_LANGUAGES_LOAD_SUCCESS";

// Content

export const CONTENT_SERVICE_LOAD: "CONTENT_SERVICE_LOAD" =
  "CONTENT_SERVICE_LOAD";

export const CONTENT_SERVICE_LOAD_SUCCESS: "CONTENT_SERVICE_LOAD_SUCCESS" =
  "CONTENT_SERVICE_LOAD_SUCCESS";

export const CONTENT_SERVICE_LOAD_FAILURE: "CONTENT_SERVICE_LOAD_FAILURE" =
  "CONTENT_SERVICE_LOAD_FAILURE";

// Error
export const ERROR_CLEAR: "ERROR_CLEAR" = "ERROR_CLEAR";

// Enum for actions that need UI state reducers
export const enum FetchRequestActions {
  TOS_ACCEPT = "TOS_ACCEPT",
  PIN_CREATE = "PIN_CREATE",
  PROFILE_LOAD = "PROFILE_LOAD",
  PROFILE_UPSERT = "PROFILE_UPSERT",
  MESSAGES_LOAD = "MESSAGES_LOAD",
  LOGOUT = "LOGOUT"
}

// Extract keys from object and create a new union type
export type FetchRequestActionsType = keyof typeof FetchRequestActions;

export const CLEAR_DEEPLINK: "CLEAR_DEEPLINK" = "CLEAR_DEEPLINK";
export const NAVIGATE_TO_DEEPLINK: "NAVIGATE_TO_DEEPLINK" =
  "NAVIGATE_TO_DEEPLINK";

// Deferred actions.
export const DEFER_TO_LOGIN: "DEFER_TO_LOGIN" = "DEFER_TO_LOGIN";
export const PUSH_TO_DEFERRED_ACTIONS: "PUSH_TO_DEFERRED_ACTIONS" =
  "PUSH_TO_DEFERRED_ACTIONS";
export const CLEAR_DEFERRED_ACTIONS: "CLEAR_DEFERRED_ACTIONS" =
  "CLEAR_DEFERRED_ACTIONS";
