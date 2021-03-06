import { State } from './hero.reducer';
import { createSelector } from '@ngrx/store';

export const selectHeroFeature = (state: { hero: State }) => state.hero;

export const getAllHeroes = createSelector(
  selectHeroFeature,
  hero => hero.heroes
);

export const getTopHeroes = createSelector(
  getAllHeroes,
  allHeroes => allHeroes.slice(1, 5)
);

export const getSelectedHeroes = createSelector(
  selectHeroFeature,
  hero => hero.searchedHeroes
);

export const getSelectedHero = createSelector(
  selectHeroFeature,
  hero => hero.selectedHero
);
