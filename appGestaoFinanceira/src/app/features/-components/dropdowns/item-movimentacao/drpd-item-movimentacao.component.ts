import { Component, Input, SimpleChanges } from '@angular/core';
import { ItemMovimentacao } from 'src/app/features/cadastros-basicos/_models/item-movimentacao-model';
import { ItemMovimentacaoService } from 'src/app/features/cadastros-basicos/_services/item-movimentacao-service';
import { GenericResourceDropDownComponent } from 'src/app/shared/components/generic-resource-dropdown/generic-resource-dropdown-component';

@Component({
  selector: 'app-dropdown-item-movimentacao',
  templateUrl: './drpd-item-movimentacao.component.html',
  styleUrls: ['./drpd-item-movimentacao.component.css']
})
export class DropDownItemMovimentacaoComponent 
  extends GenericResourceDropDownComponent<ItemMovimentacao>{

  @Input('select-by-idCategoria') idCategoria: boolean;
  @Input('select-by-tipo-item-mov') idTipoItemMov: string;
  @Input('select-by-tipo-operacao') tipoOperacao: string;

  constructor(protected itemMovimentacaoService: ItemMovimentacaoService) { 
    super(itemMovimentacaoService);    
  }
  
  filtroOnInit(){
    this.filtrarPorTipoOperacao(this.tipoOperacao);
    this.filtrarPorTipoItemMov(this.idTipoItemMov);    
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.arResourceModelAux.length>0){
      if(changes.status){
        this.filtrarPorStatus(changes.selectByStatus.currentValue);
      }
      if(changes.idTipoItemMov){
        this.filtrarPorTipoItemMov(changes.idTipoItemMov.currentValue);
      } 
      if(changes.idCategoria){
        this.filtrarPorCategoria(changes.idCategoria.currentValue);
      }
    }     
  }
  
  filtrarPorCategoria(idCategoria: number){   
    this.arResourceModel = this.arResourceModelAux;    
    if(idCategoria >0 ){
      this.arResourceModel = this.arResourceModel.filter(i=>i.categoria.id==idCategoria);
      //se tiver somente um item, seta no dropdown o valor..
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

  private filtrarPorTipoItemMov(idTipoItemMov: string){   
    this.arResourceModel = this.arResourceModelAux;    
    if(idTipoItemMov != null ){
      this.arResourceModel = this.arResourceModel.filter(i=>i.tipo==idTipoItemMov);
      //se tiver somente um item, seta no dropdown o valor..
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

  private filtrarPorTipoOperacao(tipoOperacao:string){
    if(tipoOperacao!= null){
      this.arResourceModel = this.arResourceModelAux.filter(i=>i.tipoOperacao==tipoOperacao);
      this.arResourceModelAux = this.arResourceModel;
    }    
  }
}