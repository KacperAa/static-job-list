import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JobsListAndFilterComponent } from './components/jobs-list-and-filter/jobs-list-and-filter.component';
import { JobsListElComponent } from './components/jobs-list-el/jobs-list-el.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandDataComponent } from './components/brand-data/brand-data.component';
import { GraphicThemeComponent } from './components/graphic-theme/graphic-theme.component';
import { JobFilterComponent } from './components/job-filter/job-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsListAndFilterComponent,
    JobsListElComponent,
    CategoriesComponent,
    BrandDataComponent,
    GraphicThemeComponent,
    JobFilterComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
