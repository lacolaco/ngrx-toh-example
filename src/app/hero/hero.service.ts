import {
  SetHeros,
  AddHero,
  DeleteHero,
  SetSearchedHeroes,
  SelectHero,
  UpdateHero
} from './hero.actions';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from '../models/hero';
import { MessageService } from '../message.service';
import { Store } from '@ngrx/store';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroesUrl = 'api/heroes'; // Web APIのURL

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private store: Store<{}>
  ) {}

  /** サーバーからヒーローを取得する */
  async fetchHeroes() {
    try {
      const heroes = await this.http.get<Hero[]>(this.heroesUrl).toPromise();
      this.log('fetched heroes');
      this.store.dispatch(new SetHeros(heroes));
    } catch {
      this.handleError('getHeroes', []);
    }
  }

  /** IDによりヒーローを取得する。idが見つからない場合は`undefined`を返す。 */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url).pipe(
      map(heroes => heroes[0]), // {0|1} 要素の配列を返す
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** IDによりヒーローを取得する。見つからなかった場合は404を返却する。 */
  async getHero(id: number) {
    const url = `${this.heroesUrl}/${id}`;
    try {
      this.store.dispatch(new SelectHero(null));
      const hero = await this.http.get<Hero>(url).toPromise();
      this.log(`fetched hero id=${id}`);
      this.store.dispatch(new SelectHero(hero));
    } catch {
      this.handleError<Hero>(`getHero id=${id}`);
    }
  }

  /* 検索語を含むヒーローを取得する */
  async searchHeroes(term: string) {
    if (!term.trim()) {
      // 検索語がない場合、空のヒーロー配列を返す
      return of([]);
    }
    try {
      const heroes = await this.http
        .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
        .toPromise();
      this.log(`found heroes matching "${term}"`);
      this.store.dispatch(new SetSearchedHeroes(heroes));
    } catch {
      this.handleError<Hero[]>('searchHeroes', []);
    }
  }

  //////// Save methods //////////

  /** POST: サーバーに新しいヒーローを登録する */
  async addHero(hero: Hero) {
    try {
      const added = await this.http
        .post<Hero>(this.heroesUrl, hero, httpOptions)
        .toPromise();
      this.log(`added hero w/ id=${hero.id}`);
      this.store.dispatch(new AddHero(added));
    } catch {
      this.handleError<Hero>('addHero');
    }
  }

  /** DELETE: サーバーからヒーローを削除 */
  async deleteHero(hero: Hero | number) {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    try {
      await this.http.delete<Hero>(url, httpOptions).toPromise();
      this.log(`deleted hero id=${id}`);
      this.store.dispatch(new DeleteHero(id));
    } catch {
      this.handleError<Hero>('deleteHero');
    }
  }

  /** PUT: サーバー上でヒーローを更新 */
  async updateHero(hero: Hero) {
    try {
      const updated = await this.http
        .put<Hero>(this.heroesUrl, hero, httpOptions)
        .toPromise();
      this.log(`updated hero id=${hero.id}`);
      this.store.dispatch(new UpdateHero(updated));
    } catch {
      this.handleError<any>('updateHero');
    }
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** HeroServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
