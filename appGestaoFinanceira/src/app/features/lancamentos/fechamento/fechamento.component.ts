import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  count:number=0;
  status: string;
  descricaoStatus:string;
  labelButton:string;
  fechamentoModel: FechamentoModel;
  selectedMesAno: string; 
  arFechamentosMensais:FechamentoModel[];
  arMovReal: any[];
  arMovPrev: any[];
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
              protected router: Router,
              private formBuilder: FormBuilder,
              protected fechamentoService: FechamentoService,
              protected movPrevistaService: MovPrevistaService,
              protected movRealizadaService: MovRealizadaService) { 
              }


  ngOnInit(): void {
  
    this.activatedRoute.data.subscribe(
      (sucess: { resolveFechamento: any[] }) => {

        this.arFechamentosMensais = sucess.resolveFechamento; 
        this.selectedMesAno = this.arFechamentosMensais[0].dataReferencia.toString(); 
        
        var d = new Date(this.selectedMesAno);
        var dataVencIni = DateConvert.formatDateYYYYMMDD(new Date(d.getFullYear(), d.getMonth(), 1), '-');
        var dataVencFim = DateConvert.formatDateYYYYMMDD(new Date(d.getFullYear(), d.getMonth()+1, 0), '-');

        this.movPrevistaService.getByDataVencimento(dataVencIni, dataVencFim).subscribe(
          success=>{
            this.movPrevistaGroupBy(success);

            this.movRealizadaService.GetMaxGroupBySaldoConta(dataVencFim).subscribe(
              success=>{
                this.arMovReal=success;
                this.addArrayFormReal();
                this.alteraLayout(10);       
              }
            )
          }
        );
      });
  }

  firstNext(){
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

  onChange(seconds){
    this.alteraLayout(seconds);
    this.populaTela(new Date(this.selectedMesAno)); 
  }


  execute(){
       this.fechamentoService.putBody({dataReferencia:DateConvert.formatDateYYYYMMDD(this.fechamentoModel.dataReferencia, '-'), 
                                       status:this.fechamentoModel.status=="A"? "F":"A"}).subscribe(
                                          sucess=>{
                                                this.fechamentoService.getAll().subscribe(
                                              sucess=> {
                                                this.arFechamentosMensais = sucess;
                                                this.selectedMesAno =null;
                                                this.alteraLayout(10);
                                              }
                                            );                                            
                                          });
  }


  private alteraLayout(seconds){
    var interval = setInterval(()=>{
      this.fechamentoModel = this.getFechamentoModel(this.selectedMesAno);
      if (this.fechamentoModel != null){
        this.labelButton = this.fechamentoModel.status=="A"? "Fechar": "Reabrir";
        this.status = this.fechamentoModel.status;
        this.descricaoStatus = this.fechamentoModel.descricaoStatus;
        this.setValueChecks(this.fechamentoModel.status=="A"? "": "TRUE");
        this.myStepper.linear = this.fechamentoModel.status=="A"? true: false;
        this.myStepper.selectedIndex=this.fechamentoModel.status=="F"? 2: 0;
      }
      
      //só pára de executar o getFechamentoModel() quando o mês/ano estiver selecionado no dropdown..
      if(this.selectedMesAno!=null){clearInterval(interval)}},seconds);
  }

  private getFechamentoModel(mesAno):FechamentoModel{
    var f = null;
    if (mesAno!=null){
        f = this.arFechamentosMensais.filter(x=>DateConvert.formatDateYYYYMMDD(x.dataReferencia, '-')==DateConvert.formatDateYYYYMMDD(mesAno, '-'))[0];
    }
    return f;
  }    

  private populaTela(dataReferencia: Date){
    var dataIni = DateConvert.formatDateYYYYMMDD(
                    new Date(dataReferencia.getFullYear(), dataReferencia.getMonth(), 1), '-');
    var dataFim = DateConvert.formatDateYYYYMMDD(dataReferencia, '-');

    this.movPrevistaService.getByDataVencimento(dataIni, dataFim).subscribe(
      sucess=>{this.arMovPrev = sucess;
               this.movPrevistaGroupBy(this.arMovPrev);
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
      this.arFormsReal.push(this.formBuilder.group({
        conta:[e.conta.descricao],
        dataSaldo:[e.dataSaldo],
        valor:[e.valor],
        isChecked:[""]})
        )
    })
  }

}