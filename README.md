# Packages

[![CircleCI](https://circleci.com/gh/debtcollective/packages.svg?style=svg)](https://circleci.com/gh/debtcollective/packages)
[![codecov](https://codecov.io/gh/debtcollective/packages/branch/master/graph/badge.svg)](https://codecov.io/gh/debtcollective/packages)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

This repo contains the packages we use across applications.

## Project structure

This repository is a monorepo that uses [Lerna](https://github.com/lerna/lerna). It is structured the following way:

```bash
packages/
├── tools/ # Dispute tools JSON schema package
```

## Installation

To get started run:

```bash
yarn setup
```

Go to the README.md of each package for usage information.

## Contributing & Deployment

While each package README.md is useful to check the common workflow you will have is to:

- Take a branch out from `development`
- Create a PR pointing to `development`
- Once the PR is merged, **manually merge to master to trigger a new release**
- The new version will be calculated atomatically by lerna

As some of our applications/websites introduce the components here using a package manager such as `npm` or `yarn` it is important to understand that the changes once a new component is deployed won't be available immediatly for those sites/apps.

On the other hand, applications that use a script tag to pull the latest version of a component will immediately receive the updates from the latest component version. In order to allow the changes propagate into apps that include the dependency during building time you need to **build the app again** making sure you use a new version of the component.

A build in a app can be triggered by Netlify *(if the host app deployment is managed with Netlify)* or after a PR with the dependency update that eventually can be automatically created by <https://github.com/renovatebot/renovate>

## Stencil

To add a new component run `npm init stencil` and select component option
