import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})

export class HelpersService {

    constructor(
        private authService: AuthService,
    ) { }

    emojiRemover = (text: any) => {
        return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    }

    availableJobStatus: Array<{ id: string, label: string, style: string }> = [
        {
            id: '0created',
            label: 'Missing Setup',
            style: 'bg-warning text-dark'
        },
        {
            id: '1not_started',
            label: 'To Do',
            style: 'bg-secondary'
        },
        {
            id: '2in_progress',
            label: 'In Progress',
            style: 'bg-primary'
        },
        {
            id: '3completed',
            label: 'Complete',
            style: 'bg-success'
        },
        {
            id: '4published',
            label: 'Published',
            style: 'bg-danger'
        }
    ];

    isConsultant = (): boolean => {
        const user = this.authService.getUser();
        return (user.role === environment.roles.consultant) ? true : false;
    }

}