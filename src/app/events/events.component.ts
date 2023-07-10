import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import * as moment from 'moment';
import {Router} from '@angular/router';

import {EventService} from '../services/event.service';
import {CreateEventComponent} from '../create-event/create-event.component';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
    view: CalendarView = CalendarView.Month;
    viewDate: Date = new Date();
    events: CalendarEvent[] = []
    activeDayIsOpen: boolean = false;
    loading = true;

    constructor(
        public dialog: MatDialog,
        private eventService: EventService,
        private router: Router
    ){}

    ngOnInit(){
        this.eventIndex();
    }

    closeOpenMonthViewDay(){
        this.activeDayIsOpen = false;
    }

    displayDate(){
        return moment(this.viewDate).locale('es').format('MMMM');
    }

    dayClicked({date, events}: {date: Date; events: CalendarEvent[]}): void {
        if(moment(date).isSame(this.viewDate), 'month'){
            if((moment(this.viewDate).isSame(date, 'day') && this.activeDayIsOpen === true) || events.length == 0){
                this.activeDayIsOpen = false;
            }else{
                this.activeDayIsOpen = true;
            }
    
            this.viewDate = date;
        }
    }

    eventIndex(){
        this.eventService.index().subscribe((eventIndexResponse) => {
            this.events = eventIndexResponse.map<CalendarEvent>((eventIndexResponseItem) => {
                const start = moment.utc(eventIndexResponseItem.start);
                const end = moment.utc(eventIndexResponseItem.end);

                return {
                    title: `${eventIndexResponseItem.name} (de ${start.format('DD/MM/YYYY HH:mm')} a ${end.format('DD/MM/YYYY HH:mm')})`,
                    start: start.toDate(),
                    end: end.toDate(),
                    actions: [
                        {
                            label: '<i class="material-icons">edit</i>',
                            a11yLabel: 'Editar',
                            onClick: () => {
                                this.router.navigate([`/events/${eventIndexResponseItem.id}/edit`]);
                            }
                        },
                        {
                            label: '<i class="material-icons">delete</i>',
                            a11yLabel: 'Eliminar',
                            onClick: () => {
                                this.destroyEvent(eventIndexResponseItem.id);
                            }
                        }
                    ]
                }
            });
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    destroyEvent(id: number){
        this.eventService.destroy(id).subscribe(() => {
            this.activeDayIsOpen = false;
            this.eventIndex();
        }, (error) => {
            alert(error.message);
        });
    }

    openCreateEventDialog(){
        const dialogRef = this.dialog.open(CreateEventComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe((eventCreated) => {
            if(eventCreated){
                this.eventIndex();
            }
        });
    }
}
