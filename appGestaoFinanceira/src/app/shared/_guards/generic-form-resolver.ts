import { ActivatedRouteSnapshot, Resolve, Route, Router } from '@angular/router';
import { GenericResourceModel } from '../_models/generic-resource-model';
import { GenericResourceService } from '../_services/generic-resource-service';

export abstract class GenericFormResolver<T extends GenericResourceModel> 
    implements Resolve<T> {
   
   constructor(public genericResourceService: GenericResourceService<T>) {}

   resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
      let id= activatedRouteSnapshot.params['id'];
      console.log('id: '+id);
      this.genericResourceService.setApiOption('/GetId');
      return this.genericResourceService.getById(id);
   }
   
}