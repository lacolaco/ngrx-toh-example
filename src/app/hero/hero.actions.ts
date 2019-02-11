import { Action } from '@ngrx/store';
import { Hero } from '../hero';

export enum HeroActionTypes {
  SetHeroes = '[Hero] Set Heros',
  SelectHero = '[Hero] Select Hero'
}

export class SetHeros implements Action {
  readonly type = HeroActionTypes.SetHeroes;
  constructor(readonly payload: Hero[]) {}
}

export class SelectHero implements Action {
  readonly type = HeroActionTypes.SelectHero;
  constructor(readonly payload: Hero) {}
}

export type HeroActions = SetHeros | SelectHero;
