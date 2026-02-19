gameState = {
    colorVerde: 0xaaffaa,                       //
    colorRojo: 0xffaaaa,                        //
    ancho: 64,                                  // cantidad de celdas horizontales
    alto: 36                                    // cantidad de celdas verticales
}; 

class Celda {                                   // calse celda para grilla
    constructor (grid, x, y) {                  // grid = escena donde se crean, indices para posiciones x e y
        this.res = 22.45;                       // escala de posiciones
                                                // añade imagen en posicion correspondiente a indices con escalas aplciadas
        this.tile = grid.add.image((y*this.res),(x*this.res),"tileT").setScale(1.45);  // tambien escala la imagen
        this.tile.setAlpha(0.5);                // ajuste de opacidad para celdas de grilla
        this.tile.setInteractive();             // se setea interactivo para poder darle interaccion con mouse despues
                                                // se le podria dar interaccion aca pero no esta probado
        grid.tablero.add(this.tile);            // agrega la imagen creada a el tablero
    }
}   

class escena3 extends Phaser.Scene {

    constructor() {
        super({key: "partida"});                // nombre de escena
    }
                                                // carga de assets
    preload() {                                 // fondo, escenario, tile, dronN, dronA, portaN, portaA, explosiones // ver cohete despues
        this.load.image("tileT",".//assets/tilesets/tileT.png");
        this.load.image("Fondo1",".//assets/fondo.png");
    }

    create() {  
        var fondo = this.add.image(960,540,"Fondo1");   // creacion de fondo en posicion    // podria calcularse centro despues
        fondo.setScale(1);                              // seteo de escala de fondo, hecho a medida, escala 1

        let indice = 0;                                 // indice para pruebas de posiciones de modifciaciones de celdas
                                                        // crecion de textos de control de variables y eventos
        let indiceprueba = this.add.text(1700 , 800,"i: ", { fill: "#222222", font: "40px Times New Roman"});
        let pruebasi = this.add.text(1500 , 800,"T: " + gameState.prueba, { fill: "#222222", font: "40px Times New Roman"});
        let posx = this.add.text(1500 , 900,"X: ", { fill: "#222222", font: "40px Times New Roman"});
        let posy = this.add.text(1500 , 1000,"Y: ", { fill: "#222222", font: "40px Times New Roman"});
        let indx = this.add.text(1700 , 900,"iX: ", { fill: "#222222", font: "40px Times New Roman"});
        let indy = this.add.text(1700 , 1000,"iY: ", { fill: "#222222", font: "40px Times New Roman"});
                                                        // creacion de conexion a websocket
        this.socket = new WebSocket('http://26.169.248.78:8080/game'); // http://26.169.248.78:8080/game  ws://localhost:8080/game

        this.size = gameState.ancho * gameState.alto;   // usado para asignar intreraccion a celdas en un for // puede remplazarse

        this.tablero = this.add.container (45, 55);     // creaccion de elemento container que almacenara las celdas 

        for (var i = 0; i < gameState.alto; i++) {      // creacion de celdas en for anidado
            for (var j = 0; j< gameState.ancho; j++) {  // indeces i y j siven para calcular posicion correspondiente x e y
                new Celda(this,i,j);                    // al crearse la celda se agrega sola a container tablero
            }
        } 
        
        this.socket.onmessage = (event) => {            // arrow function conserva this de objeto padre o donde se invoca
            indice = parseInt(event.data);              // event.data contiene string mensaje de logica, lo parseamos a int para indice
            indiceprueba.setText("i: " + indice);       // texto de variable de prueba i indice antes de pintar
                                                        // una forma mas corta que funciona pero pintarcelda puede ser util
            //this.tablero.getAt(event.data).setTint(0xff44ff);
            this.pintarCelda(event.data);               // llama a pintar celda donde se cambia el tint de la celda con ese indice

            pruebasi.setText("T1: " + indice);          // texto de variable de prueba i indice luego de pintar
        }
                                                        // for para asignar a todas la celdas interaccion al clikear
        for (let l=0 ; l<this.size; l++) {              // puede remplazarse en creacion de celda, no probado
            let celda = this.tablero.getAt(l);          // obtenemos la celda del tablero con indice l
            celda.on('pointerdown', function() {        // asigna interaccion al clikear
                celda.setTint(0x44ff44);                // cambia tint de celda
                                                        // textos de variables de prueba X, Y, iX, iY
                posx.setText("X: "+ Phaser.Math.RoundTo(celda.x, 0) );
                posy.setText("Y: "+ Phaser.Math.RoundTo(celda.y, 0) );       
                indx.setText("iX: "+ Phaser.Math.ToXY(l, gameState.ancho, gameState.alto).x);
                indy.setText("iY: "+ Phaser.Math.ToXY(l, gameState.ancho, gameState.alto).y);
                this.scene.enviarMensage(l.toString()); // se envia el mensaje con indice de celda pintada como string
            });
        }
    }

    pintarCelda(indice1){                               // pinta celda 
        let celda1 = this.tablero.getAt(indice1);       // puede hacerse en una linea y sin aux, no probado
        celda1.setTint(0xff44ff);
    }

    enviarMensage(indice) {                             // envia mensaje del indice por websocket
        this.socket.send(indice);
    }

    apagar() {                                        // no usado pero util al acabar partida y volver a menu
        // Cerrar WebSocket
        if (this.socket) {
            this.socket.close();
        }
    }
    
    update() {
    }
}

