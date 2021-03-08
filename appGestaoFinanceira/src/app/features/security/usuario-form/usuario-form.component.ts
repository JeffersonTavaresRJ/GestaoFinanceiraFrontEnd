import { Component, Injector } from '@angular/core';
import { Usuario } from '../../../shared/models/usuario-model'
import { GenericResourceFormComponent } from '../../../shared/components/generic-resource-form/generic-resource-form-component'
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent extends GenericResourceFormComponent<Usuario>{


  constructor(protected injector: Injector, protected usuarioService: UsuarioService) {
    super(injector, usuarioService);
  }

  ngOnInit(): void {
    
  }



}
