import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { environment } from 'src/environments/environment';
import { GenericResourceModel } from '../../_models/generic-resource-model';
import { GenericResourceService } from '../../_services/generic-resource-service';

//@Injectable()
export abstract class GenericListResolver<T extends GenericResourceModel> 
    implements Resolve<T[]> {
   
   private user: Usuario;
   constructor(public genericResourceService: GenericResourceService<T>) {}

   resolve() {
      this.user = JSON.parse(window.localStorage.getItem(environment.keyUser));
      return this.genericResourceService.getAll(this.user.id);
   }
   
}