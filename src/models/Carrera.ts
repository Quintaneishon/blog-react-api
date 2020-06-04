export class Carrera {
    id: number;
    nombre: string;
    imagen: string;
    herramientas: Herramienta[] = [];
    cursos: Curso[] = [];
    ranking: Escuela[] = [];
    materias: Materia[]=[]; 

    constructor(data: any[]) {
        for(let i=0; i < data[1].length ; i++){
            this.herramientas.push(new Herramienta(data[1][i]));
        }
        for(let i=0; i < data[3].length ; i++){
            this.cursos.push(new Curso(data[3][i]));
        }
        for(let i=0; i < data[4].length ; i++){
            this.ranking.push(new Escuela(data[4][i]));
        }
        for (let j=0; j < data[2].length; j++) {
            let esta = -1;
            for (var i=0; i < this.materias.length; i++) {
                if (this.materias[i].id === data[2][j].Id_materia[0]) {
                    esta = i;
                }
            }
            if(esta > -1){
                this.materias[esta].apuntes.push(new Apunte(data[2][j].Imagen,data[2][j].Nombre));
            }else{
                this.materias.push(new Materia(data[2][j]));
                // materias.push({id:data[j].Id_materia[0],titulo:data[j].Titulo,nombre:[data[j].Nombre],dificultad:data[j].Dificultad,imagen:[data[j].Imagen]});
            }
        }
    

        this.id = data[0][0].Id_carrera;
        this.nombre = data[0][0].nombre_carrera;
        this.imagen = data[0][0].imagen_carrera;
    }

}

class Herramienta {
    id:number;
    nombre:string;
    icono:string;
    link:string;
    descripcion:string;
    pros:string;
    contras:string;
    costo:boolean;

    constructor(data: { [x: string]: any; }){
        this.id          = data['Id_herramienta'];
        this.nombre      = data['Nombre'];
        this.icono       = data['Icono'];
        this.link        = data['Link'];
        this.descripcion = data['Descripcion'];
        this.pros        = data['Pros'];
        this.contras     = data['Contras'];
        this.costo       = data['Costo'];
    }
}

class Curso {
    id:number;
    nombre:string;
    imagen:string;
    link:string;
    descripcion:string;
    costo:boolean;

    constructor(data: { [x: string]: any; }){
        this.id          = data['Id_curso'];
        this.nombre      = data['Nombre'];
        this.imagen      = data['Imagen'];
        this.link        = data['Link'];
        this.descripcion = data['Descripcion'];
        this.costo       = data['Costo'];
    }
}

class Materia{
    id:number;
    titulo:string;
    dificultad:number;
    apuntes:Apunte[];

    constructor(data:{Id_materia:number[],Titulo:string,Dificultad:number,Imagen:string,Nombre:string}){
        this.id         = data.Id_materia[0];
        this.titulo     = data.Titulo;
        this.dificultad = data.Dificultad;
        this.apuntes    = [new Apunte(data.Imagen,data.Nombre)];
    }

}

class Apunte {
    imagen:string;
    nombre:string;

    constructor(imagen:string,nombre:string){
        this.imagen = imagen;
        this.nombre = nombre;
    }
}

class Escuela {
    nombre:string;
    link:string;
    posicion:number;

    constructor(data: { [x: string]: any; }) {
        this.nombre   = data['Nombre'];
        this.link     = data['Link'];
        this.posicion = data['Posicion'];
    }
}