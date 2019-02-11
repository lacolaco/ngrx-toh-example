import { Action } from '@ngrx/store';
import { Hero } from '../hero';

export enum HeroActionTypes {
  SetHeroes = '[Hero] Set Heros',
  AddHero = '[Hero] Add Hero',
  DeleteHero = '[Hero] Delete Hero',
  UpdateHero = '[Hero] Update Hero',
  SetSearchedHeroes = '[Hero] Set Searched Heros',
  SelectHero = '[Hero] Select Hero'
}

export class SetHeros implements Action {
  readonly type = HeroActionTypes.SetHeroes;
  constructor(readonly payload: Hero[]) {}
}

export class AddHero implements Action {
  readonly type = HeroActionTypes.AddHero;
  constructor(readonly payload: Hero) {}
}

export class DeleteHero implements Action {
  readonly type = HeroActionTypes.DeleteHero;
  constructor(readonly payload: number) {}
}

export class UpdateHero implements Action {
  readonly type = HeroActionTypes.UpdateHero;
  constructor(readonly payload: Hero) {}
}

export class SetSearchedHeroes implements Action {
  readonly type = HeroActionTypes.SetSearchedHeroes;
  constructor(readonly payload: Hero[]) {}
}

export class SelectHero implements Action {
  readonly type = HeroActionTypes.SelectHero;
  constructor(readonly payload: Hero) {}
}

export type HeroActions =
  | SetHeros
  | AddHero
  | DeleteHero
  | UpdateHero
  | SetSearchedHeroes
  | SelectHero;
