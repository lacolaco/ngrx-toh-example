import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Store, select } from '@ngrx/store';
import { getSelectedHero } from '../hero/hero.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero | null>;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private store: Store<{}>
  ) {
    this.hero$ = this.store.pipe(select(getSelectedHero));
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id);
  }

  goBack(): void {
    this.location.back();
  }

  async save(hero: Hero) {
    this.heroService.updateHero(hero);
    this.goBack();
  }
}
