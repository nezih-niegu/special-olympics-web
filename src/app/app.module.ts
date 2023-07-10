import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {SportsComponent} from './sports/sports.component';
import {CreateSportComponent} from './create-sport/create-sport.component';
import {EditSportComponent} from './edit-sport/edit-sport.component';
import {CreateCoachComponent} from './create-coach/create-coach.component';
import {CreatePictureComponent} from './create-picture/create-picture.component';
import {UsersComponent} from './users/users.component';
import {EditSportInfoComponent} from './edit-sport-info/edit-sport-info.component';
import {EditSportImageComponent} from './edit-sport-image/edit-sport-image.component';
import {EditSportManualComponent} from './edit-sport-manual/edit-sport-manual.component';
import {ClubsComponent} from './clubs/clubs.component';
import { CreateMunicipalityComponent } from './create-municipality/create-municipality.component';
import { CreateClubComponent } from './create-club/create-club.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { EditClubInfoComponent } from './edit-club-info/edit-club-info.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CreatePracticeComponent } from './create-practice/create-practice.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { EditPracticeComponent } from './edit-practice/edit-practice.component';
import { EventsComponent } from './events/events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditEventInfoComponent } from './edit-event-info/edit-event-info.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';
import { ProgramsComponent } from './programs/programs.component';
import { CreateProgramComponent } from './create-program/create-program.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { EditActivityInfoComponent } from './edit-activity-info/edit-activity-info.component';
import { EditActivityImageComponent } from './edit-activity-image/edit-activity-image.component';
import { EditTestimonialComponent } from './edit-testimonial/edit-testimonial.component';
import { EditTestimonialInfoComponent } from './edit-testimonial-info/edit-testimonial-info.component';
import { EditTestimonialImageComponent } from './edit-testimonial-image/edit-testimonial-image.component';
import { EditProgramComponent } from './edit-program/edit-program.component';
import { EditProgramInfoComponent } from './edit-program-info/edit-program-info.component';
import { EditProgramImageComponent } from './edit-program-image/edit-program-image.component';
import { CreateAvailableSportComponent } from './create-available-sport/create-available-sport.component';
import { EditProgramManualComponent } from './edit-program-manual/edit-program-manual.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { StatesComponent } from './states/states.component';
import { CreateStateComponent } from './create-state/create-state.component';
import { EditStateComponent } from './edit-state/edit-state.component';
import { CreateUserPasswordComponent } from './create-user-password/create-user-password.component';
import { ContactComponent } from './contact/contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { EditCoachComponent } from './edit-coach/edit-coach.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordEmailSentComponent } from './forgot-password-email-sent/forgot-password-email-sent.component';
import { ResetUserPasswordComponent } from './reset-user-password/reset-user-password.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        ToolbarComponent,
        SportsComponent,
        CreateSportComponent,
        EditSportComponent,
        CreateCoachComponent,
        CreatePictureComponent,
        UsersComponent,
        EditSportInfoComponent,
        EditSportImageComponent,
        EditSportManualComponent,
        ClubsComponent,
        CreateMunicipalityComponent,
        CreateClubComponent,
        EditClubComponent,
        EditClubInfoComponent,
        CreatePracticeComponent,
        CreateSessionComponent,
        EditPracticeComponent,
        EventsComponent,
        GalleryComponent,
        CreateEventComponent,
        EditEventComponent,
        EditEventInfoComponent,
        ActivitiesComponent,
        CreateActivityComponent,
        TestimonialsComponent,
        CreateTestimonialComponent,
        ProgramsComponent,
        CreateProgramComponent,
        EditActivityComponent,
        EditActivityInfoComponent,
        EditActivityImageComponent,
        EditTestimonialComponent,
        EditTestimonialInfoComponent,
        EditTestimonialImageComponent,
        EditProgramComponent,
        EditProgramInfoComponent,
        EditProgramImageComponent,
        CreateAvailableSportComponent,
        EditProgramManualComponent,
        SpinnerComponent,
        StatesComponent,
        CreateStateComponent,
        EditStateComponent,
        CreateUserPasswordComponent,
        ContactComponent,
        EditContactComponent,
        EditCoachComponent,
        ForgotPasswordComponent,
        ForgotPasswordEmailSentComponent,
        ResetUserPasswordComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatRippleModule,
        MatStepperModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatListModule,
        MatPaginatorModule,
        MatTabsModule,
        MatDialogModule,
        MatGridListModule,
        MatSelectModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
        MatProgressSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        CreateCoachComponent,
        CreatePictureComponent,
        EditSportInfoComponent,
        EditSportImageComponent,
        EditSportManualComponent,
        CreateMunicipalityComponent,
        EditClubInfoComponent,
        CreateSessionComponent,
        CreateEventComponent,
        EditEventInfoComponent,
        EditActivityInfoComponent,
        EditActivityImageComponent,
        EditTestimonialInfoComponent,
        EditTestimonialImageComponent,
        EditProgramInfoComponent,
        EditProgramImageComponent,
        CreateAvailableSportComponent,
        EditProgramManualComponent,
        CreateStateComponent,
        EditStateComponent,
        EditContactComponent,
        EditCoachComponent
    ]
})
export class AppModule{}
