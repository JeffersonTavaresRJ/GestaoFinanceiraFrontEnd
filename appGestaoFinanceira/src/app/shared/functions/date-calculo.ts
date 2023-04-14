export class DateCalculo{

    static totalMeses(dateIni: Date, dateFim: Date):Number {
        var year = (dateFim.getFullYear() - dateIni.getFullYear())*12;
        var month = dateFim.getMonth() - dateIni.getMonth();
        return year+month; 
    }   
   
}