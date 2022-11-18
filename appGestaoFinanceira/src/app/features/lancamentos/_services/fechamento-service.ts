import { Injectable, Injector } from '@angular/core';
import { GenericResourceService } from 'src/app/shared/_services/generic-resource-service';
import { FechamentoModel } from '../_models/fechamento-model';

@Injectable({
    providedIn: 'root'
  })
  export class FechamentoService extends GenericResourceService<FechamentoModel>{

    constructor(injector: Injector){
                super(injector, 'api/Fechamento');
                
    }
  }