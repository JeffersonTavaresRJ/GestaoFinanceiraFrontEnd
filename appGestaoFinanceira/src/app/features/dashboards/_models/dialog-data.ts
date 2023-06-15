export class DialogData{
    constructor(
        public header?: string,
        public backgroundColor?: string,
        public dataItems: DataItems[] = []
       ){}
}

export class DataItems{
    constructor(
        public descricao: string='',
        public valor: number = 0,
        public percentual: number=0
       ){}
}