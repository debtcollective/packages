# Union Component

This component has both the `Membership` and the `Donation` widgets. This are used by the membership app to signup people and accept donations.

## Variables

We are using `window` to configure the widget. These are the variables that need to be present for the widget work correctly.

- `window.DC_DONATE_API_URL`
- `window.DC_MEMBERSHIP_API_URL`
- `window.DC_RECAPTCHA_V3_SITE_KEY`
- `window.DC_STRIPE_PUBLIC_TOKEN`

## Developer notes

Install dependencies by:

```sh
yarn install
```

Once they are install, you want to check your changes using storybook. First `cp env.sample .env` in order to inject some variables to your storybook so it behaves closer to the real world usage

Take a look to the [Stripe website](https://stripe.com) to get your API key

```sh
yarn storybook
```
