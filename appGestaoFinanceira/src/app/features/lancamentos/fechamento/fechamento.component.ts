import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-fechamento',
  templateUrl: './fechamento.component.html',
  styleUrls: ['./fechamento.component.css']
})
export class FechamentoComponent implements OnInit {

  title:string;
  labelButton:string;
  paginaAtual:number=1;
  arMovReal: any[];
  arFormsReal: FormArray = this.formBuilder.array([]);
  arFormsPrev: FormArray = this.formBuilder.array([]);


  firstFormGroup = this.formBuilder.group({
    firstFormChecked: ['', Validators.required]
  });
  secondFormGroup = this.formBuilder.group({
      secondFormChecked: ['', Validators.required]
   
  });

  constructor(protected activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    debugger;
    var dataFim = this.activatedRoute.snapshot.params.dataFim;
    this.title = "Fechamento Mensal: " + DateConvert.formatDateMMYYYY(dataFim, '/');
    this.movPrevistaList();
    this.movRealizadaGroupByConta();
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

  resetChecks(){
    this.arFormsPrev.controls.forEach(element => {
      element.get('isChecked').setValue('');      
    });
    this.arFormsReal.controls.forEach(element => {
      element.get('isChecked').setValue(''); 
    });
  }

  private movPrevistaList() {
    this.activatedRoute.data.subscribe(
      (sucess: { resolveFechamentoMovPrev: MovimentacaoPrevista[] }) => {
        //this.arMovPrev =sucess.resolveFechamentoMovPrev;
        this.movPrevistaGroupBy(sucess.resolveFechamentoMovPrev);
    }
    );
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
    console.log(result);
    this.addArrayFormPrev(result);
  }

  private addArrayFormPrev(arr: any[]){
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

  private movRealizadaGroupByConta() {
    this.activatedRoute.data.subscribe(
      (sucess: { resolveFechamentoMovReal: any[] }) => {
        debugger;
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.arMovReal = sucess.resolveFechamentoMovReal;
        this.addArrayFormReal();
      }
    );
  }

  private addArrayFormReal(){
    this.arMovReal.forEach((e,i)=>{
      debugger;
      if (e.status=="A"){
        this.labelButton = "Fechar"
      }else{
        this.labelButton = "Reabrir"
      }
      this.arFormsReal.push(this.formBuilder.group({
        conta:[e.conta.descricao],
        dataSaldo:[e.dataSaldo],
        valor:[e.valor],
        isChecked:[""]})
        )
    })
  }

}
