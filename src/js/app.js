/**
 *
 * 1.Change the color of the new selection of the chars
 * 2.Delete that solution from the table --- to ekana
 * 3.Reset the selection of chars - clear button ----- Mallon to ekana
 *
 *
 */


var CryptoGame = CryptoGame || {};

$(document).ready(function(){

    CryptoGame.sumOfLetters = '';

    CryptoGame.solutions = ['SOFT', 'KISS', 'PISI', 'PISAKI'];

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

        var reversedWord = currentWord.split('').reverse().join();


        function searchInSolutions(currentSolution){

            var splitSolution = currentSolution.split('');

            if ( currentWord == currentSolution ||  reversedWord == splitSolution  ) {

                console.log('vrikes pithani lysi');
                CryptoGame.success(currentSolution, CryptoGame.solutions);
            }
            else {

                console.log('sunexise na psaxneis');
            }

        }

        CryptoGame.solutions.forEach(searchInSolutions);


    };




    /**
     *
     * @param solution is the correct word that the user found
     * @param solutions includes the CryptoGame.solutions
     * this function calls all the functions after the success of finding one word
     */
    CryptoGame.success = function(solution, solutions){

        CryptoGame.counter++;

        CryptoGame.showNumberOfSolutions();

        CryptoGame.eraseSolution(solution);

        CryptoGame.removeSolution(solution, solutions);

        //CryptoGame.checkAmountOfUserSolutions();
        CryptoGame.sumOfLetters = '';

    };



    /**
     * Display the sum of correct words that the user has found
     */
    CryptoGame.showNumberOfSolutions = function(){
        $('#number-of-answers').html(CryptoGame.counter);
    };



    /**
     *
     *
     * @param solution is pointing to the current solution of the user
     * @param solutions is the table of the solutions
     *
     * when the user is finding one word (solution) this word is removed
     */
    CryptoGame.removeSolution = function(solution, solutions){

        solutions.forEach(function(currentSolution, index){

            if (solution === currentSolution){
                solutions.splice(index,1);
            }

        });

    };



    // how many solutions you have found
    //CryptoGame.checkAmountOfUserSolutions = function(){
    //
    //};



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




    /**
     *
     * Reset button clicked and the function removes all data
     */
    CryptoGame.clearAll = function() {

        $('#clearAll').on('click', function(){

            $('#clearAll').toggleClass('clear');
            $('td').removeClass('selected');
            $('li').removeClass('erase-solution');
            CryptoGame.counter = 0;
            CryptoGame.showNumberOfSolutions();
            CryptoGame.sumOfLetters = '';

        });

    };



    // Start the game :)
    CryptoGame.selectLetters(CryptoGame.sumUp, CryptoGame.subtractChar);

    CryptoGame.clearAll();


});