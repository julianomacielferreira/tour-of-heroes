/*
 * The MIT License
 *
 * Copyright 2019 Juliano Maciel Ferreira.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
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
