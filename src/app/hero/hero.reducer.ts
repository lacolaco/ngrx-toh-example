import { Hero } from './../hero';
import { HeroActions, HeroActionTypes } from './hero.actions';

export interface State {
  heroes: Hero[];
  selectedHeroId: number | null;
}

export const initialState: State = {
  heroes: [],
  selectedHeroId: null
};

export function reducer(state = initialState, action: HeroActions): State {
  switch (action.type) {
    case HeroActionTypes.SetHeroes:
      return { ...state, heroes: action.payload, selectedHeroId: null };
    case HeroActionTypes.SelectHero:
      return { ...state, selectedHeroId: action.payload.id };
    case HeroActionTypes.AddHero:
      return { ...state, heroes: [...state.heroes, action.payload] };
    case HeroActionTypes.DeleteHero:
      return {
        ...state,
        heroes: state.heroes.filter(hero => hero.id !== action.payload)
      };
    default:
      return state;
  }
}
