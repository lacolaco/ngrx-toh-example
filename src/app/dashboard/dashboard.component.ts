import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';
import { HeroService } from '../hero/hero.service';
import { getTopHeroes } from '../hero/hero.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService, private store: Store<{}>) {
    this.heroes$ = this.store.pipe(select(getTopHeroes));
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    this.heroService.fetchHeroes();
  }
}
