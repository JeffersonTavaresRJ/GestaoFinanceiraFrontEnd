import { Directive, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GenericResourceModel } from "../../_models/generic-resource-model";
import { GenericResourceService } from "../../_services/generic-resource-service";

@Directive()
export abstract class GenericResourceDropDownComponent<T extends GenericResourceModel> {
    
  @Input('formGroup') formGroupResource: FormGroup;
  @Input('formControlName') formControlName: string;
  @Input('disabled') isDisabled: boolean;
  @Input('selectByStatus') status: boolean;
  @Output('OnChange') _onChange = new EventEmitter(); 
  

  arResourceModel: T[] = []; 
  arResourceModelAux: T[] = [];
  resourceModel: T;
  _id: number;

    constructor(protected resourceService: GenericResourceService<T>) {

        this.resourceService.getAll().subscribe(
        sucess=>{
          this.arResourceModel = sucess;
          this.arResourceModelAux = sucess;
          this.filtrarPorStatus(this.status); 
        }
      );
    }

    onChange(){
      this.parseToNumber(this.formControlName);
      //enviando o objeto para o componente pai..
      var _id = this.formGroupResource.get(this.formControlName).value;
      this.resourceModel = this.arResourceModel.filter(x=>x.id==_id)[0];
      this._onChange.emit(this.resourceModel); 
    }


    ngOnChanges(changes: SimpleChanges){
      if(this.arResourceModelAux.length>0){
        this.filtrarPorStatus(changes.status.currentValue);   
      }     
    }

  
    filtrarPorStatus(status: boolean){
      this.arResourceModel = this.arResourceModelAux;
      if(status){
        this.arResourceModel = this.arResourceModel.filter(r=>r.status==status);
      }  
    }
  
    parseToNumber(propertyName: string) {
      this._id = null;
      if(this.formGroupResource.get(propertyName).value != null){
        this._id = Number(this.formGroupResource.get(propertyName).value);
      }
      this.formGroupResource.get(propertyName).setValue(this._id);
    }
}