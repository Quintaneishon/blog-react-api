export class Carrera {
    id: number;
    nombre: string;
    imagen: string;
    herramientas: Herramienta[] = [];
    cursos: Curso[] = [];
    ranking: Escuela[] = [];
    materias: Materia[]=[]; 
    tipo: String = '';

    constructor ( data: { [x: string]: any; } ){
        this.id     = data['Id_carrera'];
        this.nombre = data['nombre_carrera'];
        this.imagen = data['imagen_carrera'];
    }

    set Herramientas( data: [ { [x: string]: any; }] ){
        data.forEach( (herr) => {
            const herramienta = new Herramienta(herr);
            this.herramientas.push(herramienta);
        })
    }

    set Materias( data: [ { [x: string]: any; }] ){
        for (let j=0; j < data.length; j++) {
            let esta = -1;
            for (var i=0; i < this.materias.length; i++) {
                if (this.materias[i].id === data[j].Id_materia) {
                    esta = i;
                }
            }
            if(esta > -1){
                this.materias[esta].apuntes.push(new Apunte(data[j].Imagen,data[j].Titulo));
            }else{
                this.materias.push(new Materia(data[j]));
            }
        }
    }

    set Cursos( data: [ { [x: string]: any; }] ){
        data.forEach( (cur) => {
            const curso = new Curso(cur);
            this.cursos.push(curso);
        })
    }

    set Ranking( data: [ { [x: string]: any; }] ){
        data.forEach( (es) => {
            const escuela = new Escuela(es);
            this.ranking.push(escuela);
        })
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
    nombre:string;
    dificultad:number;
    apuntes:Apunte[];

    constructor(data: { [x: string]: any; }){
        this.id         = data.Id_materia;
        this.nombre     = data.Nombre;
        this.dificultad = data.Dificultad;
        this.apuntes    = [new Apunte(data.Imagen,data.Titulo)];
    }

}

class Apunte {
    imagen:string;
    titulo:string;

    constructor(imagen:string,titulo:string){
        this.imagen = imagen;
        this.titulo = titulo;
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