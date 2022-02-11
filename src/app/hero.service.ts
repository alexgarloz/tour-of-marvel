import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {mergeMap, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Hero} from './hero';
import {MessageService} from './message.service';


@Injectable({providedIn: 'root'})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  private URL: string = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=528ad573517451768a3ea66d54691f26&hash=8e5f49795d7decad259ef39bf2e9bb6b';

  error: any;
  personage: any;

  /*httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };*/
  private result: any;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }


  getMarvelPersonage() {
    return this.http.get<Hero[]>(this.URL).pipe(map(hero => hero));
    /* return this.http.get<any>(this.URL)
       .toPromise()
       .then(res => <Hero[]>res.data)
       .then(data => {
         console.log('holaaaaaaa');
         console.log(data);
         return data;
       });
     */

    /*
    this.http.get(this.URL).subscribe(data => {
      console.log(data);

      return data;
    });
     */
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.URL}&limit=20&offset=0`).pipe(map(hero => hero));
    /* return this.http.get<Hero[]>(`${this.URL}&limit=20&offset=0`)
       .pipe(
         tap(_ => this.log('fetched heroes')),
         catchError(this.handleError<Hero[]>('getHeroes', []))
       );
     */
  }

  searchHeroes(term: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.URL}&nameStartsWith=${term}&limit=5`).pipe(map(hero => hero));
    /*
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.URL}&nameStartsWith=${term}&limit=5`).pipe(
      tap(x => x.length  ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
     */
  }

  getHeroId(id: number): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.URL}&id=${id}`).pipe(map(hero => hero));
  }


  //////// Save methods //////////

  /** POST: add a new hero to the server
   addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }*/

  /** DELETE: delete the hero from the server
   deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }*/

  /** PUT: update the hero on the server
   updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  } */

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
