import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/features/cadastros-basicos/_services/categoria-service';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';

@Component({
  selector: 'app-tipo-item-movimentacao',
  template: `
    <label for="tipo">Tipo:</label>
    <select class="form-control" formControlName='tipo'>
      <option>--Selecione--</option>
      <option *ngFor="let item of tipos" value={{item.Key}}>
        {{item.Value}}
      </option>
    </select>          
  `,
  styleUrls: ['./tipo-item-movimentacao.component.css']
})
export class TipoItemMovimentacaoComponent implements OnInit {

  tipos:any[]=[];

  constructor(private categoriaService: CategoriaService,
    private alertMessage: AlertMessageForm) {
      this.listarDados();
  }  

  ngOnInit(): void {

  }

  listarDados(){
    this.categoriaService.setApiOption('/GetAllTipo');
    this.categoriaService.get().subscribe(
      sucess => this.tipos = sucess
    );
  }

}
