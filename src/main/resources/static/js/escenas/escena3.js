gameState = {
    colorVerde: 0xaaffaa,
    colorRojo: 0xffaaaa,
    width: 64, 
    height: 36,
    prueba: 0
}; 
//var conj;

class Cell {
    constructor (grid, x, y) {
        this.res = 22.45;
        
        this.tile = grid.add.image((y*this.res),(x*this.res),"tileT").setScale(1.45);
        this.tile.setInteractive();

        grid.board.add(this.tile);
    }
}   

class Grid
{
    
    constructor (scene)
    {  
        this.scene = scene; 
        //this.socket = scene.socket;

        this.size = gameState.width * gameState.height;
        this.offset = new Phaser.Math.Vector2(12, 55);

        // scene.add.container(escena, posx, posy, [hijos])
        this.board = this.scene.add.container (45, 55);   // 930, 530
        
        //this.board.setScrollFactor(1, 1);

        this.createCells();

        let posx = scene.add.text(1500 , 900,"X: ", { fill: "#222222", font: "40px Times New Roman"});
        let posy = scene.add.text(1500 , 1000,"Y: ", { fill: "#222222", font: "40px Times New Roman"});
        let indx = scene.add.text(1700 , 900,"iX: ", { fill: "#222222", font: "40px Times New Roman"});
        let indy = scene.add.text(1700 , 1000,"iY: ", { fill: "#222222", font: "40px Times New Roman"});
        /*
        let indiceprueba = scene.add.text(1700 , 800,"i: ", { fill: "#222222", font: "40px Times New Roman"});
        let pruebasi = scene.add.text(1500 , 800,"T: " + gameState.prueba, { fill: "#222222", font: "40px Times New Roman"});
        
        let indice = 0;
        
        scene.socket.onmessage = function(event) {
            //gameState.prueba ++;
  
            indice = parseInt(event.data);
            
            let celda1 = this.board.getAt(1);

            // this.board.getAt(1).setTint(0xff44ff);

            indiceprueba.setText("i: " + indice);

            celda1.setTint(0xff44ff);

            //pruebasi.setText("T1: " + prueba);            
        }*/

        for (let l=0 ; l<this.size; l++) {
            let celda = this.board.getAt(l);
            //let par = 0;
            celda.on('pointerdown', function()
            {
                //if (par % 3 === 0){
                    celda.setTint(0x44ff44);
                //    par++;
                //} else if (par % 3 === 1) {
                //    celda.setTint(0xff44ff);
                //    par++;
                //} else {
                //    celda.clearTint();
                //    par++;
                //}
                posx.setText("X: "+ Phaser.Math.RoundTo(celda.x, 0) );
                posy.setText("Y: "+ Phaser.Math.RoundTo(celda.y, 0) );       
                indx.setText("iX: "+ Phaser.Math.ToXY(l, gameState.width, gameState.height).x);  // this.board.getIndex(celda) 
                indy.setText("iY: "+ Phaser.Math.ToXY(l, gameState.width, gameState.height).y);
                this.scene.enviarMensage(l.toString());
            });
            //celda.on('pointerout', function()
            //{
            //    celda.clearTint();
            //});
        }

        


        // posicion child
        // const p = container.localTransform.transformPoint(sprite.x, sprite.y);

    }

    createCells ()
    {   
        for (var i = 0; i < gameState.height; i++) {
            for (var j = 0; j< gameState.width; j++) {
                new Cell(this,i,j);
            }
        }
    }
    /*
    agregarMensaje(indice) {
        gameState.prueba ++;

        //let celda = this.board.getAt(indice);

        //celda.setTint(0xff44ff);

        //celda.setTint(0xff44ff);

        //celda.clearTint();

    }*/

    /*
    getCell (index)
    {
        const pos = Phaser.Math.ToXY(index, this.width, this.height);      // transforma un numero index a su ubicacion en una matrix XY

        return this.data[pos.x][pos.y];
    }*/
    /*
    getCellXY (x, y)
    {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height)
        {
            return null;
        }

        return this.data[x][y];
    }*/
}

class escena3 extends Phaser.Scene {

    constructor() {
        super({key: "tablero"});  // nombre de escena
    }
    
    preload() {
        this.load.image("tileT",".//assets/tilesets/tileT.png");
        this.load.image("Fondo1",".//assets/fondo.png");
    }

    create() {  
        var fondo = this.add.image(960,540,"Fondo1");
        fondo.setScale(1);

        let indiceprueba = this.add.text(1700 , 800,"i: ", { fill: "#222222", font: "40px Times New Roman"});
        let pruebasi = this.add.text(1500 , 800,"T: " + gameState.prueba, { fill: "#222222", font: "40px Times New Roman"});

        this.socket = new WebSocket('http://26.169.248.78:8080/game'); // http://26.169.248.78:8080/game  ws://localhost:8080/game
        
        // this.grid = new Grid(this); 
        /*
        this.socket.onmessage = function(event) {
            gameState.prueba = event.data;
            indiceprueba.setText("i: " + event.data);
            //this.grid.agregarMensaje(event.data);        // hacer funcionalidad directamente aca si es posible
        };*/

        this.size = gameState.width * gameState.height;
        this.offset = new Phaser.Math.Vector2(12, 55);

        this.board = this.add.container (45, 55);

        for (var i = 0; i < gameState.height; i++) {
            for (var j = 0; j< gameState.width; j++) {
                new Cell(this,i,j);
            }
        }

        let posx = this.add.text(1500 , 900,"X: ", { fill: "#222222", font: "40px Times New Roman"});
        let posy = this.add.text(1500 , 1000,"Y: ", { fill: "#222222", font: "40px Times New Roman"});
        let indx = this.add.text(1700 , 900,"iX: ", { fill: "#222222", font: "40px Times New Roman"});
        let indy = this.add.text(1700 , 1000,"iY: ", { fill: "#222222", font: "40px Times New Roman"});
        
        let indice = 0;
        
        this.pintarCelda(1);
        
        this.socket.onmessage = (event) => {
            indice = parseInt(event.data);
            indiceprueba.setText("i: " + indice);

            this.pintarCelda(event.data);
            //this.pintarCelda(event.data);

            //let celda1 = this.board.getAt(1);
            //celda1.setTint(0xff44ff);
            // this.board.getAt(1).setTint(0xff44ff);

            pruebasi.setText("T1: " + indice);            
        }

        for (let l=0 ; l<this.size; l++) {
            let celda = this.board.getAt(l);
            celda.on('pointerdown', function() {
                celda.setTint(0x44ff44);
                posx.setText("X: "+ Phaser.Math.RoundTo(celda.x, 0) );
                posy.setText("Y: "+ Phaser.Math.RoundTo(celda.y, 0) );       
                indx.setText("iX: "+ Phaser.Math.ToXY(l, gameState.width, gameState.height).x);  // this.board.getIndex(celda) 
                indy.setText("iY: "+ Phaser.Math.ToXY(l, gameState.width, gameState.height).y);
                this.scene.enviarMensage(l.toString());
            });
        }


    }

    pintarCelda(indice1){
        let posxs = this.add.text(1500 , 850,"X: ", { fill: "#222222", font: "40px Times New Roman"});
        //this.pruebasi.setText("T1: " + indice1); 
        let celda1 = this.board.getAt(indice1);
        celda1.setTint(0xff44ff);
        posxs.setText("Y: ");
    }

    update() {
    }

    // inputs HTML
    /*
    createChatInputs() {
        const { width } = this.cameras.main;

        // input
        this.usernameInput = document.createElement('input');
        this.usernameInput.type = 'text';
        this.usernameInput.id = 'chat-username';
        this.usernameInput.placeholder = 'Tu nombre';
        this.usernameInput.maxLength = 20;
        this.usernameInput.style.cssText = `
            position: absolute;
            left: 50px;
            bottom: 120px;
            width: 200px;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #667eea;
            border-radius: 5px;
        `;
        document.body.appendChild(this.usernameInput);

        // input
        this.messageInput = document.createElement('input');
        this.messageInput.type = 'text';
        this.messageInput.id = 'chat-message';
        this.messageInput.placeholder = 'Escribe tu mensaje...';
        this.messageInput.maxLength = 100;
        this.messageInput.style.cssText = `
            position: absolute;
            left: 50px;
            bottom: 60px;
            width: 500px;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #667eea;
            border-radius: 5px;
        `;
        document.body.appendChild(this.messageInput);

        // boton
        this.sendButton = document.createElement('button');
        this.sendButton.textContent = 'Enviar';
        this.sendButton.style.cssText = `
            position: absolute;
            left: 570px;
            bottom: 60px;
            padding: 10px 30px;
            font-size: 16px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        document.body.appendChild(this.sendButton);

        // boton
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });
        // enter
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        this.domElements = [this.usernameInput, this.messageInput, this.sendButton];
    }*/
    /*
    conectarWebSocket() {
        //const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';  
        //const host = window.location.host;    // para que son necesarias estas 2 lineas?
        
        this.socket = new WebSocket('ws://localhost:8080/game'); // http://26.169.248.78:8080/game

        // al recivir
        this.socket.onmessage = function(event) {
            this.addMessage(event.data);        // hacer funcionalidad directamente aca si es posible
        };
    }

    connectWebSocket() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        
         this.socket = new WebSocket('ws://localhost:8080/game'); // http://26.169.248.78:8080/game

        // al recivir
        this.socket.onmessage = (event) => {
            this.addMessage(event.data);
        };
    }*/

    enviarMensage(indice) {
        /*
        if (!corx) {
            alert('falta x');
            return;
        }

        if (!cory) {
            alert('falta y');
            return;
        }*/

        //const mensajeCompleto = `${corx}, ${cory}`;
        this.socket.send(indice);
        /*
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            const fullMessage = `${username}: ${message}`;
            this.socket.send(fullMessage);
            this.messageInput.value = '';
        } else {
            alert('No servidor');
        }*/
    }
    /*
    sendMessage() {
        const username = this.usernameInput.value.trim();
        const message = this.messageInput.value.trim();

        if (!username) {
            alert('falta nombre');
            return;
        }

        if (!message) {
            alert('falta mensaje');
            return;
        }

       if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            const fullMessage = `${username}: ${message}`;
            this.socket.send(fullMessage);
            this.messageInput.value = '';
        } else {
            alert('No servidor');
        }
    }*/
    /*
    agregarMensaje(indice) {
        let celda = this.grid.board.getAt(indice);
        let par = 0;
        if (par % 3 === 0){
            celda.setTint(0x44ff44);
            par++;
        } else if (par % 3 === 1) {
            celda.setTint(0xff44ff);
            par++;
        } else {
            celda.clearTint();
            par++;
        }
    }*/
    /*
    addMessage(text) {
        const messageText = this.add.text(100, this.messageY, text, {
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 10, y: 5 },
            wordWrap: { width: 1200 }
        });
        this.messages.push(messageText);
        this.messageY += 35;

        if (this.messages.length > 20) {
            const oldMessage = this.messages.shift();
            oldMessage.destroy();

            this.messages.forEach(msg => {
                msg.y -= 35;
            });

            this.messageY -= 35;
        }
    }*/

    shutdown() {
        // Cerrar WebSocket
        if (this.socket) {
            this.socket.close();
        }
        if (this.domElements) {
            this.domElements.forEach(element => {
                if (element && element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        }
    }
}

