# Acurast tzBTC Script

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/acurast/acurast-tzbtc-script.git
   cd acurast-tzbtc-script
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Build the Project

To build the project, run:

```bash
npm run bundle
```

This will generate a file called `index.min.js` in the root directory. This is the file that will be running on the Acurast processors, including all dependencies.

## Deployment

### Running on Acurast Processors

1. You have to go to the Acurast Console located at https://console.acurast.com/. Make sure you are logged in with your manager.

2. Open the "Create Jobs" page

3. Leave the "Protocol" and "Template" settings as is, and paste the contents of `index.min.js` into the "Code" field under "Job Script".

4. Select the deployment parameters like Start time, End time, Interval and Max Reward.

5. Add the Environment Variables defined in `./src/constants/acurast.ts`.

6. Click "Publish Job"

7. Once the processors are matched, make sure to add send the Environment Variables to the processors (this is an extra step in the UI).

## Development

### Run tests

To run tests, run:

```bash
npm run test
```
