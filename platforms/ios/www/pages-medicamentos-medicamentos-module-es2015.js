(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-medicamentos-medicamentos-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/medicamentos/medicamentos.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/medicamentos/medicamentos.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\" mode=\"ios\">\n  <div class=\"div-header\">\n  <ion-toolbar class=\"header-styles\">\n    <img class=\"content-image\" src=\"../../assets/img/LOGOS/LOGOS DRAZAMED_Mesa de trabajo 1.png\" alt=\"\">\n  </ion-toolbar>\n    <ion-buttons class=\"btn_i\">\n      <ion-menu-button slot=\"start\" menu=\"main-menu\"></ion-menu-button>\n      <ion-button class=\"carrito\" (click)=\"goCarrito()\">\n        <img src=\"../../assets/img/RECURSOS/iconos drazamed-18.png\" class=\"carro1\">\n      </ion-button>\n      <ion-badge>{{ cartItemCount | async }}</ion-badge>\n    </ion-buttons>\n  </div>\n</ion-header>\n\n<ion-content mode=\"md\">\n  <div class=\"searchbar\">\n      <ion-searchbar  autocomplete=\"on\"debounce=\"2000\" [(ngModel)]=\"searchbarInput\" (ionChange)=\"getItems($event)\" placeholder=\"Busca aquí tus productos\"></ion-searchbar>\n      <ion-list *ngIf=\"isItemAvailable\" class=\"list\">\n        <ion-item  button *ngFor=\"let med of items \" (click)=\"fillSearchbarText(med.value)\">\n          <ion-row class=\"result_search\">\n            <ion-col size=\"3\" class=\"align-self img_product\">\n              <img src={{base_url}}{{apiUrl5}}{{med.imgUrl}} class=\"mx-auto d-block\" width=\"100%\">\n            </ion-col>\n            <ion-col size=\"9\" class=\"align-self\">\n               <p class=\"name_product\">{{med.value}}</p>\n               <p class=\"description_product\">{{med.composition}}</p>\n               <p class=\"price_product\">${{ med.mrp | number}}</p>\n               <p class=\"price_product1\" *ngIf=\" med.units_value !== 0\">{{med.units}} a\n                ${{(med.mrp / med.units_value).toFixed(2)}}</p>\n              <p class=\"price_product1\" *ngIf=\"med.units_value == 0\">{{med.units}} a $0</p>\n                <p *ngIf=\"med.quantity <= 40\" class=\"notavailable\">No disponible</p>\n                <p *ngIf=\"med.quantity > 40\" class=\"available\">Disponible</p>\n              </ion-col>\n          </ion-row>\n        </ion-item>\n      </ion-list>\n    </div>\n  <div class=\"label\">\n    <ion-label class=\"description_product1\" *ngIf=\"!isItemAvailable\">Escribe el producto que necesitas y el buscador te ayudará a encontrarlo, si esta disponible.</ion-label>\n  </div>\n\n  \n  <!--<ion-list>\n    <ion-item button *ngFor=\"let med of meds \" (click)=\"verMed(med.value)\">{{ med.value }}</ion-item>\n</ion-list>-->\n</ion-content>\n\n");

/***/ }),

/***/ "./src/app/pages/medicamentos/medicamentos-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/medicamentos/medicamentos-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: MedicamentosPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicamentosPageRoutingModule", function() { return MedicamentosPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _medicamentos_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./medicamentos.page */ "./src/app/pages/medicamentos/medicamentos.page.ts");




const routes = [
    {
        path: '',
        component: _medicamentos_page__WEBPACK_IMPORTED_MODULE_3__["MedicamentosPage"]
    }
];
let MedicamentosPageRoutingModule = class MedicamentosPageRoutingModule {
};
MedicamentosPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], MedicamentosPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/medicamentos/medicamentos.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/medicamentos/medicamentos.module.ts ***!
  \***********************************************************/
/*! exports provided: MedicamentosPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicamentosPageModule", function() { return MedicamentosPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _medicamentos_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./medicamentos-routing.module */ "./src/app/pages/medicamentos/medicamentos-routing.module.ts");
/* harmony import */ var _medicamentos_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./medicamentos.page */ "./src/app/pages/medicamentos/medicamentos.page.ts");







let MedicamentosPageModule = class MedicamentosPageModule {
};
MedicamentosPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _medicamentos_routing_module__WEBPACK_IMPORTED_MODULE_5__["MedicamentosPageRoutingModule"]
        ],
        declarations: [_medicamentos_page__WEBPACK_IMPORTED_MODULE_6__["MedicamentosPage"]]
    })
], MedicamentosPageModule);



/***/ }),

/***/ "./src/app/pages/medicamentos/medicamentos.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/medicamentos/medicamentos.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".div-header {\n  background-color: #009bd7;\n  padding-bottom: 0.5%;\n}\n\nion-menu-button {\n  color: white;\n  margin-left: 5%;\n}\n\nion-header {\n  --background: #009bd7 !important;\n  --ion-background-color-rgb: 0, 155, 215;\n}\n\n.header-styles {\n  --background: #009bd7 !important;\n  padding-top: 30px;\n  padding-bottom: -100px;\n  text-align: center;\n}\n\n.logo-header {\n  padding-top: 20px;\n  padding-bottom: 20px;\n  width: 50%;\n}\n\nion-content {\n  --ion-background-color: #eeeef1;\n  --ion-background-color-rgb: 236, 235, 238;\n}\n\n.carrito {\n  width: 14%;\n  height: 14%;\n  border-radius: 100% !important;\n  margin-left: 65%;\n  margin-bottom: 2% !important;\n}\n\n.content-image {\n  max-width: 60%;\n  border: 0;\n}\n\nion-searchbar {\n  --icon-color: #fff;\n  --background: #00a2dd !important;\n  --border-radius: 20px !important;\n  --placeholder-color: #fff !important;\n  --placeholder-opacity: 1;\n}\n\n.searchbar {\n  margin-top: -5px !important;\n  padding-top: 5px !important;\n}\n\n.description_product1 {\n  color: #727070 !important;\n  line-height: 18px !important;\n  text-align: center !important;\n  margin-right: 10px !important;\n  margin-left: 10px !important;\n  display: flex;\n  margin: auto;\n}\n\nion-badge {\n  color: #046a8f;\n  position: absolute;\n  --border-radius: 200%;\n  top: 2px;\n  right: 9px;\n  --background: #c9c9c9;\n  width: 28px;\n  height: 20px;\n  font-size: 16px;\n}\n\n.btn_i {\n  padding-top: 5px;\n}\n\n@media (min-width: 400px) and (max-width: 417px) {\n  ion-badge {\n    color: #046a8f;\n    position: absolute;\n    --border-radius: 200%;\n    top: 2px;\n    right: 9px;\n    --background: #c9c9c9;\n    width: 28px;\n    height: 20px;\n    font-size: 16px;\n  }\n}\n\n@media (min-width: 320px) and (max-width: 336px) {\n  ion-badge {\n    color: #046a8f;\n    position: absolute;\n    --border-radius: 200%;\n    top: -1px;\n    right: 5px;\n    --background: #c9c9c9;\n    width: 24px;\n    height: 20px;\n    font-size: 16px;\n  }\n}\n\n@media (min-width: 337px) and (max-width: 350px) {\n  ion-badge {\n    color: #046a8f;\n    position: absolute;\n    --border-radius: 200%;\n    top: -1px;\n    right: 10px;\n    --background: #c9c9c9;\n    width: 24px;\n    height: 20px;\n    font-size: 16px;\n  }\n}\n\n.result_search {\n  background: #f2f2f2 !important;\n  padding: 20px 0px !important;\n  margin-bottom: 15px;\n  width: 100%;\n}\n\n.align-self {\n  align-self: center !important;\n}\n\n.img_product {\n  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1) !important;\n  padding: 10px !important;\n  border-radius: 30px !important;\n  background-color: #fff !important;\n}\n\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.d-block {\n  display: block;\n}\n\n.price_product {\n  font-size: 21px !important;\n  font-weight: 700 !important;\n  color: #727070 !important;\n  margin: 0px !important;\n}\n\n.price_product1 {\n  font-size: 16px !important;\n  font-weight: 700 !important;\n  color: #727070 !important;\n  margin: 0px !important;\n}\n\n.name_product {\n  font-size: 19px !important;\n  font-weight: 700 !important;\n  color: #727070 !important;\n  margin: 5px 0px !important;\n  line-height: 20px !important;\n}\n\n.description_product {\n  font-size: 17px !important;\n  color: #727070 !important;\n  line-height: 18px !important;\n  margin: 5px 0px !important;\n}\n\n.available {\n  font-size: 17px !important;\n  color: #008000 !important;\n  line-height: 18px !important;\n  margin: 5px 0px !important;\n}\n\n.notavailable {\n  font-size: 17px !important;\n  color: #ff0000 !important;\n  line-height: 18px !important;\n  margin: 5px 0px !important;\n}\n\n.list {\n  width: 100%;\n}\n\n@media (min-width: 600px) and (min-height: 950px) {\n  .header-styles {\n    --background: #009bd7 !important;\n    padding-top: 0px;\n    padding-bottom: 10px;\n    text-align: center;\n  }\n\n  .content-image {\n    height: 110px;\n  }\n\n  .carro1 {\n    max-width: 68%;\n    border: 0;\n    margin-right: -41px;\n  }\n\n  ion-badge {\n    color: #046a8f;\n    position: absolute;\n    --border-radius: 200%;\n    top: -1px;\n    right: 39px;\n    --background: #c9c9c9;\n    width: 45px;\n    height: 29px;\n    font-size: 25px;\n  }\n\n  ion-menu-button {\n    color: white;\n    margin-left: 5%;\n    font-size: 50px !important;\n  }\n\n  .description_product1 {\n    color: #727070 !important;\n    line-height: 34px !important;\n    text-align: center !important;\n    margin-right: 10px !important;\n    margin-left: 10px !important;\n    display: flex;\n    margin: auto;\n    font-size: 30px;\n  }\n\n  .name_product {\n    font-size: 26px !important;\n    font-weight: 700 !important;\n    color: #727070 !important;\n    margin: 5px 0px !important;\n    line-height: 30px !important;\n  }\n\n  .description_product {\n    font-size: 24px !important;\n    color: #727070 !important;\n    line-height: 18px !important;\n    margin: 10px 0px !important;\n  }\n\n  .price_product {\n    font-size: 29px !important;\n    font-weight: 700 !important;\n    color: #727070 !important;\n    margin: 0px !important;\n  }\n\n  .price_product1 {\n    font-size: 21px !important;\n    font-weight: 700 !important;\n    color: #727070 !important;\n    margin: 0px !important;\n  }\n\n  .available {\n    font-size: 25px !important;\n    color: #008000 !important;\n    line-height: 18px !important;\n    margin: 10px 0px !important;\n  }\n\n  .notavailable {\n    font-size: 25px !important;\n    color: #ff0000 !important;\n    line-height: 18px !important;\n    margin: 10px 0px !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91c2VyMTk3Mzk2L0FwcERyYXphbWVkL3NyYy9hcHAvcGFnZXMvbWVkaWNhbWVudG9zL21lZGljYW1lbnRvcy5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL21lZGljYW1lbnRvcy9tZWRpY2FtZW50b3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQUE7RUFDQSxvQkFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUNDRjs7QURDQTtFQUNFLGdDQUFBO0VBQ0EsdUNBQUE7QUNFRjs7QURDQTtFQUNFLGdDQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0FDRUY7O0FEQ0E7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsVUFBQTtBQ0VGOztBRENBO0VBQ0UsK0JBQUE7RUFDQSx5Q0FBQTtBQ0VGOztBREFBO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUNHRjs7QUREQTtFQUNFLGNBQUE7RUFDQSxTQUFBO0FDSUY7O0FERkE7RUFDRSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxvQ0FBQTtFQUNBLHdCQUFBO0FDS0Y7O0FESEE7RUFDRSwyQkFBQTtFQUNBLDJCQUFBO0FDTUY7O0FESkE7RUFDRSx5QkFBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFDQSw2QkFBQTtFQUNBLDRCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUNPRjs7QURMQTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQ1FGOztBRE5BO0VBQ0UsZ0JBQUE7QUNTRjs7QURQQTtFQUNFO0lBQ0UsY0FBQTtJQUNGLGtCQUFBO0lBQ0EscUJBQUE7SUFDQSxRQUFBO0lBQ0EsVUFBQTtJQUNBLHFCQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxlQUFBO0VDVUE7QUFDRjs7QURSQTtFQUNFO0lBQ0UsY0FBQTtJQUNBLGtCQUFBO0lBQ0EscUJBQUE7SUFDQSxTQUFBO0lBQ0EsVUFBQTtJQUNBLHFCQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxlQUFBO0VDVUY7QUFDRjs7QURSQTtFQUNFO0lBQ0UsY0FBQTtJQUNBLGtCQUFBO0lBQ0EscUJBQUE7SUFDQSxTQUFBO0lBQ0EsV0FBQTtJQUNBLHFCQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxlQUFBO0VDVUY7QUFDRjs7QURSQTtFQUNFLDhCQUFBO0VBQ0EsNEJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUNVRjs7QURSQTtFQUNFLDZCQUFBO0FDV0Y7O0FEUkE7RUFDRSxzREFBQTtFQUNBLHdCQUFBO0VBQ0EsOEJBQUE7RUFDQSxpQ0FBQTtBQ1dGOztBRFRBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtBQ1lGOztBRFZBO0VBQ0UsY0FBQTtBQ2FGOztBRFhBO0VBQ0UsMEJBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7QUNjRjs7QURaQTtFQUNFLDBCQUFBO0VBQ0EsMkJBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0FDZUY7O0FEYkE7RUFDRSwwQkFBQTtFQUNBLDJCQUFBO0VBQ0EseUJBQUE7RUFDQSwwQkFBQTtFQUNBLDRCQUFBO0FDZ0JGOztBRGRBO0VBQ0UsMEJBQUE7RUFDQSx5QkFBQTtFQUNBLDRCQUFBO0VBQ0EsMEJBQUE7QUNpQkY7O0FEZkE7RUFDRSwwQkFBQTtFQUNBLHlCQUFBO0VBQ0EsNEJBQUE7RUFDQSwwQkFBQTtBQ2tCRjs7QURoQkE7RUFDRSwwQkFBQTtFQUNBLHlCQUFBO0VBQ0EsNEJBQUE7RUFDQSwwQkFBQTtBQ21CRjs7QURqQkE7RUFDRSxXQUFBO0FDb0JGOztBRGxCQTtFQUNFO0lBQ0UsZ0NBQUE7SUFDQSxnQkFBQTtJQUNBLG9CQUFBO0lBQ0Esa0JBQUE7RUNxQkY7O0VEbkJBO0lBQ0UsYUFBQTtFQ3NCRjs7RURwQkE7SUFDRSxjQUFBO0lBQ0EsU0FBQTtJQUNBLG1CQUFBO0VDdUJGOztFRHJCQTtJQUNFLGNBQUE7SUFDQSxrQkFBQTtJQUNBLHFCQUFBO0lBQ0EsU0FBQTtJQUNBLFdBQUE7SUFDQSxxQkFBQTtJQUNBLFdBQUE7SUFDQSxZQUFBO0lBQ0EsZUFBQTtFQ3dCRjs7RUR0QkE7SUFDRSxZQUFBO0lBQ0EsZUFBQTtJQUNBLDBCQUFBO0VDeUJGOztFRHZCQTtJQUNFLHlCQUFBO0lBQ0EsNEJBQUE7SUFDQSw2QkFBQTtJQUNBLDZCQUFBO0lBQ0EsNEJBQUE7SUFDQSxhQUFBO0lBQ0EsWUFBQTtJQUNBLGVBQUE7RUMwQkY7O0VEeEJBO0lBQ0UsMEJBQUE7SUFDQSwyQkFBQTtJQUNBLHlCQUFBO0lBQ0EsMEJBQUE7SUFDQSw0QkFBQTtFQzJCRjs7RUR6QkE7SUFDRSwwQkFBQTtJQUNBLHlCQUFBO0lBQ0EsNEJBQUE7SUFDQSwyQkFBQTtFQzRCRjs7RUQxQkE7SUFDRSwwQkFBQTtJQUNBLDJCQUFBO0lBQ0EseUJBQUE7SUFDQSxzQkFBQTtFQzZCRjs7RUQzQkE7SUFDRSwwQkFBQTtJQUNBLDJCQUFBO0lBQ0EseUJBQUE7SUFDQSxzQkFBQTtFQzhCRjs7RUQ1QkE7SUFDRSwwQkFBQTtJQUNBLHlCQUFBO0lBQ0EsNEJBQUE7SUFDQSwyQkFBQTtFQytCRjs7RUQ3QkE7SUFDRSwwQkFBQTtJQUNBLHlCQUFBO0lBQ0EsNEJBQUE7SUFDQSwyQkFBQTtFQ2dDRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbWVkaWNhbWVudG9zL21lZGljYW1lbnRvcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGl2LWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDliZDc7XG4gIHBhZGRpbmctYm90dG9tOiAwLjUlO1xufVxuXG5pb24tbWVudS1idXR0b24ge1xuICBjb2xvcjogd2hpdGU7XG4gIG1hcmdpbi1sZWZ0OiA1JTtcbn1cbmlvbi1oZWFkZXIge1xuICAtLWJhY2tncm91bmQ6ICMwMDliZDcgIWltcG9ydGFudDtcbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvci1yZ2I6IDAsIDE1NSwgMjE1O1xufVxuXG4uaGVhZGVyLXN0eWxlcyB7XG4gIC0tYmFja2dyb3VuZDogIzAwOWJkNyAhaW1wb3J0YW50O1xuICBwYWRkaW5nLXRvcDogMzBweDtcbiAgcGFkZGluZy1ib3R0b206IC0xMDBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ubG9nby1oZWFkZXIge1xuICBwYWRkaW5nLXRvcDogMjBweDtcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gIHdpZHRoOiA1MCU7XG59XG5cbmlvbi1jb250ZW50IHtcbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvcjogI2VlZWVmMTtcbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvci1yZ2I6IDIzNiwgMjM1LCAyMzg7XG59XG4uY2Fycml0byB7XG4gIHdpZHRoOiAxNCU7XG4gIGhlaWdodDogMTQlO1xuICBib3JkZXItcmFkaXVzOiAxMDAlICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1sZWZ0OiA2NSU7XG4gIG1hcmdpbi1ib3R0b206IDIlICFpbXBvcnRhbnQ7XG59XG4uY29udGVudC1pbWFnZSB7XG4gIG1heC13aWR0aDogNjAlO1xuICBib3JkZXI6IDA7XG59XG5pb24tc2VhcmNoYmFyIHtcbiAgLS1pY29uLWNvbG9yOiAjZmZmO1xuICAtLWJhY2tncm91bmQ6ICMwMGEyZGQgIWltcG9ydGFudDtcbiAgLS1ib3JkZXItcmFkaXVzOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIC0tcGxhY2Vob2xkZXItY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbiAgLS1wbGFjZWhvbGRlci1vcGFjaXR5OiAxO1xufVxuLnNlYXJjaGJhciB7XG4gIG1hcmdpbi10b3A6IC01cHggIWltcG9ydGFudDtcbiAgcGFkZGluZy10b3A6IDVweCAhaW1wb3J0YW50O1xufVxuLmRlc2NyaXB0aW9uX3Byb2R1Y3QxIHtcbiAgY29sb3I6ICM3MjcwNzAgIWltcG9ydGFudDtcbiAgbGluZS1oZWlnaHQ6IDE4cHggIWltcG9ydGFudDtcbiAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1yaWdodDogMTBweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tbGVmdDogMTBweCAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW46IGF1dG87XG59XG5pb24tYmFkZ2Uge1xuICBjb2xvcjogIzA0NmE4ZjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICAtLWJvcmRlci1yYWRpdXM6IDIwMCU7XG4gIHRvcDogMnB4O1xuICByaWdodDogOXB4O1xuICAtLWJhY2tncm91bmQ6ICNjOWM5Yzk7XG4gIHdpZHRoOiAyOHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cbi5idG5faSB7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNDAwcHgpIGFuZCAobWF4LXdpZHRoOiA0MTdweCkge1xuICBpb24tYmFkZ2Uge1xuICAgIGNvbG9yOiAjMDQ2YThmO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIC0tYm9yZGVyLXJhZGl1czogMjAwJTtcbiAgdG9wOiAycHg7XG4gIHJpZ2h0OiA5cHg7XG4gIC0tYmFja2dyb3VuZDogI2M5YzljOTtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjBweDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICB9XG59XG5AbWVkaWEgKG1pbi13aWR0aDogMzIwcHgpIGFuZCAobWF4LXdpZHRoOiAzMzZweCkge1xuICBpb24tYmFkZ2Uge1xuICAgIGNvbG9yOiAjMDQ2YThmO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDIwMCU7XG4gICAgdG9wOiAtMXB4O1xuICAgIHJpZ2h0OiA1cHg7XG4gICAgLS1iYWNrZ3JvdW5kOiAjYzljOWM5O1xuICAgIHdpZHRoOiAyNHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiAzMzdweCkgYW5kIChtYXgtd2lkdGg6IDM1MHB4KSB7XG4gIGlvbi1iYWRnZSB7XG4gICAgY29sb3I6ICMwNDZhOGY7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIC0tYm9yZGVyLXJhZGl1czogMjAwJTtcbiAgICB0b3A6IC0xcHg7XG4gICAgcmlnaHQ6IDEwcHg7XG4gICAgLS1iYWNrZ3JvdW5kOiAjYzljOWM5O1xuICAgIHdpZHRoOiAyNHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cbn1cbi5yZXN1bHRfc2VhcmNoIHtcbiAgYmFja2dyb3VuZDogI2YyZjJmMiAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAyMHB4IDBweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICB3aWR0aDogMTAwJTtcbn1cbi5hbGlnbi1zZWxmIHtcbiAgYWxpZ24tc2VsZjogY2VudGVyICFpbXBvcnRhbnQ7XG4gIC8vIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5pbWdfcHJvZHVjdCB7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMjVweCByZ2JhKDAsIDAsIDAsIDAuMSkgIWltcG9ydGFudDtcbiAgcGFkZGluZzogMTBweCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAzMHB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbn1cbi5teC1hdXRvIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbn1cbi5kLWJsb2NrIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4ucHJpY2VfcHJvZHVjdCB7XG4gIGZvbnQtc2l6ZTogMjFweCAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogNzAwICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjNzI3MDcwICFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7XG59XG4ucHJpY2VfcHJvZHVjdDEge1xuICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDcwMCAhaW1wb3J0YW50O1xuICBjb2xvcjogIzcyNzA3MCAhaW1wb3J0YW50O1xuICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xufVxuLm5hbWVfcHJvZHVjdCB7XG4gIGZvbnQtc2l6ZTogMTlweCAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogNzAwICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjNzI3MDcwICFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogNXB4IDBweCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogMjBweCAhaW1wb3J0YW50O1xufVxuLmRlc2NyaXB0aW9uX3Byb2R1Y3Qge1xuICBmb250LXNpemU6IDE3cHggIWltcG9ydGFudDtcbiAgY29sb3I6ICM3MjcwNzAgIWltcG9ydGFudDtcbiAgbGluZS1oZWlnaHQ6IDE4cHggIWltcG9ydGFudDtcbiAgbWFyZ2luOiA1cHggMHB4ICFpbXBvcnRhbnQ7XG59XG4uYXZhaWxhYmxlIHtcbiAgZm9udC1zaXplOiAxN3B4ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjMDA4MDAwICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogNXB4IDBweCAhaW1wb3J0YW50O1xufVxuLm5vdGF2YWlsYWJsZSB7XG4gIGZvbnQtc2l6ZTogMTdweCAhaW1wb3J0YW50O1xuICBjb2xvcjogI2ZmMDAwMCAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogMThweCAhaW1wb3J0YW50O1xuICBtYXJnaW46IDVweCAwcHggIWltcG9ydGFudDtcbn1cbi5saXN0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5AbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIGFuZCAobWluLWhlaWdodDogOTUwcHgpIHtcbiAgLmhlYWRlci1zdHlsZXMge1xuICAgIC0tYmFja2dyb3VuZDogIzAwOWJkNyAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctdG9wOiAwcHg7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIC5jb250ZW50LWltYWdlIHtcbiAgICBoZWlnaHQ6IDExMHB4O1xuICB9XG4gIC5jYXJybzEge1xuICAgIG1heC13aWR0aDogNjglO1xuICAgIGJvcmRlcjogMDtcbiAgICBtYXJnaW4tcmlnaHQ6IC00MXB4O1xuICB9XG4gIGlvbi1iYWRnZSB7XG4gICAgY29sb3I6ICMwNDZhOGY7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIC0tYm9yZGVyLXJhZGl1czogMjAwJTtcbiAgICB0b3A6IC0xcHg7XG4gICAgcmlnaHQ6IDM5cHg7XG4gICAgLS1iYWNrZ3JvdW5kOiAjYzljOWM5O1xuICAgIHdpZHRoOiA0NXB4O1xuICAgIGhlaWdodDogMjlweDtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cbiAgaW9uLW1lbnUtYnV0dG9uIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgbWFyZ2luLWxlZnQ6IDUlO1xuICAgIGZvbnQtc2l6ZTogNTBweCAhaW1wb3J0YW50O1xuICB9XG4gIC5kZXNjcmlwdGlvbl9wcm9kdWN0MSB7XG4gICAgY29sb3I6ICM3MjcwNzAgIWltcG9ydGFudDtcbiAgICBsaW5lLWhlaWdodDogMzRweCAhaW1wb3J0YW50O1xuICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1yaWdodDogMTBweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1sZWZ0OiAxMHB4ICFpbXBvcnRhbnQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICB9XG4gIC5uYW1lX3Byb2R1Y3Qge1xuICAgIGZvbnQtc2l6ZTogMjZweCAhaW1wb3J0YW50O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDAgIWltcG9ydGFudDtcbiAgICBjb2xvcjogIzcyNzA3MCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogNXB4IDBweCAhaW1wb3J0YW50O1xuICAgIGxpbmUtaGVpZ2h0OiAzMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbiAgLmRlc2NyaXB0aW9uX3Byb2R1Y3Qge1xuICAgIGZvbnQtc2l6ZTogMjRweCAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiAjNzI3MDcwICFpbXBvcnRhbnQ7XG4gICAgbGluZS1oZWlnaHQ6IDE4cHggIWltcG9ydGFudDtcbiAgICBtYXJnaW46IDEwcHggMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbiAgLnByaWNlX3Byb2R1Y3Qge1xuICAgIGZvbnQtc2l6ZTogMjlweCAhaW1wb3J0YW50O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDAgIWltcG9ydGFudDtcbiAgICBjb2xvcjogIzcyNzA3MCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbiAgLnByaWNlX3Byb2R1Y3QxIHtcbiAgICBmb250LXNpemU6IDIxcHggIWltcG9ydGFudDtcbiAgICBmb250LXdlaWdodDogNzAwICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICM3MjcwNzAgIWltcG9ydGFudDtcbiAgICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuICB9XG4gIC5hdmFpbGFibGUge1xuICAgIGZvbnQtc2l6ZTogMjVweCAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiAjMDA4MDAwICFpbXBvcnRhbnQ7XG4gICAgbGluZS1oZWlnaHQ6IDE4cHggIWltcG9ydGFudDtcbiAgICBtYXJnaW46IDEwcHggMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbiAgLm5vdGF2YWlsYWJsZSB7XG4gICAgZm9udC1zaXplOiAyNXB4ICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICNmZjAwMDAgIWltcG9ydGFudDtcbiAgICBsaW5lLWhlaWdodDogMThweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMTBweCAwcHggIWltcG9ydGFudDtcbiAgfVxufVxuIiwiLmRpdi1oZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA5YmQ3O1xuICBwYWRkaW5nLWJvdHRvbTogMC41JTtcbn1cblxuaW9uLW1lbnUtYnV0dG9uIHtcbiAgY29sb3I6IHdoaXRlO1xuICBtYXJnaW4tbGVmdDogNSU7XG59XG5cbmlvbi1oZWFkZXIge1xuICAtLWJhY2tncm91bmQ6ICMwMDliZDcgIWltcG9ydGFudDtcbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvci1yZ2I6IDAsIDE1NSwgMjE1O1xufVxuXG4uaGVhZGVyLXN0eWxlcyB7XG4gIC0tYmFja2dyb3VuZDogIzAwOWJkNyAhaW1wb3J0YW50O1xuICBwYWRkaW5nLXRvcDogMzBweDtcbiAgcGFkZGluZy1ib3R0b206IC0xMDBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ubG9nby1oZWFkZXIge1xuICBwYWRkaW5nLXRvcDogMjBweDtcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gIHdpZHRoOiA1MCU7XG59XG5cbmlvbi1jb250ZW50IHtcbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvcjogI2VlZWVmMTtcbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvci1yZ2I6IDIzNiwgMjM1LCAyMzg7XG59XG5cbi5jYXJyaXRvIHtcbiAgd2lkdGg6IDE0JTtcbiAgaGVpZ2h0OiAxNCU7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCUgIWltcG9ydGFudDtcbiAgbWFyZ2luLWxlZnQ6IDY1JTtcbiAgbWFyZ2luLWJvdHRvbTogMiUgIWltcG9ydGFudDtcbn1cblxuLmNvbnRlbnQtaW1hZ2Uge1xuICBtYXgtd2lkdGg6IDYwJTtcbiAgYm9yZGVyOiAwO1xufVxuXG5pb24tc2VhcmNoYmFyIHtcbiAgLS1pY29uLWNvbG9yOiAjZmZmO1xuICAtLWJhY2tncm91bmQ6ICMwMGEyZGQgIWltcG9ydGFudDtcbiAgLS1ib3JkZXItcmFkaXVzOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIC0tcGxhY2Vob2xkZXItY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbiAgLS1wbGFjZWhvbGRlci1vcGFjaXR5OiAxO1xufVxuXG4uc2VhcmNoYmFyIHtcbiAgbWFyZ2luLXRvcDogLTVweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nLXRvcDogNXB4ICFpbXBvcnRhbnQ7XG59XG5cbi5kZXNjcmlwdGlvbl9wcm9kdWN0MSB7XG4gIGNvbG9yOiAjNzI3MDcwICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4ICFpbXBvcnRhbnQ7XG4gIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHggIWltcG9ydGFudDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHggIWltcG9ydGFudDtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG5pb24tYmFkZ2Uge1xuICBjb2xvcjogIzA0NmE4ZjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICAtLWJvcmRlci1yYWRpdXM6IDIwMCU7XG4gIHRvcDogMnB4O1xuICByaWdodDogOXB4O1xuICAtLWJhY2tncm91bmQ6ICNjOWM5Yzk7XG4gIHdpZHRoOiAyOHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLmJ0bl9pIHtcbiAgcGFkZGluZy10b3A6IDVweDtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDQwMHB4KSBhbmQgKG1heC13aWR0aDogNDE3cHgpIHtcbiAgaW9uLWJhZGdlIHtcbiAgICBjb2xvcjogIzA0NmE4ZjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAyMDAlO1xuICAgIHRvcDogMnB4O1xuICAgIHJpZ2h0OiA5cHg7XG4gICAgLS1iYWNrZ3JvdW5kOiAjYzljOWM5O1xuICAgIHdpZHRoOiAyOHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiAzMjBweCkgYW5kIChtYXgtd2lkdGg6IDMzNnB4KSB7XG4gIGlvbi1iYWRnZSB7XG4gICAgY29sb3I6ICMwNDZhOGY7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIC0tYm9yZGVyLXJhZGl1czogMjAwJTtcbiAgICB0b3A6IC0xcHg7XG4gICAgcmlnaHQ6IDVweDtcbiAgICAtLWJhY2tncm91bmQ6ICNjOWM5Yzk7XG4gICAgd2lkdGg6IDI0cHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuQG1lZGlhIChtaW4td2lkdGg6IDMzN3B4KSBhbmQgKG1heC13aWR0aDogMzUwcHgpIHtcbiAgaW9uLWJhZGdlIHtcbiAgICBjb2xvcjogIzA0NmE4ZjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAyMDAlO1xuICAgIHRvcDogLTFweDtcbiAgICByaWdodDogMTBweDtcbiAgICAtLWJhY2tncm91bmQ6ICNjOWM5Yzk7XG4gICAgd2lkdGg6IDI0cHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuLnJlc3VsdF9zZWFyY2gge1xuICBiYWNrZ3JvdW5kOiAjZjJmMmYyICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmc6IDIwcHggMHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uYWxpZ24tc2VsZiB7XG4gIGFsaWduLXNlbGY6IGNlbnRlciAhaW1wb3J0YW50O1xufVxuXG4uaW1nX3Byb2R1Y3Qge1xuICBib3gtc2hhZG93OiAwcHggMHB4IDI1cHggcmdiYSgwLCAwLCAwLCAwLjEpICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmc6IDEwcHggIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMzBweCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XG59XG5cbi5teC1hdXRvIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbn1cblxuLmQtYmxvY2sge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLnByaWNlX3Byb2R1Y3Qge1xuICBmb250LXNpemU6IDIxcHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDcwMCAhaW1wb3J0YW50O1xuICBjb2xvcjogIzcyNzA3MCAhaW1wb3J0YW50O1xuICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xufVxuXG4ucHJpY2VfcHJvZHVjdDEge1xuICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDcwMCAhaW1wb3J0YW50O1xuICBjb2xvcjogIzcyNzA3MCAhaW1wb3J0YW50O1xuICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xufVxuXG4ubmFtZV9wcm9kdWN0IHtcbiAgZm9udC1zaXplOiAxOXB4ICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA3MDAgIWltcG9ydGFudDtcbiAgY29sb3I6ICM3MjcwNzAgIWltcG9ydGFudDtcbiAgbWFyZ2luOiA1cHggMHB4ICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5kZXNjcmlwdGlvbl9wcm9kdWN0IHtcbiAgZm9udC1zaXplOiAxN3B4ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjNzI3MDcwICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogNXB4IDBweCAhaW1wb3J0YW50O1xufVxuXG4uYXZhaWxhYmxlIHtcbiAgZm9udC1zaXplOiAxN3B4ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjMDA4MDAwICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogNXB4IDBweCAhaW1wb3J0YW50O1xufVxuXG4ubm90YXZhaWxhYmxlIHtcbiAgZm9udC1zaXplOiAxN3B4ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogNXB4IDBweCAhaW1wb3J0YW50O1xufVxuXG4ubGlzdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNjAwcHgpIGFuZCAobWluLWhlaWdodDogOTUwcHgpIHtcbiAgLmhlYWRlci1zdHlsZXMge1xuICAgIC0tYmFja2dyb3VuZDogIzAwOWJkNyAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctdG9wOiAwcHg7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLmNvbnRlbnQtaW1hZ2Uge1xuICAgIGhlaWdodDogMTEwcHg7XG4gIH1cblxuICAuY2Fycm8xIHtcbiAgICBtYXgtd2lkdGg6IDY4JTtcbiAgICBib3JkZXI6IDA7XG4gICAgbWFyZ2luLXJpZ2h0OiAtNDFweDtcbiAgfVxuXG4gIGlvbi1iYWRnZSB7XG4gICAgY29sb3I6ICMwNDZhOGY7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIC0tYm9yZGVyLXJhZGl1czogMjAwJTtcbiAgICB0b3A6IC0xcHg7XG4gICAgcmlnaHQ6IDM5cHg7XG4gICAgLS1iYWNrZ3JvdW5kOiAjYzljOWM5O1xuICAgIHdpZHRoOiA0NXB4O1xuICAgIGhlaWdodDogMjlweDtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cblxuICBpb24tbWVudS1idXR0b24ge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBtYXJnaW4tbGVmdDogNSU7XG4gICAgZm9udC1zaXplOiA1MHB4ICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuZGVzY3JpcHRpb25fcHJvZHVjdDEge1xuICAgIGNvbG9yOiAjNzI3MDcwICFpbXBvcnRhbnQ7XG4gICAgbGluZS1oZWlnaHQ6IDM0cHggIWltcG9ydGFudDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHggIWltcG9ydGFudDtcbiAgICBtYXJnaW4tbGVmdDogMTBweCAhaW1wb3J0YW50O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgfVxuXG4gIC5uYW1lX3Byb2R1Y3Qge1xuICAgIGZvbnQtc2l6ZTogMjZweCAhaW1wb3J0YW50O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDAgIWltcG9ydGFudDtcbiAgICBjb2xvcjogIzcyNzA3MCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogNXB4IDBweCAhaW1wb3J0YW50O1xuICAgIGxpbmUtaGVpZ2h0OiAzMHB4ICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuZGVzY3JpcHRpb25fcHJvZHVjdCB7XG4gICAgZm9udC1zaXplOiAyNHB4ICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICM3MjcwNzAgIWltcG9ydGFudDtcbiAgICBsaW5lLWhlaWdodDogMThweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMTBweCAwcHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5wcmljZV9wcm9kdWN0IHtcbiAgICBmb250LXNpemU6IDI5cHggIWltcG9ydGFudDtcbiAgICBmb250LXdlaWdodDogNzAwICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICM3MjcwNzAgIWltcG9ydGFudDtcbiAgICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLnByaWNlX3Byb2R1Y3QxIHtcbiAgICBmb250LXNpemU6IDIxcHggIWltcG9ydGFudDtcbiAgICBmb250LXdlaWdodDogNzAwICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICM3MjcwNzAgIWltcG9ydGFudDtcbiAgICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmF2YWlsYWJsZSB7XG4gICAgZm9udC1zaXplOiAyNXB4ICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6ICMwMDgwMDAgIWltcG9ydGFudDtcbiAgICBsaW5lLWhlaWdodDogMThweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMTBweCAwcHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5ub3RhdmFpbGFibGUge1xuICAgIGZvbnQtc2l6ZTogMjVweCAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiAjZmYwMDAwICFpbXBvcnRhbnQ7XG4gICAgbGluZS1oZWlnaHQ6IDE4cHggIWltcG9ydGFudDtcbiAgICBtYXJnaW46IDEwcHggMHB4ICFpbXBvcnRhbnQ7XG4gIH1cbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/medicamentos/medicamentos.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/medicamentos/medicamentos.page.ts ***!
  \*********************************************************/
/*! exports provided: MedicamentosPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MedicamentosPage", function() { return MedicamentosPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/cart.service */ "./src/app/services/cart.service.ts");
/* harmony import */ var src_app_services_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/config.service */ "./src/app/services/config.service.ts");







let MedicamentosPage = class MedicamentosPage {
    constructor(menuCtrl, router, http, cartService, config, route) {
        this.menuCtrl = menuCtrl;
        this.router = router;
        this.http = http;
        this.cartService = cartService;
        this.config = config;
        this.route = route;
        this.itemSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.isItemAvailable = false;
        this.apiURL = `medicine/load-medicine-web/1?term=`;
        this.apiUrl7 = `images/products/`;
        this.apiUrl5 = ``;
        this.apiUrl8 = `.jpg`;
        this.fromProx = false;
        this.apiURL2 = `medicine/load-medicine-web/0?n=`;
        console.log(config.get_base_url());
        this.base_url = config.get_base_url();
        this.cartItemCount = this.cartService.getCartItemCount();
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.fromProx = this.router.getCurrentNavigation().extras.state.fromProx;
            }
        });
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        this.menuCtrl.enable(true);
        console.log(': ', this.fromProx);
    }
    ionViewWillLeave() {
        this.fromProx = false;
    }
    goCarrito() {
        this.router.navigate(['carrito']);
    }
    getItems(ev) {
        // Reset items back to all of the items
        // set val to the value of the searchbar
        const val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() !== '') {
            this.isItemAvailable = true;
            this.http.get(`${this.base_url}${this.apiURL}${val}`).subscribe((response) => {
                this.meds = response;
                this.items = this.meds;
            });
        }
        else {
            this.isItemAvailable = false;
        }
    }
    fillSearchbarText(item) {
        this.searchbarInput = item;
        this.isItemAvailable = false;
        this.itemSelected.emit(item);
        console.log(item);
        this.http.get(`${this.base_url}${this.apiURL2}${item}`).subscribe((res) => {
            this.fullmed = res;
            this.fullmed1 = this.fullmed.data;
            this.fullmed2 = this.fullmed.data[0].is_pres_required;
            let navigationExtras = {
                state: {
                    user: this.fullmed1,
                    formula: this.fullmed2,
                    fromProx: this.fromProx
                }
            };
            this.router.navigate(['resultsearch'], navigationExtras);
        });
        this.searchbarInput = '';
    }
};
MedicamentosPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
    { type: src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_5__["CartService"] },
    { type: src_app_services_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], MedicamentosPage.prototype, "itemSelected", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchBarInput', { static: true })
], MedicamentosPage.prototype, "searchbarInput", void 0);
MedicamentosPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-medicamentos',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./medicamentos.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/medicamentos/medicamentos.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./medicamentos.page.scss */ "./src/app/pages/medicamentos/medicamentos.page.scss")).default]
    })
], MedicamentosPage);



/***/ })

}]);
//# sourceMappingURL=pages-medicamentos-medicamentos-module-es2015.js.map