//Variabler oprettes
let players = [];
let squareX = [];
let colors = ["red", "yellow", "green", "purple"];
let color;
let playerColors = ["white", "darkgreen", "blue", "pink", "indigo"];
let gameOver;
let category = [];
let answer = [];
let diceBtn;
let answerBtn;
let turns;
let playerSelect;

function setup() {
    createCanvas(windowWidth, windowHeight);//Canvas tilpasses til computeren
    background(220);
    noStroke();
    rectMode(CENTER);//Firkanter tegnes fra midten
    textAlign(CENTER);//Test er centeret
    textSize(20);
    gameOver = false;//Sætter variabel til false
    //y = height / 2;
    diceBtn = createButton('Dice');//Opretter knap: 'dice'
    answerBtn = createButton('Answer');//Opretter knap: 'Answer'
    correctAnswBtn = createButton('Correct answer');//Opretter knap: 'Correct answer'
    wrongAnswBtn = createButton('Wrong answer');//Opretter knap: 'Wrong answer'
    startGameBtn = createButton('startgame');//Opretter startknap: 'startgame'
    playerSelect = createSelect(); //Opretter selcect bar
    //Indsætter valgmuligheder for antal players
    playerSelect.option('2');
    playerSelect.option('3');
    playerSelect.option('4');
    playerSelect.option('5');


    
    //players.push(new Player("Pink", "pink", height / 2 + 20));
    console.log(players);
    //drawBoard();//Der kaldes til funktionen 'drawBorad' som er længere nede
    
    playerSelect.position(width / 2, 20);//Placering for valg af antal spillere knap
    turns = 0;//Der startes med ikke at være foretaget ture
    startGameBtn.size(100, 30);//Placering for start spil knap
    startGameBtn.position((width / 2) - 30, height / 2);
    diceBtn.hide();//'dice' kommer først frem når spillet starter
    correctAnswBtn.hide();
    wrongAnswBtn.hide();
    answerBtn.hide();
    startGameBtn.mousePressed(function(){//Når der trykkes på 'startgame' sker følgene:
    playerSelect.hide();
    startGameBtn.hide();//'startgame' skjules
    diceBtn.show();//'dice' kommer frem på skærmen
    drawBoard();

    for (let i = 0; i < playerSelect.value(); i++) {//Inden for i=0 til det valgte antal spillere sker følgende
        //Opretter spiller efter nedenstående objekt
        //For hver player skal en farve vælges og y- værdi for position
        //For loopet kører player antal, dvs. det antal playere spilelren har valgt
        //Farven vælges efter farve array
        //Position for y-værdi vælges til sidst
        players.push(new Player(playerColors[i], playerColors[i], height / 3 * 2 + 40 * i));
    }
    console.log(players);
    
    drawBoard();


    })

    //

    //Dice
    diceBtn.position(10, 10);//Angiver positionen for terning
    diceBtn.size(70, 70);//Angiver terningens størrelse
    diceBtn.mousePressed(function () {//Når der trykkes på terningen sker følgende:
        //turns = turns + 1; // changes whoose turn it is
        console.log("turns: " + turns);
        for (let i = 0; i < players.length; i++) {//Players.lenght angiver længden på arrayet
            if (turns % players.length === i) {
                players[i].die();

            }

        }

    });
    eGQ = eGeographyQ;
    eGA = eGeographyA;
    eMQ = eMathsQ;
    eMA = eMathsA;

}

function drawBoard() {//Funktion der tegner spillebrættet

    for (let i = 0; i < 20; i++) {//Der tegnes 20 felter
        color = i % 4;//"Resten" når der divideres med 4. Angiver hvilket felt brikken rykker til
        push();//Det er kun det ene felt der bliver farvet
        fill(colors[color]);//Arrayet hedder color. Derfor den første color
        //Anden color angiver hvilket nummer i arrayet vi skal bruge (altså hvilken farve vi fylder med)
        //Husk at color ovenover er defineret til at være lig med i%4
        rect(width / 20 * i + 32, height, 50, 450);//Tegner feltet. Felternes højde varieres efter antal spillere
        squareX.push(width / 20 * i + 32);//
        pop();//Ender push
    }

    for (let i = 0; i < players.length; i++) {//Loppet kører det antal gange som der er players.
        //Length angiver længden af arrayet 'players'
        players[i].display();//Henviser til metoden display som er længere nede
        console.log("players at drawboard: "+players);
    }
}




function draw() {

}

class Player {
    constructor(playercolor, playername, y) {
        this.moves = 0;
        this.player = squareX[this.moves];
        this.playercolor = playercolor;

        this.playername = playername;
        this.y = y;
        this.dieMoves;

    }
    display() {
        push();
        fill(this.playercolor);
        circle(this.player, this.y, 30, 30);
        pop();

    }
    move() {
        this.moves += this.dieMoves;
        this.player = squareX[this.moves];
        console.log("this.moves: " + this.moves);
        console.log("this.player: " + this.player);
        drawBoard();
        this.display();
        this.giveQuestion()
    }
    die() {
        push();
        fill(220);
        rect(90, 30, 20, 80);
        pop();
        this.dieMoves = parseInt(random(1, 7));
        this.move();
        text(this.dieMoves, 90, 50);

        if (this.moves >= 20) {
            console.log("you won!!!");
            background(220);
            text("The Game is over. " + this.playername + " is the winner!", width / 2, height / 2);
            diceBtn.hide();
            answerBtn.hide();
            wrongAnswBtn.hide();
            correctAnswBtn.hide();
            gameOver = true;

        }
    }
    giveQuestion() {
        if (gameOver === false) {
            console.log(this.playercolor);
            rect(width / 2, 120, 500, 250);

            if (this.moves % 4 === 0) {
                // math 
                category = eMQ;
                answer = eMA;
            }
            if (this.moves % 4 === 1) {
                // random
                category = ["randomQ"];
                answer = ["randomA"];
            }
            if (this.moves % 4 === 2) {
                // geo
                category = eGQ;
                answer = eGA;
            }
            if (this.moves % 4 === 3) {
                // popculture
                category = ["popcultureQ"];
                answer = ["popcultureA"];
            }
            let question = parseInt(random(0, category.length));
            console.log("question number: " + question);
            text(category[question], width / 2, 120);
            answerBtn.show();
            answerBtn.position(width / 2 - 30, 140);
            answerBtn.mousePressed(function () {
                text(answer[question], width / 2, 180);
                category.splice(question, 1);// det her virker ikke 
                answer.splice(question, 1);
                answerBtn.hide();
                console.log("category: " + category);
                console.log("answer: " + answer);
                correctAnswBtn.position(width / 2 + 30, 140);
                wrongAnswBtn.position(width / 2 - 130, 140);
                correctAnswBtn.show();
                wrongAnswBtn.show();

            });
            wrongAnswBtn.mousePressed(function () {

                turns += 1;
                wrongAnswBtn.hide();
                correctAnswBtn.hide();

            });

            correctAnswBtn.mousePressed(function () {
                wrongAnswBtn.hide();
                correctAnswBtn.hide();

            });


        }
    }

}