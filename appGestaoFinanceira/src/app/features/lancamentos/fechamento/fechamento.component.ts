import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';

import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-fechamento',
  templateUrl: './fechamento.component.html',
  styleUrls: ['./fechamento.component.css']
})
export class FechamentoComponent implements OnInit {

  title:string;
  paginaAtual:number=1;
  arMovPrevistas: MovimentacaoPrevista[];
  arMovRealizadas: any[];
  arForms: FormArray = this.formBuilder.array([]);


  firstFormGroup = this.formBuilder.group({
    firstDespesa: ['', Validators.required],
    firstReceita: ['', Validators.required]
  });
  secondFormGroup = this.formBuilder.group({
      secondLancamentos: ['', Validators.required]
   
  });

  constructor(protected activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    debugger;
    var dataFim = this.activatedRoute.snapshot.params.dataFim;
    this.title = "Fechamento Mensal: " + DateConvert.formatDateMMYYYY(dataFim, '/');
    this.movPrevistaList();
    this.movRealizadaGroupByConta();
  }

  next(){
    debugger;
    var count=0;
    this.secondFormGroup.get('secondLancamentos').setValue("");

    this.arForms.controls.forEach(element => {
      if (element.get('isChecked').value == '1') {
        count++;
      }      
    });

    if(this.arForms.length == count){
      this.secondFormGroup.get('secondLancamentos').setValue("1");
    }
  }

  private movPrevistaList() {
    this.activatedRoute.data.subscribe(
      (sucess: { resolveFechamentoMovPrev: MovimentacaoPrevista[] }) => {
        debugger;
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.arMovPrevistas = sucess.resolveFechamentoMovPrev;
      }
    );
  }

  private movRealizadaGroupByConta() {
    this.activatedRoute.data.subscribe(
      (sucess: { resolveFechamentoMovReal: any[] }) => {
        debugger;
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.arMovRealizadas = sucess.resolveFechamentoMovReal;
        this.addArrayForm();
      }
    );
  }

  private addArrayForm(){
    this.arMovRealizadas.forEach((e,i)=>{
      debugger;
      this.arForms.push(this.formBuilder.group({
        conta:[e.conta.descricao],
        dataSaldo:[e.dataSaldo],
        valor:[e.valor],
        isChecked:[""]})
        )
    })
  }

}
