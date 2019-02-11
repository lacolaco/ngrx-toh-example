import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Store, select } from '@ngrx/store';
import { getSelectedHeroes } from '../hero/hero.selectors';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  heroes$: Observable<Hero[]>;
  private onDestroy$ = new EventEmitter();
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService, private store: Store<{}>) {
    this.heroes$ = this.store.pipe(select(getSelectedHeroes));
  }

  // 検索語をobservableストリームにpushする
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        takeUntil(this.onDestroy$),
        // 各キーストロークの後、検索前に300ms待つ
        debounceTime(300),
        // 直前の検索語と同じ場合は無視する
        distinctUntilChanged()
      )
      .subscribe((term: string) => this.heroService.searchHeroes(term));
  }

  ngOnDestroy() {
    this.onDestroy$.emit();
  }
}
