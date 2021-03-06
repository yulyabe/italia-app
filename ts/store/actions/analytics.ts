import {
  ANALYTICS_AUTHENTICATION_COMPLETED,
  ANALYTICS_AUTHENTICATION_STARTED,
  ANALYTICS_ONBOARDING_STARTED
} from "./constants";

export type AnalyticsOboardingStarted = Readonly<{
  type: typeof ANALYTICS_ONBOARDING_STARTED;
}>;

export type AnalyticsAuthenticationStarted = Readonly<{
  type: typeof ANALYTICS_AUTHENTICATION_STARTED;
}>;

export type AnalyticsAuthenticationCompleted = Readonly<{
  type: typeof ANALYTICS_AUTHENTICATION_COMPLETED;
}>;

export type AnalyticsActions =
  | AnalyticsOboardingStarted
  | AnalyticsAuthenticationStarted
  | AnalyticsAuthenticationCompleted;

export const analyticsOnboardingStarted: AnalyticsOboardingStarted = {
  type: "ANALYTICS_ONBOARDING_STARTED"
};

export const analyticsAuthenticationStarted: AnalyticsAuthenticationStarted = {
  type: "ANALYTICS_AUTHENTICATION_STARTED"
};

export const analyticsAuthenticationCompleted: AnalyticsAuthenticationCompleted = {
  type: "ANALYTICS_AUTHENTICATION_COMPLETED"
};
