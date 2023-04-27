import { Directive, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { GenericResourceModel } from "../../_models/generic-resource-model";
import { GenericResourceService } from "../../_services/generic-resource-service";

@Directive()
export abstract class GenericResourceDropDownComponent<T extends GenericResourceModel> {
    
  @Input('form-group') formGroupResource: FormGroup;
  @Input('form-control') formControl: FormControl;
  @Input('disabled') isDisabled: boolean;
  @Input('select-by-status') status: boolean;
  @Input('placeholder') placeholder:string;
  @Input('input-id') inputId :string;
  @Output('OnChange') _onChange = new EventEmitter(); 
  @Output('OnClear') _onClear = new EventEmitter(); 
    

  arResourceModel: T[] = []; 
  arResourceModelAux: T[] = [];
  resourceModel: T;
  _id: number;

    constructor(protected resourceService: GenericResourceService<T>) {

        this.resourceService.getAll().subscribe(
        sucess=>{
          //debugger;
          this.arResourceModel = sucess;
          this.arResourceModelAux = sucess;
          this.filtrarPorStatus(this.status); 
        }
      );
    }

    onChange(){
      //debugger;
      this.parseToNumber(this.formControl.value);
      //enviando o objeto para o componente pai..
      var _id = this.formControl.value;
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
       // this.arResourceModel = this.arResourceModel.filter(r=>r.status==status);
      }  
    }
  
    parseToNumber(propertyName: string) {
      this._id = null;
      if(this.formControl.value != null){
        this._id = Number(this.formControl.value);
      }
      this.formControl.setValue(this._id);
    }

    onClear(){
      this._onClear.emit();
    }
}