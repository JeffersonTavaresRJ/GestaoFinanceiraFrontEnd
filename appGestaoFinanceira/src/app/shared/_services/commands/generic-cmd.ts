import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class GenericCommand {
    constructor(
        public id: number = null
    ) { };
}