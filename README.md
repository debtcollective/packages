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
yarn global add lerna
lerna bootstrap
```

Go to the README.md of each package for usage information.
