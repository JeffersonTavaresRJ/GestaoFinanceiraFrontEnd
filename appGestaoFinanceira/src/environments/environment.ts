// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  IdxConnection:2,
  initRouter:"mov-realizada/new/2015/2024-08-01/2024-08-31",
  arApiUrl: [
    'http://gestaofinanceiraapi/',
    'http://gestaofinanceiraapidsv/',
    'https://localhost:50064/',
    'https://localhost:49852/'],
  credentials:['jef.tavaresrj@gmail.com', 'adminadmin'],
  keyUser:'usuario',
  keyParamListMovPre: 'ParamListMovPre'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
