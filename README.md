# Playwright actions and tests

This library allows for a structure to use playwright both for tests and as an automation script.

## Requirements

1. [Git](https://git-scm.com/downloads) (test with: `git -v`)
1. [NodeJS](https://nodejs.org/en/) (test with: `npm -v`)

## Installation:

1. Clone the repository `git clone https://github.com/aeq/playwright-actions.git`
1. Change to directory `cd playwright-actions`
1. run `npm i`
1. Run the google Login setup `npx playwright test auth.setup.ts --headed`
1. close the browser

## Commands

1. Initialize Google Login: `npm run init`
1. Show help: `npm run action`
1. Run an action: `npm run action <action-name>` (Example: `npm run action aeq-search`)
1. Run an action with props: `npm run action <action-name> -- --my-prop=true` (Example: `npm run action aeq-search`)
