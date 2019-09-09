import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  tableColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    this.dataSource.sort = this.sort;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.dataSource.data = heroes;
    });
  }

  add(name: string): void {

    name = name.trim();

    if (!name) {
      return;
    }

    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
      this.dataSource.data = this.heroes;
    });
  }

  delete(hero: Hero): void {

    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
    this.dataSource.data = this.heroes;
  }
}
