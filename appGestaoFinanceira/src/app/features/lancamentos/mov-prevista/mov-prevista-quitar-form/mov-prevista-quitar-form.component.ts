import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../../_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-modal-mov-prevista-quitar-form',
  templateUrl: './mov-prevista-quitar-form.component.html',
  styleUrls: ['./mov-prevista-quitar-form.component.css'],
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})

export class MovPrevistaQuitarFormComponent implements OnInit {

  movRealizadaService: MovRealizadaService;
  alertMessageForm: AlertMessageForm;
  actResourceRoute: ActivatedRoute;

  idMovRealizadaDelete: number;  
  movimentacaoRealizada: MovimentacaoRealizada;
  movimentacaoPrevista: MovimentacaoPrevista;

  dataVencIni: string;
  dataVencFim: string;

  nrTotal: number;
  deleteMessage:string;

  arvalidationErrors: any[] = [];
  arForms: FormArray = this.fb.array([]);

  constructor(protected injector: Injector, 
              private fb: FormBuilder) {
    debugger;
    this.movRealizadaService = injector.get(MovRealizadaService);
    this.alertMessageForm = injector.get(AlertMessageForm);
    this.actResourceRoute = injector.get(ActivatedRoute);
  }
 

  ngOnInit(): void {
    debugger;
    this.dataVencIni = this.actResourceRoute.snapshot.params.dataVencIni;
    this.dataVencFim = this.actResourceRoute.snapshot.params.dataVencFim;

    //leitura do resolver da Movimentação Prevista..
    this.actResourceRoute.data.subscribe(
      (sucess:{resolveMovPrev:MovimentacaoPrevista})=>{
        debugger;
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.movimentacaoPrevista=sucess.resolveMovPrev;      
         }
    ); 

    //leitura do resolver das Movimentações Realizadas..
    this.actResourceRoute.data.subscribe(
      (sucess:{resolveMovReal:MovimentacaoRealizada[]})=>{
        debugger;
        //o resolveResources deve ser o mesmo nome na variável resolve da rota..
        if(sucess.resolveMovReal.length==0){
          this.addArForms(0, 
                         this.movimentacaoPrevista.dataVencimento, 
                         null,
                         null, 
                         this.movimentacaoPrevista.valor,
                         true);
          this.nrTotal = this.movimentacaoPrevista.valor;
        }else{
          sucess.resolveMovReal.forEach((element: MovimentacaoRealizada)=>{
            this.addArForms(element.id, 
              element.dataMovimentacaoRealizada, 
              element.conta.id, 
              element.formaPagamento.id, 
              element.valor);
              this.nrTotal += element.valor
          })
        }       
      }
    );
  }

  modalDeleteMessage(id: number, dataMovimentacao: Date) {
    this.idMovRealizadaDelete = id;
    this.deleteMessage = `${'Confirma a exclusão do lançamento referente ao dia '}${DateConvert.formatDateDDMMYYYY(dataMovimentacao, '/').bold()}${'?'}`;;
  }

  eventDelete(event) {
    if (event) {
      this.movRealizadaService.deleteById(this.idMovRealizadaDelete).subscribe(
        sucess => {
          this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
          this.carregarTable();
        },
        error=>{
          this.actionForError(error)
        });
    }
  }

  clearValidations() {
    this.arvalidationErrors = [];
  }

  addRow(){
    if(this.arForms.length< 10){
      this.addArForms(0, 
       this.movimentacaoPrevista.dataVencimento, 
        null,
        null, 
        this.movimentacaoPrevista.valor, 
        true);
    }else{
      this.alertMessageForm.showError("Ultrapassado o limite máximo de 10 registros.", "Sr. Usuário");
    }
    
  }

  editRow(i:number){
  }

  deleteRow(i:number){
    this.arForms.removeAt(i);
  }

  salvar(fGroup:FormGroup){

    if(fGroup.get('id').value==0){
      this.movRealizadaService.post(fGroup).subscribe(
        sucess => {
          this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
          this.carregarTable();
        },
        error=>{
          this.actionForError(error)
        });

    }else{
      this.movRealizadaService.put(fGroup).subscribe(
        sucess => {
          this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
          this.carregarTable();
        },
        error=>{
          this.actionForError(error)
        });
    }    
  }

  private addArForms(_id: number, 
                    _dataMovimentacao: Date, 
                    _idConta: number,
                    _idFormaPagamento: number,
                    _valor: number,
                    _isEdit?: boolean){
    this.arForms.push(this.fb.group({
      id:[_id],
      dataMovimentacaoRealizada:[DateConvert.formatDateDDMMYYYY(_dataMovimentacao, "/"),Validators.required],
      idConta:[_idConta,Validators.required],
      idFormaPagamento:[_idFormaPagamento,Validators.required],
      valor:[_valor,Validators.required],
      isEdit:[_isEdit]
    }));
  }

  private carregarTable(){
    debugger;
    this.movRealizadaService.getByDataReferencia
      (this.movimentacaoPrevista.itemMovimentacao.id, 
       DateConvert.formatDateDDMMYYYY(this.movimentacaoPrevista.dataReferencia, '/')).subscribe( 
         success=>{
                   success.forEach((element:MovimentacaoRealizada)=>{
                    this.addArForms(element.id, 
                      element.dataMovimentacaoRealizada, 
                      element.conta.id, 
                      element.formaPagamento.id, 
                      element.valor);
                   });                                      
                  },
         error=>{
          this.actionForError(error)
        });
                                                       
  } 

  private actionForError(e) {
    if (e.status == 400) {
      //validações da API (BadRequest) 
      this.arvalidationErrors = e.error;
    }
  }

}