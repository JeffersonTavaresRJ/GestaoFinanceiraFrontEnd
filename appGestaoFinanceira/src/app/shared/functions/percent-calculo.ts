export class PercentCalculo{

    static calcularPercentual(ValorAtual: number=0, ValorAnterior: number=0): number{
        var percentual = (ValorAtual-ValorAnterior) / (ValorAnterior==0 ? (ValorAtual==0 ? 1 : ValorAtual) : ValorAnterior);
        return percentual==-1 ? 0 : percentual;
    }
   
}