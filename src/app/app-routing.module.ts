import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {SportsComponent} from './sports/sports.component';
import {CreateSportComponent} from './create-sport/create-sport.component';
import {EditSportComponent} from './edit-sport/edit-sport.component';
import {UsersComponent} from './users/users.component';
import {ClubsComponent} from './clubs/clubs.component';
import {EditClubComponent} from './edit-club/edit-club.component';
import {CreatePracticeComponent} from './create-practice/create-practice.component';
import {EditPracticeComponent} from './edit-practice/edit-practice.component';
import {EventsComponent} from './events/events.component';
import {GalleryComponent} from './gallery/gallery.component';
import {EditEventComponent} from './edit-event/edit-event.component'
import {ActivitiesComponent} from './activities/activities.component';
import {CreateActivityComponent} from './create-activity/create-activity.component';
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {CreateTestimonialComponent} from './create-testimonial/create-testimonial.component';
import {ProgramsComponent} from './programs/programs.component';
import {CreateProgramComponent} from './create-program/create-program.component';
import {EditActivityComponent} from './edit-activity/edit-activity.component';
import {EditTestimonialComponent} from './edit-testimonial/edit-testimonial.component';
import {EditProgramComponent} from './edit-program/edit-program.component';
import {CreateClubComponent} from './create-club/create-club.component';
import {EditClubInfoComponent} from './edit-club-info/edit-club-info.component';
import {CreateUserPasswordComponent} from './create-user-password/create-user-password.component';
import {ContactComponent} from './contact/contact.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { ForgotPasswordEmailSentComponent } from './forgot-password-email-sent/forgot-password-email-sent.component';
import { ResetUserPasswordComponent } from './reset-user-password/reset-user-password.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sports',
        component: SportsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sports/create',
        component: CreateSportComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sports/:id/edit',
        component: EditSportComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clubs',
        component: ClubsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clubs/:id/edit',
        component: EditClubComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clubs/:id/practices/create',
        component: CreatePracticeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clubs/:clubId/practices/:id/edit',
        component: EditPracticeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'events',
        component: EventsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'galleries/:id',
        component: GalleryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'events/:id/edit',
        component: EditEventComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'activities',
        component: ActivitiesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'activities/create',
        component: CreateActivityComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'activities/:id/edit',
        component: EditActivityComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'testimonials',
        component: TestimonialsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'testimonials/create',
        component: CreateTestimonialComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'testimonials/:id/edit',
        component: EditTestimonialComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'programs',
        component: ProgramsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'programs/create',
        component: CreateProgramComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'programs/:id/edit',
        component: EditProgramComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'municipalities/:id/clubs/create',
        component: CreateClubComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clubs/:id/edit-info',
        component: EditClubInfoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/:id/create-password',
        component: CreateUserPasswordComponent
    },
    {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'forgot-password-email-sent',
        component: ForgotPasswordEmailSentComponent
    },
    {
        path: 'reset-user-password',
        component: ResetUserPasswordComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}