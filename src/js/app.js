var CryptoGame = CryptoGame || {};

$(document).ready(function(){

    CryptoGame.sumOfLetters = '';

    /**
     *
     * @param sumUp is a function that adds the selection of the characters of the user
     * @param subtractChar is a function that removes the latest char from the current selection of the user
     */
    CryptoGame.selectLetters = function(sumUp, subtractChar){

        $('#crypt-table').delegate('td', 'click', function(){

            $(this).toggleClass('selected');

            var thisValue = $(this).text();

            if ( $(this).hasClass('selected') ) {
                sumUp(thisValue);
            }
            else {
                subtractChar();
            }

        });

    };

    /**
     *
     * @param self is the letter that user currently clicked
     */
    CryptoGame.sumUp = function(self){

        CryptoGame.sumOfLetters += self;
        //console.log(CryptoGame.sumOfLetters);
        CryptoGame.evaluate(CryptoGame.sumOfLetters);
    };

    /**
     * 
     */
    CryptoGame.subtractChar = function(){

        CryptoGame.sumOfLetters = CryptoGame.sumOfLetters.slice(0,-1);
        //console.log(CryptoGame.sumOfLetters);
        CryptoGame.evaluate(CryptoGame.sumOfLetters);
    };

    CryptoGame.evaluate = function(currentWord){
        //console.log(currentWord);
        var solution = 'oxi';

        if (currentWord == solution) {
            console.log('vrikes pithani lysi');
        }
        else {
            console.log('sunexise na psaxneis');
        }
    };


    CryptoGame.selectLetters(CryptoGame.sumUp, CryptoGame.subtractChar);


});