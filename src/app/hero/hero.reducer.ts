import { Hero } from '../models/hero';
import { HeroActions, HeroActionTypes } from './hero.actions';

export interface State {
  heroes: Hero[];
  searchedHeroes: Hero[];
  selectedHero: Hero | null;
}

export const initialState: State = {
  heroes: [],
  searchedHeroes: [],
  selectedHero: null
};

export function reducer(state = initialState, action: HeroActions): State {
  switch (action.type) {
    case HeroActionTypes.SetHeroes:
      return { ...state, heroes: action.payload };
    case HeroActionTypes.SelectHero:
      return { ...state, selectedHero: action.payload };
    case HeroActionTypes.AddHero:
      return { ...state, heroes: [...state.heroes, action.payload] };
    case HeroActionTypes.DeleteHero:
      return {
        ...state,
        heroes: state.heroes.filter(hero => hero.id !== action.payload)
      };
    case HeroActionTypes.UpdateHero:
      return { ...state, selectedHero: action.payload };
    case HeroActionTypes.SetSearchedHeroes:
      return {
        ...state,
        searchedHeroes: action.payload
      };
    default:
      return state;
  }
}
