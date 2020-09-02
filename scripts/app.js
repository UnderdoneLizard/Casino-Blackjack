//tsudocode
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = ["d", "c", "h", "s"];
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
        const trueValues = {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "T":10, "J":10, "Q":10, "K":10, "A":11}
        return trueValues[this.value];
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
        this.win = false;
        this.tie = false;
        this.outOfMoney = false;
    }
    initailizePlayer(){
        this.bet = 0;
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
        this.win = false;
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

    checkChips(num = 25){ //need to check if the player hes enough to bet minimum 
        if (this.chips >= num){ //added equals
            return true;
        } else if(this.chips < num) {
            this.outOfMoney = true; 
            
        }
        return false;
    }
    
    makeBet(num){

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
        const makebet = () => {
            if (this.bet >= num && this.checkChips(this.bet)){
                done = true;
            }else if(!this.checkChips(this.bet)){
                alert(`${this.name} doesn't have enough chips for that bet`);
                

            }else {
                alert(`${this.name} hasn't met the required bet`);
            }
        }
        while(!done){
            //make buttons appear and work
            done = true;
        }
        this.bet = num; //only for testing
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
            if(this.hand[i].value === 'A') counter++;
        }
        this.aceCount = counter;
        if(this.aceCount >= 1) this.hasAce = true;
    }

    checkDouble(){
        const total = this.hand[0].valueOf() + this.hand[1].valueOf();
        if(total === 9 || total === 10 || total === 11) this.canDouble = true;
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
        if((this.hand[0].valueOf() === 10||this.hand[1].valueOf() === 10) && (this.hand[0].value === 'A' || this.hand[1].value === 'A')){ //could use check ace so its a little redundant 
            this.hasNatural = true;
            return true;
        } 
        return false;
    }
    
    check(){
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
    checkAll(game = 'platipus'){
        this.checkAce();
        this.checkDouble();
        this.checkSplit();
        this.checkNatural();
        this.check();
        this.checkChips();
       // this.checkChips(game.minBet);
    }

    hit(deck){
        this.takeCard(deck);
        this.check();
    }

    stand(){
        this.check();
        this.continue = false;
    }

    doubleDown(deck){
        this.takeCard(deck);
        this.bet *= 2;
        this.continue = false;
        this.didDouble = true;
    }

    split(){
        this.didSplit = true;
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
}
//dealer class extends player
            //constructor takes nothing 
                //super infinant money and a rediculous name 
                //hasTencard boolean
            //deal - takes players array loops twice a loop that loops players cards into hand 
            //checkTenCard
            //check for dealer  
class Dealer extends Player{

    constructor(name = 'BeanMan'){
        super(name,5000000);
        
    }
}



        
        //game class 
        //minimum bet
        //players = [array]
        //methods
        //constructor
            //takes in number of players and number of decks 
            //initialize round - calls initilizePlayer, calls playerBet for each player 
            //compair - loop through players if bust is false compair to dealer, if highr win true, if lower lose true, if tie tie true. 
        //checkPlayersMoney - loop to check all player money at end of the round (maybe) will go into the bottom one 
        //checkPlayerHands - loop through player hands and check for all the stuff that can happen with 2 cards, for right after deal and run check
        //distribute - loop through players if win double bet to player, if tie return bet to player, if bust or lose do nothing if outOfMoney is true then the player is out and something will happen  
        //playerPlay - while player continue is true offer to hit or stay and stuff and hold the jquery for the buttons
        //split - will run play loop for player twice 
        //play round - initializeRound dealer deals and the players play (loop through the players) compair and distribute at the end 
        //playGame - creates players and dealer and creats how ever many decks the user wants 
        
        

