import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  arFormasPagamento:FormaPagamento[];
  id:number=1;
  
  constructor(private activatedRouter: ActivatedRoute,
              private formaPagamentoService: FormaPagamentoService) { }
  

  ngOnInit(): void {
    this.formaPagamentoService.getAll().subscribe(
      (result) => {
        this.arFormasPagamento = result;
        this.arFormasPagamento.filter(f => f.status == true);
      }
    );
    this.movPrevistaControlesList();
  }

  private movPrevistaControlesList(){
    this.activatedRouter.data.subscribe(
      (sucess:{resolveMovPrevControl:MovimentacaoPrevista[]})=>{
        debugger;
        this.arMovPrevistaControles = sucess.resolveMovPrevControl;
      }
    )
  }

}
