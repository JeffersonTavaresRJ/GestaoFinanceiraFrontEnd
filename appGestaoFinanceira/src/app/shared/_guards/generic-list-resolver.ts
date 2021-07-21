import { Resolve } from '@angular/router';
import { GenericResourceService } from '../_services/generic-resource-service';

export abstract class GenericListResolver<T extends Object> 
    implements Resolve<T[]> {
   
    constructor(public genericResourceService: GenericResourceService<T>) {}

   resolve() {
     return this.genericResourceService.getAll();
   }
   
}