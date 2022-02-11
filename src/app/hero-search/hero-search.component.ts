import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  heroesRecogido: any;
  heroesRecogidos: Hero[] = [];

  constructor(private heroService: HeroService) {
  }

  // Push a search term into the observable stream.
  private term: string = '';

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );

    this.heroes$.subscribe(heroes => {
      this.heroesRecogido = heroes;
      this.heroesRecogido = this.heroesRecogido.data.results;
      //this.pathHeroes = this.heroesRecogidos.thumbnail.path;
      for (let heroes in this.heroesRecogido) {
        let heroArray = {
          id: this.heroesRecogido[heroes].id, name: this.heroesRecogido[heroes].name,
          path: this.heroesRecogido[heroes].thumbnail.path, extension: this.heroesRecogido[heroes].thumbnail.extension
        }
        this.heroesRecogidos.push(<Hero>heroArray)
      }
    });
  }
}
