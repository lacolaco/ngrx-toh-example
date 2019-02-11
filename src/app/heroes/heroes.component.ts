import { getAllHeroes } from './../hero/hero.selectors';
import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService, private store: Store<{}>) {
    this.heroes$ = this.store.pipe(select(getAllHeroes));
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    this.heroService.fetchHeroes();
  }

  add(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero);
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero);
  }
}
