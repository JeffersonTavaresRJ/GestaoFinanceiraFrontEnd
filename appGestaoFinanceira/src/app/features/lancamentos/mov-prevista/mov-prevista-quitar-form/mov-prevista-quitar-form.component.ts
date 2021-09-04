import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovimentacaoPrevista } from '../../_models/mov-prevista-model';

@Component({
  selector: 'app-mov-prevista-quitar-form',
  templateUrl: './mov-prevista-quitar-form.component.html',
  styleUrls: ['./mov-prevista-quitar-form.component.css']
})
export class MovPrevistaQuitarFormComponent implements OnInit {
  
  formGroup: FormGroup;
  formBuilder: FormBuilder;
  activateRoute: ActivatedRoute;

  dataIni:Date;
  dataFim:Date;
  arStDate:string[]=[];
  
  constructor(protected injector: Injector) {
    this.formBuilder =injector.get(FormBuilder); 
    this.activateRoute =injector.get(ActivatedRoute);
   }

  ngOnInit(): void {
    this.builderForm();
    this.load();
    this.arStDate = this.activateRoute.snapshot.params.dataVencIni.split('-');
    this.dataIni=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
    this.arStDate = this.activateRoute.snapshot.params.dataVencFim.split('-');
    this.dataFim=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
   
  }

  private builderForm() {
    this.formGroup = this.formBuilder.group({
      descricaoCategoria: [null],
      idItemMovimentacao: [null],
      descricaoItemMovimentacao: [null],
      dataReferencia: [null],
      descricaoTipoPrioridade: [null],
      observacao: [null],
      dataVencimento: [null],
      valor: [null],
      descricaoStatus: [null],
      descricaoFormaPagamento: [null]
    });
  }

  private load() {
      this.activateRoute.data.subscribe(
        (sucess:{resolveMovPrev:MovimentacaoPrevista})=>{
          console.log(sucess);
          //o resolveMovPrev deve ser o mesmo nome na variável resolve da rota.. 
          this.formGroup.get('descricaoCategoria').setValue(sucess.resolveMovPrev.itemMovimentacao.categoria.descricao);
          this.formGroup.get('idItemMovimentacao').setValue(sucess.resolveMovPrev.itemMovimentacao.id);
          this.formGroup.get('descricaoItemMovimentacao').setValue(sucess.resolveMovPrev.itemMovimentacao.descricao);
          this.formGroup.get('dataReferencia').setValue(new Date(sucess.resolveMovPrev.dataReferencia));
          this.formGroup.get('descricaoTipoPrioridade').setValue(sucess.resolveMovPrev.tipoPrioridadeDescricao);
          this.formGroup.get('observacao').setValue(sucess.resolveMovPrev.observacao);
          this.formGroup.get('dataVencimento').setValue(new Date(sucess.resolveMovPrev.dataVencimento));
          this.formGroup.get('valor').setValue(sucess.resolveMovPrev.valor);
          this.formGroup.get('descricaoStatus').setValue(sucess.resolveMovPrev.statusDescricao);
          this.formGroup.get('descricaoFormaPagamento').setValue(sucess.resolveMovPrev.formaPagamento.descricao);
        }
      );
    
  }

  submmit(){}


}
