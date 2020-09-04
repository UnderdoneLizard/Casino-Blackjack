//tsudocode
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k", "a"];
const suits = ["diams", "clubs", "hearts", "spades"];
//card class
    //value string 
    //suit  string 
    //faceUp boolean
    //methods
        //constructor takes cards info sets face up to false 
        //convertValue - uses object of values to convert to num 
        //still maybe
        //flip card?
        //I dont think I need either of these//changeAceOne - when needed this will switch the ace value to one 
        //changeAceBack - needs to be called if the first is, dont want to leave any aces at one (maybe dont need)

class Card  {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
        this.faceUp = false;
    }
    flip(){
        this.faceUp = !this.faceUp;
    }
    valueOf(){ 
        const trueValues = {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "t":10, "j":10, "q":10, "k":10, "a":11}
        return trueValues[this.value];
    }
    toNumber(){
        if(!isNaN(this.value)) return parseInt(this.value, 10);
    }
}



//deck class
    //cards array
    //discards anti-array
    //methods
        //constructor 
            //makes deck and depending on input will make multiple decks
        //add to discard 
        //moveDisCards (unless i use a shuffle that don't need this) //dont need it!
        //shuffle
        //checkCardsSize - if empty moveDisCards shuffle
        //remove card will checkCardsSize(>=1) and return the card removed 

class Deck {
    constructor(n = 1){
        this.cards = [];
        this.discards = [];
        for(let j = 0; j < n; j++){
            for(let i = 0; i < suits.length; i++){
                for(let j = 0; j < values.length; j++){
                        this.discards.push(new Card(values[j],suits[i]));
                        //make cards here 
                        const card = this.discards[this.discards.length -1];
                        $('.playingCards').append($(`<div class="card rank-${card.toNumber()} ${card.suit}">
                            <span class="rank">${card.value.toUpperCase()}</span>
                            <span class="suit">&${card.suit};</span>
                            </div>`));
                }
            }
        }
    }

    addToDiscard(card){
        this.discards.push(card)
    }

    //shuffle will be the fisher gates shuffle that puts it into a new array 
    //Mike Bostock "https://bost.ocks.org/mike/shuffle/"
    shuffle(){
        
        let n = this.discards.length, i;

        // While there remain elements to shuffle…
        while (n) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * n--);
            
            // And move it to the new array.
            this.cards.push(this.discards.splice(i, 1)[0]);
        }
        
    }
    checkCardsSize(){
        if (this.cards.length < 1){  //not tested but thats ok ill doit later should work anyway
            this.shuffle();
        }
    }

    removeCard(){
        this.checkCardsSize();
        return this.cards.shift();
    }

}
//player class
    //name -string
    //hand - array
    //bet - num
    //chips/money - biggerNum
    //points - total value of current hand 
    //continue - boolean for the turns 
    //hasAce - boolean
    //canDouble - boolean for if player can double down 
    //canSplit - boolean for if player can split 
    //didSplit - boolean
    //didDouble - boolean
    //hasNatural - boolean 
    //bust - boolean if the playes has lost the hand
    //win - boolean dealt with in compair
    //tie - boolean dealt with in compair
    //lose - boolean dealt with in compair 
    //outOfMoney
    //methods
        //constructor
            //takes name num(for money) sets all initial values doy 
        //initializePlayer - sets player's continue to true, win, lose, bust, tie, hasAce, bust, canDouble and canSplit to false
        //take card - takes card and adds it to the hand
        //checkMoney - checks if players money is higher than input value
        //bet - passed minimum bet, has the player select a bet, returns nothing  
        //betLost - Subtracts bet from the total chips
        //checkAce - checks for ace if so sets value to true
        //calculatePoints - adds up card values doesnt handle ace 
        //checkDoubleDown - looks at players hand to see if they can double down and sets value to true if so sets canDouble to true will only be ran right after deal 
        //canSplit - checks if player can split 
        //checkNatural - checks for blackjack or natural (21 without a jack is the way i think of it)
        //check - to see if the player has gone over and will do special stuff when an ace is in hand and will return new points if over changes continue to false and bust to true
        //hit - adds a card to the player hand 
        //stand - changes continue to false 
        //doubleDown - double players bet hit once and set continue to false 
        //win - adds double players bet value and adds to chips
        //lose - delets players bet adds no money 
        //tie - returns bet money 
        //discardAll - will loop through hand and remove the cards at the end of the round
        
        //dealer class extends player
            //constructor takes nothing 
                //super infinant money and a rediculous name 
                //hasTencard boolean
            //deal - takes players array loops twice a loop that loops players cards into hand 
            //checkTenCard
            //check for dealer  
        
class Player {
    constructor(name = "PunchParty",chips = 500){
        this.name = name;
        this.hand = [];
        this.bet = 0;
        this.splitBet = 0;
        this.chips = chips;
        this.points = 0;
        this.aceCount = 0;
        this.aceChangeCount = 0;
        this.continue = true;
        this.hasAce = false;
        this.canDouble = false;
        this.canSplit = false;
        this.didSplit = false;
        this.didDouble = false;
        this.hasNatural = false;
        this.bust = false;
        this.won = false;
        this.naturalWin = false;
        this.lost = false;
        this.tie = false;
        this.outOfMoney = false;
    }
    initailizePlayer(){
        this.bet = 0;
        this.splitbet = 0;
        this.points = 0;  //dry
        this.aceCount = 0;
        this.aceChangeCount = 0;
        this.continue = true;
        this.hasAce = false;
        this.canDouble = false;
        this.canSplit = false;
        this.didSplit = false;
        this.didDouble = false;
        this.hasNatural = false;
        this.bust = false;
        this.won = false;
        this.naturalWin = false;
        this.lost = false;
        this.tie = false;
    }

    takeCard(deck, face = true){
        this.hand.push(deck.removeCard());
        this.hand[this.hand.length - 1].faceUp = face;
        //transition to hand i think would happen here  
    }
    giveCard(deck){
        deck.addToDiscard(this.hand.pop())
        //probably css animation 
    }

    checkChips(num = 25, willLose = false){ //need to check if the player hes enough to bet minimum 
        if (this.chips >= num){ //added equals
            return true;
        } else if(this.chips < num) {
            this.outOfMoney = willLose; 
            
        }
        return false;
    }
    
    makeBet(num,count, game){
        const min = num
        let done = false; 
        //css stuff mostly
        const select25 = () => {
            this.bet += 25;

        }
        const select50 = () => {
            this.bet += 50;
        }
        const select100 = () => {
            this.bet += 100;
        }
        const finishbet = (e,num = min) => {
            console.log(num);
            if (this.bet >= num && this.checkChips(this.bet)){
                $('#bet25').remove();
                $('#bet50').remove();
                $('#bet100').remove();
                $(`#makeBet`).remove();
                game.deal(game.deck);
                // return count++;
                console.log('do i get here?');

            }else if(!this.checkChips(this.bet)){
                alert(`${this.name} doesn't have enough chips for that bet`);
                

            }else {
                alert(`${this.name} hasn't met the required bet`);
            }
        }
        $('body').append($(`<button class="test" id="bet25">Bet 25</button>`));
        $('#bet25').on('click',select25);
        $('body').append($(`<button class="test" id="bet50">Bet 50</button>`));
        $('#bet50').on('click',select50);
        $('body').append($(`<button class="test" id="bet100">Bet 100</button>`));
        $('#bet100').on('click',select100);
        $('body').append($(`<button class="test" id="makeBet">Place Bet</button>`));
        $('#makeBet').on('click',finishbet);
    
    
    }


    betLost(){
        this.chips -= this.bet;
    }
    /*    
    checkAce(){
        if (this.hand[0].value === 'A'||this.hand[1].value ==='A'){
            this.hasAce = true;
            this.aceCount++;
        }
        
    } */
    checkAce(){
        let counter = 0;
        for(let i = 0; i < this.hand.length; i++){
            if(this.hand[i].value === 'a') counter++;
        }
        this.aceCount = counter;
        if(this.aceCount >= 1) this.hasAce = true;
    }

    checkDouble(){
        const total = this.hand[0].valueOf() + this.hand[1].valueOf();
        if((total === 9 || total === 10 || total === 11) && (this.checkChips(2 * this.bet))) this.canDouble = true;
    }

    checkSplit(){
        if(this.hand[0].value === this.hand[1].value) this.canSplit = true;
    }

    calculatePoints(){
        let counter = 0;
        for(let i = 0; i < this.hand.length; i++){
            counter+= this.hand[i].valueOf();
        }
        this.points = counter;
        if(this.aceChangeCount >=1) this.points - 10*this.aceChangeCount;
    }
    checkNatural(){
        if((this.hand[0].valueOf() === 10||this.hand[1].valueOf() === 10) && (this.hand[0].value === 'a' || this.hand[1].value === 'a')){ //could use check ace so its a little redundant 
            this.hasNatural = true;
            return true;
        } 
        return false;
    }
    
    check(){ // decides if the player has busted and deals with changing the ace 
        this.checkAce();
        this.calculatePoints();
        if(this.hasNatural) {
            this.continue = false; 
            return;
        }
        if(this.points > 21 && this.aceCount > this.aceChangeCount){
            this.points -= 10;
            this.aceChangeCount += 1;
        }else if (this.points > 21){
            this.continue = false;
            this.bust = true;
        }if (this.points === 21){
            this.continue = false;
        }
    }
    checkBegining(){
        this.checkDouble();
        this.checkSplit();
        this.checkNatural();
        this.check();
        console.log(`${this.name} has ${this.points} points`);
    }
    finalCheck(game){
        this.checkChips(game.minBet, true);
        console.log('thisworked maybe');
    }

    hit(game){
        this.takeCard(game.deck);
        this.check();
        console.log(`${this.name} has ${this.points} points`);
        if(this.bust) game.dealer.dealerPlay(game); 
    }

    stand(game){
        this.check();
        this.continue = false;
        console.log(`${this.name} has ${this.points} points`);
        game.dealer.dealerPlay(game); 
    }

    doubleDown(game){
        this.takeCard(game.deck);
        this.bet *= 2;
        this.continue = false;
        this.didDouble = true;
        this.check();
        console.log(`${this.name} has ${this.points} points`);
        game.dealer.dealerPlay(game); 

    }

    split(){
        this.didSplit = true;
        this.canSplit = false;
        this.splitBet = this.bet;
    }
    //win - adds double players bet value and adds to chips
    win(){
        this.chips += this.bet;
    }
    natWin(){
        this.chips += Math.ceil(this.bet * 1.5);
    }
    //lose - delets players bet adds no money 
    lose(){
        this.chipe -= this.bet;
    }
    //tie - returns bet money 
    tie(){
        //nothing for now 
    }

    //discardAll - will loop through hand and remove the cards at the end of the round
    discards(deck){    ///needs to have deck passed in to put into the 
        while(this.hand.length > 0){
            this.giveCard(deck);
        }
    }
    play(game) {
        $('body').append($(`<button class="test" id="hit">Hit</button>`));
        $('#hit').on('click',() => {this.hit(game)});
        $('body').append($(`<button class="test" id="stand">Stand</button>`));
        $('#stand').on('click', () => {this.stand(game)});
        if (this.canDouble){
            $('body').append($(`<button class="test" id="doubleDown">DoubleDown</button>`));
            $('#doubleDown').on('click', () => {this.doubleDown(game)});
        }
        
    }
}
//dealer class extends player
            //constructor takes nothing 
                //super infinant money and a rediculous name 
                //hasTencard boolean
            //deal - takes players array loops twice a loop that loops players cards into hand - going elsewhere
            //dealer initailize
            //checkTenCard
            //dealerPlay
class Dealer extends Player{

    constructor(name = 'BeanMan'){
        super(name,5000000);
        this.hasFirstTenCard = false;
    }
    initailizePlayer(){
        super.initailizePlayer()
        this.hasFirstTenCard = false;
    }
    checkTenCard(){
        if(this.hand[0].valueOf() === 10) this.hasFirstTenCard = true;
    }
    checkBegining(game){
        super.checkNatural();
        this.checkTenCard();
        super.check();
        if (this.hasFirstTenCard && this.hasAce) this.hand[1].faceUp = true;
        game.playersPlay();
    }
    hit(game){
        this.takeCard(game.deck);
        this.check();
        console.log(`${this.name} has ${this.points} points`);
    }
    dealerPlay(game){
        this.hand[1].faceUp = true;
        while(this.continue === true){
            if(this.points < 17){ 
                this.hit(game);
                console.log(this.points);
            }else if (this.points >= 17){
                this.continue = false;
            }
        }
        game.compair();
    } 
}



        
        //game class 
        //minimum bet
        //players = [array]
        //methods
        //constructor
            //takes in number of players and number of decks 
        //initialize round - calls initilizePlayer, calls playerBet for each player 
        //deal - loop through players and deal
        //checkPlayerHands - loop through player hands and check for all the stuff that can happen with 2 cards, for right after deal and run check (runs begining check on all players )
        //player final check - runs final check on all players 
        //playerPlay - while player continue is true offer to hit or stay and stuff and hold the jquery for the buttons
        //compair - loop through players if bust is false compair to dealer, if highr win true, if lower lose true, if tie tie true. 
        //distribute - loop through players if win double bet to player, if tie return bet to player, if bust or lose do nothing if outOfMoney is true then the player is out and something will happen  
        //split - will run play loop for player twice 
        //play round - initializeRound dealer deals and the players play (loop through the players) compair and distribute at the end 
        //playGame - creates players and dealer and creats how ever many decks the user wants 
        
class Game {
    constructor(numPlay, numDeck = 1){
        this.willQuit = false;
        this.minBet = 25;
        this.deck = new Deck(numDeck)
        this.deck.shuffle();
        this.dealer = new Dealer("StringCheese");
        this.players = [];
        if(numPlay > 3) numPlay = 3;
        for(let i = 0; i < numPlay; i++){
            this.players.push(new Player(`player${i + 1}`));
        }
    }
    playerBet(){
        let count = 0;
    /*  while(true){
        if(count < this.players.length) count += this.players[count].makeBet(this.minBet,count);
        if(count >= this.players.length) break;
        } */
        count += this.players[0].makeBet(this.minBet,count, this);
        console.log(`got here ${count}`);
        if(count >= this.players.length) this.deal(this.deck);
    }
    
    initailizeRound(){
        $('body').empty();
        this.players.forEach(player =>{
            player.initailizePlayer();
        })
        // this.players[0].makeBet(this.minBet);
        this.dealer.initailizePlayer();
        this.playerBet();
    
    }

    deal(){
        for(let i = 0; i < 2; i++){
            this.players.forEach(player =>{
                player.takeCard(this.deck);
            })
            if(i === 1) this.dealer.takeCard(this.deck, false);
            else this.dealer.takeCard(this.deck);
        }
        this.playersFirstCheck();
        
        
    }

    playersFirstCheck(){
        this.players.forEach(player =>{
            player.checkBegining();
        })
        this.dealer.checkBegining(this);
    
    }

    playersLastCheck(){
        this.players.forEach(player =>{
                player.finalCheck(this);
        })
    }

    playersPlay(){
        this.players[0].play(this);
            
        console.log("players play was called");
    }
    allDiscard(){
        this.players.forEach(player =>{
            player.discards(this.deck);
        })
        this.dealer.discards(this.deck);
    }
    
    compair(){
        this.players.forEach(player => {
            if (player.bust){
                player.lost = true;
                console.log('dealer wins');
                return;
            }
            if(player.hasNatural && !this.dealer.hasNatural){
                player.naturalWin = true;
                console.log('player wins');
                return;
            }
            if(player.points > this.dealer.points || this.dealer.bust){
                player.won = true;
                console.log('player wins');
            }else if (player.points < this.dealer.points && !this.dealer.bust){
                player.lost = true;
                console.log('dealer wins');
            }else if (player.points === this.dealer.points){
                player.tie = true;
                console.log('Push');
            }
        })
        this.distribute();
    }

    distribute(){
        this.players.forEach(player => {
            if(player.naturalWin){
                player.natWin();
            }else if (player.won){
                player.win();
            }else if (player.tie){
                console.log('really nothing needs to happen it seems');
            }else if (player.lost){
                player.lose();
            }else console.log('how did i get here');
        })
        this.allDiscard();
    }
    //everything up to here deffinetly works 

quit(){
    this.willQuit = true;
    console.log('hello beans');
}

playGame() {
    
    
    this.initailizeRound();
    $('body').append($(`<button class="test" id="playround">play another round</button>`));
    $('#playround').on('click',this.initailizeRound());

}
}    
const makeGame = function(players = 1, decks = 1){
    game = new Game(1);
    game.playGame()
}
$('#gameStart').on('click', makeGame);

// $('body').empty();
/* $('#quit').on('click',this.quit);


 */
