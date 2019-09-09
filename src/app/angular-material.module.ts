import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatLineModule } from '@angular/material/core';

const MaterialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatCardModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatLineModule
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules]
})
export class AngularMaterialModule { }
