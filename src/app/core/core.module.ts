import { NgModule, Optional, SkipSelf, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpService } from '../shared/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { AnnotationsEffects } from '../store/effects/annotations.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AnnotationsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: isDevMode(),
    }),
  ],
  providers: [HttpService]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error("Core module already added. Should be imported only inside AppModule, once.");
    }
  }
}
