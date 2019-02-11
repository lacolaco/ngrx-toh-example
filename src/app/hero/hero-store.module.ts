import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './hero.reducer';

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature('hero', reducer)]
})
export class HeroStoreModule {}
