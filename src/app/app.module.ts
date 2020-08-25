import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransferHttpModule, CookieModule, TransferHttpService } from '@gorniv/ngx-universal';
import { ClientStateInterceptor } from '@core/clientstate.interceptor';
import { UniversalStorageService } from '@core/universal-storage.service';
import { UniversalToolService } from '@core/universal-tool.service';
import { AppRouterReuseStrategy } from './app-router.reusestrategy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TransferHttpModule,
    BrowserTransferStateModule,
    CookieModule.forRoot()
  ],
  providers: [
    TransferHttpService,
    { provide: HTTP_INTERCEPTORS, useClass: ClientStateInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: AppRouterReuseStrategy },
    UniversalStorageService,
    UniversalToolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
