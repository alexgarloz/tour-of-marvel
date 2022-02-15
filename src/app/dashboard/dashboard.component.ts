import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroesRecogidos: Hero[] = [];
  heroesRecogido: any;
  public name: string = '';
  public heroes: any;

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getMarvel();
  }

  getMarvel() {
    let heroesArray = this.heroService.getMarvelPersonage();
    heroesArray.subscribe(heroes => {
      this.heroesRecogido = heroes;
      this.heroesRecogido = this.heroesRecogido.data.results;
      for (let heroes in this.heroesRecogido) {
        let heroArray = {
          id: this.heroesRecogido[heroes].id, name: this.heroesRecogido[heroes].name,
          path: this.heroesRecogido[heroes].thumbnail.path, extension: this.heroesRecogido[heroes].thumbnail.extension
        }
        this.heroesRecogidos.push(<Hero>heroArray)
      }
      this.heroesRecogidos.sort(() => {
        return Math.random() - 0.8;
      });
    });
  }
}
