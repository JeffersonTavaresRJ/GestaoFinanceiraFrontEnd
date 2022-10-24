import { GenericResourceModel } from "src/app/shared/_models/generic-resource-model";

export class FechamentoModel extends GenericResourceModel{
    constructor(
        public mesAno: string=null,
        public dataReferencia: Date=null,
        public status: string=null,
        public descricaoStatus: string=null){
        super();
    }

}