import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsComponent } from './forms/forms.component';
import { FooterComponent } from './footer/footer.component';

// Add Services
import { FormServiceService } from './services/form-service.service';
import { SemanalComponent } from './semanal/semanal.component';

// Http client side
import { HttpClientModule } from '@angular/common/http';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material';

// Angular MAterial
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE} from '@angular/material';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { GalleryFormComponent } from './gallery-form/gallery-form.component';
import { CenasUpdateComponent } from './cenas-update/cenas-update.component';

// Router links

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'gallery', component: GalleryFormComponent },
  { path: 'cenas',  component: CenasUpdateComponent },
  { path: 'semana',  component: SemanalComponent},
  { path: 'home', component: HomeComponent},
  { path: '**', component: HomeComponent },
  { path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormsComponent,
    FooterComponent,
    FormsComponent,
    SemanalComponent,
    GalleryFormComponent,
    CenasUpdateComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule
  ],
  providers: [FormServiceService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
