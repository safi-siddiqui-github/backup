export const Routes = {
  admin: {},
  web: {
    auth: {
      emailVerification: "/email-verification",
      dashboard: "/dashboard",
    },
    general: {
      home: "/",
      // contact: "/contact",
      // about: "/about",
      // features: "/features",
      // howItWorks: "/how-it-works",
      // help: "/help",
      // organizers: "/organizers",

      eventsCreate: "/events/create",
      eventsDiscover: "/events/discover",
    },
    guest: {
      signup: "/signup",
      signin: "/signin",
      forgotPasswordCheckEmail: "/forgot-password/check-email",
      forgotPasswordUpdatePassword: "/forgot-password/update-password",

      socialSigninResponse: "/social-signin-response",
    },
    vendor: {
      dashboard: "/vendor",
      profile: "/vendor/profile",
    },
  },
  api: {
    web: {
      guest: {
        signup: "/web/guest/signup",
        signin: "/web/guest/signin",
        forgotPasswordCheckEmail: "/web/guest/forgot-password/check-email",
        forgotPasswordUpdatePassword:
          "/web/guest/forgot-password/update-password",
        socialSigninGoogleRedirect: "/web/guest/social-signin/google/redirect",
        socialSigninGoogleCallback: "/web/guest/social-signin/google/callback",
        socialSigninMicrosoftRedirect:
          "/web/guest/social-signin/microsoft/redirect",

        eventVisibilityAll: "/web/guest/event-visibility/all",
        eventDateTypeAll: "/web/guest/event-date-type/all",
        eventRecurringPatternAll: "/web/guest/event-recurring-pattern/all",
        eventRecurringEndAll: "/web/guest/event-recurring-end/all",
        eventVenueTypeAll: "/web/guest/event-venue-type/all",
        eventVenueLocationTypeAll: "/web/guest/event-venue-location-type/all",
        eventCategoryAll: "/web/guest/event-category/all",
      },
      auth: {
        emailVerificationVerify: "/web/auth/email-verification/verify",
        emailVerificationResend: "/web/auth/email-verification/resend",
        tokenDetail: "/web/auth/token/detail",
      },
    },
  },
};
