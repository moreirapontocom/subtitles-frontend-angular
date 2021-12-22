import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class MessageService {

    auxiliar: any = undefined;

    private subject = new Subject<any>();

    sendMessage = (target: string, action: string, payload: any = null) => this.subject.next({ target, action, payload });

    getMessage = (): Observable<any> => this.subject.asObservable();

    toast = (message: string) => this.sendMessage('ToastComponent', 'toast', message);
}