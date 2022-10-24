import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FechamentoModel } from '../_models/fechamento-model';
import { MovRealizadaService } from '../_services/mov-realizada-service';
import { MovPrevistaService } from '../_services/mov-prevista-service';
import { MatStepper } from '@angular/material/stepper';
import { FechamentoService } from '../_services/fechamento-service';


@Component({
  selector: 'app-fechamento',
  templateUrl: './fechamento.component.html',
  styleUrls: ['./fechamento.component.css']
})
export class FechamentoComponent implements OnInit {

  status:string;
  descricaoStatus:string;
  labelButton:string;
  dataReferencia: Date;
  arMovReal: any[];
  arFormsReal: FormArray = this.formBuilder.array([]);
  arFormsPrev: FormArray = this.formBuilder.array([]);

  @ViewChild('stepper') private myStepper: MatStepper;


  firstFormGroup = this.formBuilder.group({
    firstFormChecked: ['', Validators.required]
  });
  secondFormGroup = this.formBuilder.group({
      secondFormChecked: ['', Validators.required]
   
  });

  constructor(protected activatedRoute: ActivatedRoute, 
              private formBuilder: FormBuilder,
              protected movRealizadaService: MovRealizadaService,
              protected movPrevistaService: MovPrevistaService,
              protected fechamentoService: FechamentoService) { }


  ngOnInit(): void {
  }

  firstNext(){
    debugger;
    var count=0;
    this.firstFormGroup.get('firstFormChecked').setValue("");

    this.arFormsPrev.controls.forEach(element => {
      if (element.get('isChecked').value == '1') {
        count++;
      }      
    });

    if(this.arFormsPrev.length == count){
      this.firstFormGroup.get('firstFormChecked').setValue("1");
    }
  }

  secondNext(){
    debugger;
    var count=0;
    this.secondFormGroup.get('secondFormChecked').setValue("");

    this.arFormsReal.controls.forEach(element => {
      if (element.get('isChecked').value == '1') {
        count++;
      }      
    });

    if(this.arFormsReal.length == count){
      this.secondFormGroup.get('secondFormChecked').setValue("1");
    }
  }


  setValueChecks(valor: string){
    this.arFormsPrev.controls.forEach(element => {
      element.get('isChecked').setValue(valor);      
    });
    this.arFormsReal.controls.forEach(element => {
      element.get('isChecked').setValue(valor); 
    });
  }

  getFechamento(ev: FechamentoModel){
    debugger;
    this.status = ev.status;
    this.descricaoStatus = ev.descricaoStatus;   
    this.dataReferencia  = ev.dataReferencia;
    this.labelButton = ev.status=="A"? "Fechar": "Reabrir";
    this.myStepper.linear = ev.status=="A"? true: false;
    this.myStepper.selectedIndex=ev.status=="F"? 2: 0;
    this.populaTela(new Date(this.dataReferencia));
    }

    execute(){
       this.fechamentoService.putBody({dataReferencia:DateConvert.formatDateYYYYMMDD(this.dataReferencia, '-'), 
                                       status:this.status=="A"? "F":"A"}).subscribe(
                                        sucess=>{
                                          this.populaTela(new Date(this.dataReferencia));
                                        });
    }

  private populaTela(dataReferencia: Date){

    var dataIni = DateConvert.formatDateYYYYMMDD(
                    new Date(dataReferencia.getFullYear(), dataReferencia.getMonth(), 1), '-');
    var dataFim = DateConvert.formatDateYYYYMMDD(dataReferencia, '-');

    this.movPrevistaService.getByDataVencimento(dataIni, dataFim).subscribe(
      sucess=>{this.movPrevistaGroupBy(sucess);
               this.movRealizadaService.GetMaxGroupBySaldoConta(dataFim).subscribe(
                       sucess=>{this.arMovReal=sucess;
                      this.addArrayFormReal();
          });
      });    
  }

  private movPrevistaGroupBy(arr: MovimentacaoPrevista[]){
    //agrupando itens de despesas e receitas..
    var result = [];
    arr.reduce(function(acumulador, obj){
      if (!acumulador[obj.itemMovimentacao.tipo]){
          acumulador[obj.itemMovimentacao.tipo] = {Tipo: obj.itemMovimentacao.tipoDescricao, ValorEmAberto: 0, ValorQuitado: 0};
          result.push(acumulador[obj.itemMovimentacao.tipo]);
      }      
      if (obj.status=="Q"){
        acumulador[obj.itemMovimentacao.tipo].ValorQuitado+=obj.valor
      }else{
        acumulador[obj.itemMovimentacao.tipo].ValorEmAberto+=obj.valor
      }
      return acumulador;
    }, []);
    this.addArrayFormPrev(result);
  }

  private addArrayFormPrev(arr: any[]){
    this.arFormsPrev.clear();
    arr.forEach((e,i)=>{
      debugger;
      this.arFormsPrev.push(this.formBuilder.group({
        tipo:[e.Tipo],
        valorEmAberto:[e.ValorEmAberto],
        valorQuitado:[e.ValorQuitado],
        isChecked:[""]})
        )
    })
  }

  private addArrayFormReal(){
    this.arFormsReal.clear();
    this.arMovReal.forEach((e,i)=>{
      debugger;
      this.arFormsReal.push(this.formBuilder.group({
        conta:[e.conta.descricao],
        dataSaldo:[e.dataSaldo],
        valor:[e.valor],
        isChecked:[""]})
        )
    })
  }

}
