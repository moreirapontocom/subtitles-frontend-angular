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

    isConsultant = (): boolean => {
        const user = this.authService.getUser();
        return (user.role === environment.roles.consultant) ? true : false;
    }

}