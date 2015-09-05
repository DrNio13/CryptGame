var CryptoGame = CryptoGame || {};

$(document).ready(function(){

    /**
     *
     * @param sumUp is a function that adds the selection of the characters of the user
     */
    CryptoGame.selectLetters = function(sumUp){

        $('#crypt-table').delegate('td', 'click', function(){

            $(this).toggleClass('selected');

            var thisValue = $(this).text();
            var thisElement = $(this);

            sumUp(thisValue, thisElement);
        });

    };

    /**
     *
     * @param self is the letter that user currently clicked
     * @param obj is the object that triggered the event
     */

    var sumOfLetters = '';

    CryptoGame.sumUp = function(self, obj){

        if ( $(obj).hasClass('selected') ) {
            sumOfLetters += self;
            //console.log(sumOfLetters);
        }
        else {
            //sumOfLetters.slice(0,-1);
        }

    };
    //
    //CryptoGame.solutionsStore = function(){
    //    return 'NAI';
    //};



    CryptoGame.selectLetters(CryptoGame.sumUp);
    CryptoGame.sumUp();

    //console.log('skata'.slice(0,-1));

});