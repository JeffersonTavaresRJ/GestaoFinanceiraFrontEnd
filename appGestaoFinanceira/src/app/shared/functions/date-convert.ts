export class DateConvert{

    static formatDateDDMMYYYY(date, separador):string {
        date = date + 'T10:11:08.000Z';
        var d = DateConvert.convertDate(date, separador),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
  
        return [day, month, year].join(separador);
        
    }

    static formatDateYYYYMMDD(dateTime, separador):string {
        //dateTime = dateTime + 'T10:11:08.000Z';
        var d = DateConvert.convertDate(dateTime, separador),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join(separador);
    }

    static formatDateMMYYYY(dateTime, separador):string {
        //dateTime = dateTime + 'T10:11:08.000Z';
        var date=DateConvert.convertDate(dateTime, separador),
            month = '' + (date.getMonth() + 1),
            year  = date.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
    
        return [month, year].join(separador);
    }

    static stringToDate(dateTime:string, separador:string):Date{  
      //date = date + 'T10:11:08.000Z'; 
      debugger; 
        var date = dateTime.split("T")[0];//desconsiderando o time da data

        var arrData = date.split(separador);
        if(Number.parseInt(arrData[2]) > 31){
          return new Date(Number.parseInt(arrData[2]), Number.parseInt(arrData[1])-1, Number.parseInt(arrData[0]));
        }
        //console.log('montagem data: '+arrData[0] + '-' + arrData[1] + '-' + arrData[2]);
        return new Date(Number.parseInt(arrData[0]), Number.parseInt(arrData[1])-1, Number.parseInt(arrData[2]));  
    }
    
    static isDateValid(value: any): value is Date {
       return value instanceof Date && !isNaN(value.getTime());
    }

    static convertDate(dateTime: any, separador: string): Date{
        var date=null;
        if (DateConvert.isDateValid(dateTime)){
            date = new Date(dateTime);
        }else{
            date = DateConvert.stringToDate(dateTime, separador);
        }
        return date;
    }
   
}