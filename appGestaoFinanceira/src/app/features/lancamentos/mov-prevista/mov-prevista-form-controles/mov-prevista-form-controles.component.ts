import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';

@Component({
  selector: 'app-mov-prevista-form-controles',
  templateUrl: './mov-prevista-form-controles.component.html',
  styleUrls: ['./mov-prevista-form-controles.component.css']
})
export class MovPrevistaFormControlesComponent implements OnInit {

  arMovPrevistaControles:any[];
  arFormasPagamento:FormaPagamento[];
  
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
      (sucess:{resolveMovPrevControl:any[]})=>{
        this.arMovPrevistaControles = sucess.resolveMovPrevControl;
      }
    )
  }

}
