import { Component, Input, SimpleChanges } from '@angular/core';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';
import { ItemMovimentacao } from 'src/app/features/cadastros-basicos/_models/item-movimentacao-model';
import { CategoriaService } from 'src/app/features/cadastros-basicos/_services/categoria-service';
import { ItemMovimentacaoService } from 'src/app/features/cadastros-basicos/_services/item-movimentacao-service';
import { GenericResourceDropDownComponent } from 'src/app/shared/components/generic-resource-dropdown/generic-resource-dropdown-component';

@Component({
  selector: 'app-dropdown-categoria',
  templateUrl: './drpd-categoria.component.html',
  styleUrls: ['./drpd-categoria.component.css']
})
export class DropDownCategoriaComponent extends GenericResourceDropDownComponent<Categoria> {
  
  @Input('select-by-tipo-item-mov') idTipoItemMov: string;

  arItensMovimentacao: ItemMovimentacao[]=[];
  
  constructor(protected categoriaService: CategoriaService,
              protected itemMovimentacaoService: ItemMovimentacaoService) { 
    super(categoriaService);    
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.arResourceModelAux.length>0){
      if(changes.idTipoItemMov){
        this.filtrarPorTipoItemMov(changes.idTipoItemMov.currentValue);
      }    
    }     
  }

  filtroOnInit(){
    this.itemMovimentacaoService.getAll().subscribe(
      success=>{this.arItensMovimentacao = success;
                if(this.idTipoItemMov != null){
                  this.filtrarPorTipoItemMov(this.idTipoItemMov);
                }}
    )  
  }

  private filtrarPorTipoItemMov(idTipoItemMov: string){   
    this.arResourceModel = this.arResourceModelAux;    
    if(idTipoItemMov != null ){
      this.arResourceModel = this.arResourceModel
                                .filter(c=>this.arItensMovimentacao
                                               .filter(i=>i.tipo==idTipoItemMov)
                                               .map((e)=>{return e.categoria.id}).includes(c.id));
      //se tiver somente uma categoria, seta no dropdown o valor..
      if(this.arResourceModel.length==1){
        this.formControl.setValue(this.arResourceModel[0].id);
        //envia a instância do objeto selecionado para o componente pai..
        this._onChange.emit(this.arResourceModel[0]);
      }     
    }else{
      //limpa o dropdown e dispara qualquer function mencionado no evento OnClear do dropdown
      this.formControl.setValue(null);
      this._onClear.emit();
    }    
  } 
}