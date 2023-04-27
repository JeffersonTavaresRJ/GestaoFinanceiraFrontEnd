import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemMovimentacaoService } from '../../cadastros-basicos/_services/item-movimentacao-service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-movimentacao-mensal',
  templateUrl: './item-movimentacao-mensal.component.html',
  styleUrls: ['./item-movimentacao-mensal.component.css']
})
export class ItemMovimentacaoMensalComponent implements OnInit {

  arItemMovMensal: any[];
  arTipos:any[];
  formGroup: FormGroup;

  constructor(private actResourceRoute: ActivatedRoute,
              private itemMovimentacaoService: ItemMovimentacaoService,
              protected formBuilder :FormBuilder) { 
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveItemMovMensal: any[] }) => {
                 this.arItemMovMensal = sucess.resolveItemMovMensal;
                 console.log(this.arItemMovMensal);

                 this.itemMovimentacaoService.getAllTipo().subscribe(      
                  (tipos)=> this.arTipos=tipos);
                        
      }
    );
  }

  ngOnInit(): void {
    this.builderForm();
  }

  onChange():void{

  }

  private builderForm() {
    this.formGroup = this.formBuilder.group({
      idCategoria: [null],
      idItemMovimentacao: [null]
    });
  }

}
