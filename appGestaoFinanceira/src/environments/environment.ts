// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  IdxConnection:1,
  //initRouter:'/mov-prevista/quitar/5106/2025-01-31T03:00:00Z/2025-01-01/2025-01-31',
  initRouter:'/fechamento',
  arApiUrl: [
    'http://gestaofinanceiraapi/',
    'http://gestaofinanceiraapidsv/',
    'https://localhost:50064/',
    'https://localhost:44375/'],
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