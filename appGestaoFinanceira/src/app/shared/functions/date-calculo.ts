export class DateCalculo{

    static totalMeses(dateIni: Date, dateFim: Date):Number {
        var year = (dateFim.getFullYear() - dateIni.getFullYear())*12;
        var month = dateFim.getMonth() - dateIni.getMonth();
        return year+month; 
    }

    static lastDay(date: Date){
        return new Date(date.getFullYear(), date.getMonth()+1, 0);
    }
}