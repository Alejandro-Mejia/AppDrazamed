import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'slideshow',
    pathMatch: 'full'
  },
  {
    path: 'login1',
    loadChildren: () => import('./login1/login1.module').then( m => m.Login1PageModule)
  },
  {
    path: 'login2',
    loadChildren: () => import('./login2/login2.module').then( m => m.Login2PageModule)
  },
  {
    path: 'createaccount',
    loadChildren: () => import('./createaccount/createaccount.module').then( m => m.CreateaccountPageModule)
  },
  {
    path: 'createaccount2',
    loadChildren: () => import('./createaccount2/createaccount2.module').then( m => m.Createaccount2PageModule)
  },
  {
    path: 'forgottenpassword',
    loadChildren: () => import('./forgottenpassword/forgottenpassword.module').then( m => m.ForgottenpasswordPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'medicamentos',
    loadChildren: () => import('./pages/medicamentos/medicamentos.module').then( m => m.MedicamentosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./pages/mensajes/mensajes.module').then( m => m.MensajesPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'acercade',
    loadChildren: () => import('./pages/acercade/acercade.module').then( m => m.AcercadePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'slideshow',
    loadChildren: () => import('./slideshow/slideshow.module').then( m => m.SlideshowPageModule), canActivate: [AutoLoginGuard]
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'resultsearch',
    loadChildren: () => import('./pages/resultsearch/resultsearch.module').then( m => m.ResultsearchPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'avisoprivacidad',
    loadChildren: () => import('./pages/terminos/avisoprivacidad/avisoprivacidad.module').then( m => m.AvisoprivacidadPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'politicagarantia',
    loadChildren: () => import('./pages/terminos/politicagarantia/politicagarantia.module').then( m => m.PoliticagarantiaPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'politicadevolucion',
    loadChildren: () => import('./pages/terminos/politicadevolucion/politicadevolucion.module').then( m => m.PoliticadevolucionPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'politicaretracto',
    loadChildren: () => import('./pages/terminos/politicaretracto/politicaretracto.module').then( m => m.PoliticaretractoPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'manejodatos',
    loadChildren: () => import('./pages/terminos/manejodatos/manejodatos.module').then( m => m.ManejodatosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'mipastillero',
    loadChildren: () => import('./pages/mipastillero/mipastillero.module').then( m => m.MipastilleroPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'misdirecciones',
    loadChildren: () => import('./pages/misdirecciones/misdirecciones.module').then( m => m.MisdireccionesPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'mispedidos',
    loadChildren: () => import('./pages/mispedidos/mispedidos.module').then( m => m.MispedidosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'pedidoscompletados',
    loadChildren: () => import('./pages/pedidoscompletados/pedidoscompletados.module').then( m => m.PedidoscompletadosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'createalarm',
    loadChildren: () => import('./pages/createalarm/createalarm.module').then( m => m.CreatealarmPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'adddirection',
    loadChildren: () => import('./pages/adddirection/adddirection.module').then( m => m.AdddirectionPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'processtreatment',
    loadChildren: () => import('./pages/processtreatment/processtreatment.module').then( m => m.ProcesstreatmentPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'request-open',
    loadChildren: () => import('./pages/request-open/request-open.module').then( m => m.RequestOpenPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'request-closed',
    loadChildren: () => import('./pages/request-closed/request-closed.module').then( m => m.RequestClosedPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'createalarm2',
    loadChildren: () => import('./pages/createalarm2/createalarm2.module').then( m => m.Createalarm2PageModule), canActivate: [AuthGuard]
  },
  {
    path: 'edit-address',
    loadChildren: () => import('./pages/edit-address/edit-address.module').then( m => m.EditAddressPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'edit-alarm',
    loadChildren: () => import('./pages/edit-alarm/edit-alarm.module').then( m => m.EditAlarmPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'prueba',
    loadChildren: () => import('./pages/prueba/prueba.module').then( m => m.PruebaPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'proxima-entrega',
    loadChildren: () => import('./pages/proxima-entrega/proxima-entrega.module').then( m => m.ProximaEntregaPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'fake-home',
    loadChildren: () => import('./pages/fake-home/fake-home.module').then( m => m.FakeHomePageModule)
  },
  {
    path: 'fake-cat',
    loadChildren: () => import('./pages/fake-cat/fake-cat.module').then( m => m.FakeCatPageModule)
  },


















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
