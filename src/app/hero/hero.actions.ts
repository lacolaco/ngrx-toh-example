import { Action } from '@ngrx/store';
import { Hero } from '../hero';

export enum HeroActionTypes {
  SetHeroes = '[Hero] Set Heros',
  SelectHero = '[Hero] Select Hero',
  AddHero = '[Hero] Add Hero',
  DeleteHero = '[Hero] Delete Hero',
  SetSearchedHeroes = '[Hero] Set Searched Heros'
}

export class SetHeros implements Action {
  readonly type = HeroActionTypes.SetHeroes;
  constructor(readonly payload: Hero[]) {}
}

export class SelectHero implements Action {
  readonly type = HeroActionTypes.SelectHero;
  constructor(readonly payload: Hero) {}
}

export class AddHero implements Action {
  readonly type = HeroActionTypes.AddHero;
  constructor(readonly payload: Hero) {}
}

export class DeleteHero implements Action {
  readonly type = HeroActionTypes.DeleteHero;
  constructor(readonly payload: number) {}
}

export class SetSearchedHeroes implements Action {
  readonly type = HeroActionTypes.SetSearchedHeroes;
  constructor(readonly payload: Hero[]) {}
}

export type HeroActions =
  | SetHeros
  | SelectHero
  | AddHero
  | DeleteHero
  | SetSearchedHeroes;
