var CryptoGame = CryptoGame || {};

$(document).ready(function(){

    CryptoGame.sumOfLetters = '';

    /**
     *
     * @type {number}
     * how many words the user has found - initial value is 0
     */
    CryptoGame.counter = 0;



    /**
     *
     * @param sumUp is a function that adds the selection of the characters of the user
     * @param subtractChar is a function that removes the latest char from the current selection of the user
     */
    CryptoGame.selectLetters = function(sumUp, subtractChar){

        $('#crypt-table').delegate('td', 'click', function(){

            $(this).toggleClass('selected');

            // get the value of the current selection
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

        // evaluate the current word
        CryptoGame.evaluate(CryptoGame.sumOfLetters);
    };




    /**
     * 
     */
    CryptoGame.subtractChar = function(){

        CryptoGame.sumOfLetters = CryptoGame.sumOfLetters.slice(0,-1);

        // evaluate current word
        CryptoGame.evaluate(CryptoGame.sumOfLetters);
    };




    /**
     *
     * @param currentWord is the sum of chars that the user clicked
     * evaluate() works fine if you click in the right or opposite order NOT random order.
     **/
    CryptoGame.evaluate = function(currentWord){

        // multiple solutions
        var solutions = ['SOFT', 'KISS', 'PISI'];

        var reversedWord = currentWord.split('').reverse().join();



        function searchInSolutions(currentSolution){

            var splitSolution = currentSolution.split('');

            if ( currentWord == currentSolution ||  reversedWord == splitSolution  ) {

                console.log('vrikes pithani lysi');
                CryptoGame.success(currentSolution, solutions);
            }
            else {

                console.log('sunexise na psaxneis');
            }

        }

        solutions.forEach(searchInSolutions);


    };




    /**
     *
     * @param solution is the correct word that the user found
     * this function calls all the functions after the success of finding one word
     */
    CryptoGame.success = function(solution){

        CryptoGame.counter++;
        $('#number-of-answers').html(CryptoGame.counter);

        CryptoGame.eraseSolution(solution);
        // change the color of the new selection of the chars

        // reset the selection of chars - clear button
        // Clear button
        CryptoGame.checkAmountOfUserSolutions();
    };




    // how many solutions you have found
    CryptoGame.checkAmountOfUserSolutions = function(){

    };


    /**
     *
     * @param solution is the correct word that the user found
     * this function simply erase the word from the list that the user has found
     */
    CryptoGame.eraseSolution = function(solution){

        var tableSolution = $('#answers').find('li').text().split(' ');

        tableSolution.forEach(function(currentElem){
           if (currentElem == solution) {
               $("#answers").find("li:contains('" + currentElem + "')").toggleClass('erase-solution');
           }
        });

    };


    // Start the game :)
    CryptoGame.selectLetters(CryptoGame.sumUp, CryptoGame.subtractChar);


});