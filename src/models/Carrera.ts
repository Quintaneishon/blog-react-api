class Carrera {
    id: number;
    nombre: string;
    imagen: string;
    herramientas: Herramienta[];
    cursos: Cursos[];
    ranking: Escuela[];

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

    constructor(json: { [x: string]: any; }){
        this.id          = json['Id_carrera'];
        this.nombre      = json['Nombre'];
        this.icono       = json['Icono'];
        this.link        = json['Link'];
        this.descripcion = json['Descripcion'];
        this.pros        = json['Pros'];
        this.contras     = json['Contras'];
        this.costo       = json['Costo'];
    }
}

class Curso {
    id:number;
    nombre:string;
    imagen:string;
    link:string;
    descripcion:string;
    costo:boolean;

    constructor(json: { [x: string]: any; }){
        this.id          = json['Id_curso'];
        this.nombre      = json['Nombre'];
        this.imagen      = json['Imagen'];
        this.link        = json['Link'];
        this.descripcion = json['Descripcion'];
        this.costo       = json['Costo'];
    }
}

class Materia{
    id:number;
    titulo:string;
    dificultad:number;
    apuntes:Apunte[];

    constructor(json:{Id_materia:number[],Titulo:string,Dificultad:number,Imagen:string,Nombre:string}){
        this.id         = json.Id_materia[0];
        this.titulo     = json.Titulo;
        this.dificultad = json.Dificultad;
        this.apuntes    = [new Apunte(json.Imagen,json.Nombre)];
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

    constructor(json: { [x: string]: any; }) {
        this.nombre   = json['Nombre'];
        this.link     = json['Link'];
        this.posicion = json['Posicion'];
    }
}