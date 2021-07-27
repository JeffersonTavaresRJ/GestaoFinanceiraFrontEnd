import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/features/cadastros-basicos/_services/categoria-service';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';
import { ItemMovimentacaoService } from 'src/app/features/cadastros-basicos/_services/item-movimentacao-service';
import { MovimentacaoPrevista } from '../../../_models/mov-prevista-model';

@Component({
  selector: 'app-mov-prevista-consulta-list',
  templateUrl: './mov-prevista-consulta-list.component.html',
  styleUrls: ['./mov-prevista-consulta-list.component.css']
})
export class MovPrevistaConsultaListComponent implements OnInit {

  actResourceRoute: ActivatedRoute;
  itemMovimentacaoService: ItemMovimentacaoService;
  categoriaService: CategoriaService;
  formaPagamentoService: FormaPagamentoService;

  pDataVencIni: Date=null;
  pDataVencFim: Date=null;
  pTipo: string=null;
  pPrioridade: string=null;
  pCategoria: string=null;
  pItemMovimentacao: string=null;
  pFormaPagamento: string=null;

  tipos:{key,value}[];

  movPrevistas: MovimentacaoPrevista[];
  
  constructor(protected injector: Injector) { 
    this.actResourceRoute = injector.get(ActivatedRoute);
    this.categoriaService = injector.get(CategoriaService);
    this.itemMovimentacaoService = injector.get(ItemMovimentacaoService);
    this.formaPagamentoService = injector.get(FormaPagamentoService);
  }

  ngOnInit(): void {
    this.carregaParametros();
    this.movPrevistaList();
  }

  carregaParametros(){
    debugger;
    this.pDataVencIni = this.actResourceRoute.snapshot.params.dataVencIni;
    this.pDataVencFim = this.actResourceRoute.snapshot.params.dataVencFim;

    if(this.actResourceRoute.snapshot.queryParams['idTipo']){
      this.itemMovimentacaoService.getAllTipo().subscribe(
        (tipos)=> {
          this.tipos=tipos;
          this.pTipo = this.tipos.filter(t=>t.key==this.pTipo).map(t=>t.value)[0];
        }
      );      
    }    


    if(this.actResourceRoute.snapshot.queryParams['idCategoria']){
      this.categoriaService.getById(this.actResourceRoute.snapshot.params.idCategoria).subscribe(
        (categoria)=>this.pCategoria = categoria.descricao
      );
    }

    if(this.actResourceRoute.snapshot.queryParams['idItemMov']){
      this.itemMovimentacaoService.getById(this.actResourceRoute.snapshot.params.idItemMov).subscribe(
        (itemMov)=>this.pItemMovimentacao = itemMov.descricao
      );
    }

    if(this.actResourceRoute.snapshot.queryParams['idFormaPagto']){
      this.formaPagamentoService.getById(this.actResourceRoute.snapshot.params.idFormaPagto).subscribe(
        (formaPagto)=>this.pFormaPagamento = formaPagto.descricao
      );
    }

  }

  movPrevistaList(){
    this.actResourceRoute.data.subscribe(
      (sucess:{resolveResources:MovimentacaoPrevista[]})=>{
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.movPrevistas=sucess.resolveResources
      }
    );   
  }

}
