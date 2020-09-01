//tsudocode
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["d", "c", "h", "s"];
//card class
    //value string 
    //suit  string
    //faceUp boolean
    //methods
        //constructor takes cards info sets face up to false 
        //changeAceOne - when needed this will switch the ace value to one 
        //changeAceBack - needs to be called if the first is, dont want to leave any aces at one (maybe dont need)
        //convertValue - uses object of values to convert 
        //flip card?

//deck class
    //cards array
    //discards anti-array
    //methods
        //constructor 
            //makes deck and depending on input will make multiple 
        //remove card will return the card removed 
        //add to discard 
        //shuffle
        
//player class
    //name -string
    //hand - array
    //bet - num
    //chips/money - biggerNum
    //points - total value of current hand 
    //continue - boolean for the turns 
    //canDouble - boolean for if player can double down 
    //canSplit - boolean for if player can split 
    //methods
        //check - to see if the player has gone over and will do special stuff when an ace is in hand and will return new points if over changes continue to false 
        //hit - adds a card to the player hand 
        //stand - changes continue to false 
        //initialize round - sets player's continue to true, canDouble and canSplit to false, and calls each player to bet
        //bet - players must bet minimum so maybe game has to be passed in otherwise will set player bet 
        //checkDoubleDown - looks at players hand to see if they can double down and sets value to true if so sets canDouble to true
        //doubleDown - double players bet hit once and set continue to false 
        //