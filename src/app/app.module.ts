import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RemoteService, UniversitiesService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterItemsPipe } from './pipes/filter-items.pipe';

@NgModule({
  declarations: [AppComponent, MainPageComponent, FilterItemsPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MaterialModule],
  providers: [RemoteService, UniversitiesService, FilterItemsPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
