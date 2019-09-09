import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private heroService: HeroService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getHeroes();
    this.dataSource.sort = this.sort;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.dataSource.data = this.heroes;
    });
  }

  add(name: string): void {

    name = name.trim();

    if (!name) {
      return;
    }

    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);

      this.updateDataSource();

      this.showSnackBar(`#${hero.id} - ${hero.name}`, 'Added');
    });
  }

  delete(hero: Hero): void {

    this.heroes = this.heroes.filter(h => h !== hero);

    this.heroService.deleteHero(hero).subscribe(_ => {

      this.updateDataSource();

      this.showSnackBar(`#${hero.id} - ${hero.name}`, 'Removed');

    });
  }

  private updateDataSource(): void {
    this.dataSource.data = this.heroes;
  }

  private showSnackBar(info: string, msg: string): void {

    this.snackBar.open(info, msg, {
      duration: 2000,
    });
  }
}
