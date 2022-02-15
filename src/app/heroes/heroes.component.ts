import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  heroesList: Hero[] = [];
  heroesRecogido: any;
  total: number = 0;
  pageEvent: PageEvent | undefined;
  numeroPag: string = '';

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onPaginateChange($event: PageEvent) {
    this.numeroPag = this.pageEvent?.pageIndex + '';
    this.getHeroes();
  }

  getHeroes(): void {
    //@todo vaciar array antes de ejecutar la llamada
    let heroesArray: Observable <Hero[]>;
    heroesArray = this.heroService.getHeroes(this.numeroPag);
    heroesArray.subscribe(heroes => {
      this.heroesRecogido = heroes;
      this.total = this.heroesRecogido.data.total;
      this.heroesRecogido = this.heroesRecogido.data.results;
      for (let heroes in this.heroesRecogido) {
        let heroArray = {
          id: this.heroesRecogido[heroes].id, name: this.heroesRecogido[heroes].name
        }
        this.heroesList.push(<Hero>heroArray)
      }
    });
  }
}
