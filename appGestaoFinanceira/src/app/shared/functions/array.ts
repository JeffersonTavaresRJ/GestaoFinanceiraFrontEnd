export class ArrayGeneric{

    static GroupBy(arr, chave):any[] {
        return arr.reduce(function(acumulador, objeto){
            if(!acumulador[objeto[chave]]){
                acumulador[objeto[chave]] = [];
            }
            acumulador[objeto[chave]].push(objeto);
            return acumulador;
        })
    } 
   
}