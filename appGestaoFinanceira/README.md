# AppGestaoFinanceira

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Version
Angular CLI: 12.2.17
Node: 14.15.1
Package Manager: npm 6.14.8
OS: win32 x64

Angular: 12.1.4
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1201.4
@angular-devkit/build-angular   12.1.4
@angular-devkit/core            12.1.4
@angular-devkit/schematics      12.2.17
@angular/cdk                    12.2.13
@angular/cli                    12.2.17
@angular/material               12.2.13
@schematics/angular             12.2.17
rxjs                            6.6.7
typescript                      4.3.5

##Criação de components:
ng g c features/dashboards/receitas-despesas-anual-dashboard

##Configuração postman TEST no Authenticate:
var response =JSON.parse(pm.response.text());
var token = response.user.accessToken;
pm.environment.set('token', token);