import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { Categoria } from '../../_models/categoria-model';
import { ItemMovimentacao } from '../../_models/item-movimentacao-model';
import { CategoriaService } from '../../_services/categoria-service';
import { ItemMovimentacaoService } from '../../_services/item-movimentacao-service';

@Component({
  selector: 'app-item-movimentacao-form',
  templateUrl: './item-movimentacao-form.component.html',
  styleUrls: ['./item-movimentacao-form.component.css']
})
export class ItemMovimentacaoFormComponent extends GenericResourceFormComponent<ItemMovimentacao> {


  constructor(protected injector: Injector,
    protected categoriaService: CategoriaService,
    protected itemMovimentacaoService: ItemMovimentacaoService) {
    super(injector, new ItemMovimentacao(), itemMovimentacaoService, ItemMovimentacao.fromJson, '/item-movimentacao');
  }

  id: number;
  tipos = [];
  categorias: Categoria[]=[];

 ngOnInit() {
   this.itemMovimentacaoService.getAllTipo().subscribe(
      (tipos)=> this.tipos=tipos,
      (error:any)=>this.resourceActionForError(error.message)
    );

    this.categoriaService.getAll().subscribe(
      (categorias)=>{
        if(this.resourceCurrentAction() == 'new'){
          this.categorias = categorias.filter(c=>c.status==true)
        }else{
          this.categorias = categorias
        }
      },
      (error:any)=>this.resourceActionForError(error)
    );
    
     super.ngOnInit();
   }
   

   protected buildResourceForm() {
    this.resourceForm = this.resourceFormBuilder.group({
      id: [null],
      descricao: [null, Validators.required],
      tipo: [null, Validators.required],
      status: [null],
      idCategoria: [null, Validators.required]
    });
  };

  loadResource() {
    if (this.resourceCurrentAction() == 'edit') {
      this.actResourceRoute.data.subscribe(
        (sucess:{resolveResource:ItemMovimentacao})=>{
          //o resolveResource deve ser o mesmo nome na variável resolve da rota.. 
          this.resourceForm.get('id').setValue(sucess.resolveResource.id);
          this.resourceForm.get('descricao').setValue(sucess.resolveResource.descricao);
          this.resourceForm.get('tipo').setValue(sucess.resolveResource.tipo);
          this.resourceForm.get('status').setValue(sucess.resolveResource.status);
          this.resourceForm.get('idCategoria').setValue(sucess.resolveResource.categoria.id);
        },
        (error) => this.resourceActionForError(error)
      );
    }
  }

  resourceCreatePageTitle() {
    return "Novo Item de Movimentação";
  }

  resourceEditPageTitle() {
    return "Editar Item de Movimentação";
  }   

}
