export class Reports{

    static download(data: any, type:string, filename: string){

        var blob = null;

        if (type=="EXCEL"){
            blob = new Blob([data],{ type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            filename+=".xlsx";

            var url = window.URL.createObjectURL(blob);
            var downloadLink = document.createElement("a");
            downloadLink.href = url;

            downloadLink.download = filename;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    } 
   
}