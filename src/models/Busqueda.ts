export class Busquedas{
    lista: Busqueda[] = [];

    constructor(data: [{ [x: string]: any; }]){
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const opcion = data[i][j];
                let info = new Busqueda();
                switch(i) { 
                    case 0: { 
                        info.id          = opcion['Id_carrera'];
                        info.nombre      = opcion['nombre_carrera'];
                        info.imagen      = opcion['imagen_carrera'];
                        info.tipo        = "carrera"; 
                        break; 
                    } 
                    case 1:
                    case 2: { 
                        info.id          = opcion['Id_carrera'];
                        info.nombre      = opcion['Nombre'];
                        info.imagen      = opcion['Icono'];
                        info.tipo        = "herramienta"; 
                       break; 
                    }
                    case 3: { 
                        info.id          = opcion['Id_carrera'];
                        info.nombre      = opcion['Nombre'];
                        info.imagen      = opcion['Titulo'];
                        info.tipo        = "apunte"; 
                       break; 
                    } 
                    default: { 
                        info.id          = -1;
                        info.nombre      = "";
                        info.imagen      = "";
                        info.tipo        = ""; 
                       break; 
                    } 
                } 
                this.lista.push(info);
            }
        }
    }
}

class Busqueda{
    id:     number;
    imagen: string;
    nombre: string;
    tipo:   string;

    constructor(data?: { [x: string]: any; }){
        this.nombre = data && data['nombre'] || "";
        this.imagen = data && data['imagen'] || "";
        this.tipo   = data && data['tipo']   || "";
        this.id     = data && data['id']     || -1;
    }

}