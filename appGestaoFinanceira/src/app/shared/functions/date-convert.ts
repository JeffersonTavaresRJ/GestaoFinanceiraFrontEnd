export class DateConvert{

    static formatDateDDMMYYYY(date, separador):string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join(separador);
    }

    static formatDateYYYYMMDD(date, separador):string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join(separador);
    }

    static formatDateMMYYYY(date, separador):string {
        debugger;
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [month, year].join(separador);
    }

    static stringToDate(date:string, separador:string):Date{
      var arrData = date.split(separador);
      return new Date(arrData[0] + '-' + arrData[1] + '-' + arrData[2]);             
    }   
   
}