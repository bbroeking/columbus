// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  network: "http://localhost:8545",
  contract: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
  alchemy: '',
  // network: "rinkeby",  // need to deploy this on a test network for now TODO
  // contract: '0x450FfBFa1F45ff9017E535870c4584f9E0346de8',
  // alchemy: 'iFl5CtBte3nwksEjkMlZpRMIMYkqnjP3',
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebase: {
    apiKey: "AIzaSyBCu8y8ME96NAcULBgSK15EK_xE6ozfV1k",
    authDomain: "columbus-313520.firebaseapp.com",
    projectId: "columbus-313520",
    storageBucket: "columbus-313520.appspot.com",
    messagingSenderId: "799616935280",
    appId: "1:799616935280:web:7ac8b53a387ce0c9a95bb5",
    measurementId: "G-MW4KS5LFQH"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
