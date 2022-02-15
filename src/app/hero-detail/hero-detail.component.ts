import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  heroesList: Hero[] = [];
  heroesRecogido: any;
  heroesDetail: Hero[] = [];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.params['id'];
    let heroesArray = this.heroService.getHeroId(id);
    heroesArray.subscribe(heroes => {
      this.heroesRecogido = heroes;
      this.heroesRecogido = this.heroesRecogido.data.results;
      for (let heroes in this.heroesRecogido) {
        let heroArray = {
          id: this.heroesRecogido[heroes].id,
          name: this.heroesRecogido[heroes].name,
          description: this.heroesRecogido[heroes].description,
          path: this.heroesRecogido[heroes].thumbnail.path,
          extension: this.heroesRecogido[heroes].thumbnail.extension
        }
        this.heroesDetail.push(<Hero>heroArray)
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
