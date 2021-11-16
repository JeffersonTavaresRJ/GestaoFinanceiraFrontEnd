import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';
import { MovimentacaoPrevista } from '../../_models/mov-prevista-model';

@Component({
  selector: 'app-mov-prevista-form-controles',
  templateUrl: './mov-prevista-form-controles.component.html',
  styleUrls: ['./mov-prevista-form-controles.component.css']
})
export class MovPrevistaFormControlesComponent implements OnInit {

  arMovPrevistaControles:MovimentacaoPrevista[];
  movimentacaoPrevista: MovimentacaoPrevista;
  movimentacaoPrevistaAux: MovimentacaoPrevista;
  arFormasPagamento:FormaPagamento[];
  arStDate:string[];
  dataIni:Date;
  dataFim:Date;
  nrTotalParcelas:number;
  nrParcela:number;

  tipoRecorrencia:string;
  
  constructor(private activatedRouter: ActivatedRoute,
              private formaPagamentoService: FormaPagamentoService) { }
  

  ngOnInit(): void {
    debugger;
    this.activatedRouter.queryParams.subscribe(
      params=>{
        this.arStDate = params.dataIni.split('-');
        this.dataIni=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
        this.arStDate = params.dataFim.split('-');;
        this.dataFim = new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
      }
    );

    this.formaPagamentoService.getAll().subscribe(
      (result) => {
        this.arFormasPagamento = result;
        this.arFormasPagamento.filter(f => f.status == true);
      }
    );
    this.movPrevistaControlesList();
  }

  gerarRecorrencias(){ 
    this.arMovPrevistaControles = MovimentacaoPrevista.gerarRecorrencias(this.arMovPrevistaControles[0], this.nrTotalParcelas-1);  
  }

  private movPrevistaControlesList(){
    this.activatedRouter.data.subscribe(
      (sucess:{resolveMovPrevControl:MovimentacaoPrevista[]})=>{
        //debugger;
        this.arMovPrevistaControles = sucess.resolveMovPrevControl;
        this.tipoRecorrencia = sucess.resolveMovPrevControl[0].tipoRecorrencia;
      }
    )
  }

}
