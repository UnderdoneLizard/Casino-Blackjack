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
        for(let i = 0; i < suits.length; i++){
            for(let j = 0; j < values.length; j++){
                    this.discards.push(new Card(values[j],suits[i]));
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
        if (this.cards.length < 1){
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
        //check - to see if the player has gone over and will do special stuff when an ace is in hand and will return new points if over changes continue to false and bust to true
        //hit - adds a card to the player hand 
        //stand - changes continue to false 
        //checkMoney - checks if players money is higher than input value
        //bet - passed minimum bet, has the player select a bet, returns nothing  
        //checkAce - checks for ace if so sets value to true
        //checkDoubleDown - looks at players hand to see if they can double down and sets value to true if so sets canDouble to true
        //checkNatural - checks for blackjack or natural (21 without a jack is the way i think of it)
        //doubleDown - double players bet hit once and set continue to false 
        //win - adds double players bet value and adds to chips
        //lose - delets players bet adds no money 
        //tie - returns bet money 
        //initializePlayer - sets player's continue to true, win, lose, bust, tie, hasAce, bust, canDouble and canSplit to false, and
        //discardAll - will loop through hand and remove the cards at the end of the round
        
        //dealer class extends player
            //constructor takes nothing 
                //super infinant money and a rediculous name 
                //hasTencard boolean
            //deal - takes players array loops twice a loop that loops players cards into hand 
            //checkTenCard
            //check for dealer  
        
        
        //game class 
        //minimum bet
        //players = [array]
        //methods
        //constructor
            //takes in number of players and number of decks 
        //initialize round - calls initilizePlayer, calls playerBet for each player 
        //compair - loop through players if bust is false compair to dealer, if highr win true, if lower lose true, if tie tie true. 
        //distribute - loop through players if win double bet to player, if tie return bet to player, if bust or lose do nothing if outOfMoney is true then the player is out and something will happen  
        //playerPlay - while player continue is true offer to hit or stay and stuff and hold the jquery for the buttons
        //split - will run play loop for player twice 
        //play round - initializeRound dealer deals and the players play (loop through the players) compair and distribute at the end 
        //playGame - creates players and dealer and creats how ever many decks the user wants 
        
        

