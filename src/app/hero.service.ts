import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Hero} from './hero';

@Injectable({providedIn: 'root'})
export class HeroService {
  private url: string = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=528ad573517451768a3ea66d54691f26&hash=8e5f49795d7decad259ef39bf2e9bb6b';
  public error: any;
  public personage: any;
  public pageEvent: number | undefined = 0;
  private numPage: number = 0;

  constructor(
    private http: HttpClient) {
  }

  getMarvelPersonage() {
    return this.http.get<Hero[]>(this.url).pipe(map(hero => hero));
  }

  getHeroes(num: string): Observable<Hero[]> {
    this.numPage = parseInt(num) * 20;
    return this.http.get<Hero[]>(`${this.url}&limit=20&offset=${this.numPage}`).pipe(map(hero => hero));
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.url}&nameStartsWith=${term}&limit=5`).pipe(map(hero => hero));
  }

  getHeroId(id: number): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}&id=${id}`).pipe(map(hero => hero));
  }
}
