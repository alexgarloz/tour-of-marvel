import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  heroesList: Hero[] = [];
  heroesRecogido: any;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    /*
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
    console.log(this.heroes);
    */
    let heroesArray = this.heroService.getMarvelPersonage();
    heroesArray.subscribe(heroes => {
      this.heroesRecogido = heroes;
      this.heroesRecogido = this.heroesRecogido.data.results;
      for (let heroes in this.heroesRecogido) {
        let heroArray = {
          id: this.heroesRecogido[heroes].id, name: this.heroesRecogido[heroes].name,
          path: this.heroesRecogido[heroes].thumbnail.path, extension: this.heroesRecogido[heroes].thumbnail.extension
        }
        this.heroesList.push(<Hero>heroArray)
      }
      /*
      this.heroesRecogidos.sort(() => {
        return Math.random() - 0.8;
      });
       */
    });
  }





}
