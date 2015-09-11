/**
 *
 * 1) a.Store the solution that the user found
 *    b.Lock the word on the table
 *    c.Change the color of the new selection of the chars
 *
 * 2) Display nice modal window with opacity in the center of the screen
 */


var CryptoGame = CryptoGame || {};

$(document).ready(function(){

    CryptoGame.sumOfLetters = '';
    CryptoGame.solutions = ['SOFT', 'CAT', 'PISI', 'SHARK'];

    /**
     *
     * @type {number}
     * how many words the user has found - initial value is 0
     */
    CryptoGame.counter = 0;

    var $cells = $('td');
    var numberOfAnswers = $('#number-of-answers');
    


    /**
     *
     * @param sumUp is a function that adds the selection of the characters of the user
     * @param subtractChar is a function that removes the latest char from the current selection of the user
     */
    CryptoGame.selectLetters = function(sumUp, subtractChar){

        $('#crypt-table').delegate('td', 'click', function(){

            $(this).toggleClass('selected');
            $(this).toggleClass('active');

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

                //console.log('vrikes pithani lysi');
                CryptoGame.success(currentSolution, CryptoGame.solutions);
            }
            //else {
            //    //console.log('sunexise na psaxneis');
            //}

        }

        CryptoGame.solutions.forEach(searchInSolutions);


    };


    /**
     *
     *
     * @param counter is the number of solutions that the user has found
     */
    CryptoGame.lockSolutions = function(counter){

        var $active = $('.active');

        $('.selected').addClass('lock-' + counter);

        $active.removeClass('selected');
        $active.removeClass('active');

    };

    /**
     *
     * Remove the locked words
     */
    CryptoGame.removeLocks = function(){

        for( var i=1; i <= CryptoGame.solutions.length; i++){
            $cells.removeClass('lock-' + i );
        }

    };


    /**
     *
     * @param solution is the correct word that the user found
     * @param solutions includes the CryptoGame.solutions
     * this function calls all the functions after the success of finding one word
     */
    CryptoGame.success = function(solution, solutions){

        CryptoGame.counter++;

        CryptoGame.lockSolutions(CryptoGame.counter);

        CryptoGame.showNumberOfSolutions();

        CryptoGame.eraseSolution(solution);

        CryptoGame.removeSolution(solution, solutions);

        CryptoGame.checkAmountOfUserSolutions();
        CryptoGame.sumOfLetters = '';

    };



    /**
     * Display the sum of correct words that the user has found
     */
    CryptoGame.showNumberOfSolutions = function(){
        numberOfAnswers.html(CryptoGame.counter);

        var defaultAnswers = 0;
        if (CryptoGame.counter > defaultAnswers) {
            numberOfAnswers.addClass('has-found');
        }
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
        //console.log(solutions);
        solutions.forEach(function(currentSolution, index){

            if (solution === currentSolution){
                solutions.splice(index,1);
            }

        });
        //console.log(solutions);

    };



    // how many solutions you have found
    CryptoGame.checkAmountOfUserSolutions = function(){

        if ( CryptoGame.solutions.length === 0 ) {

            // Show Success message
            $('#modal-success').children('.modal-content').animate({
                top: '0',
                opacity: '1'
            },'normal');

            $('#shadow').addClass('shadow');
        }
    };

    $('#close-success-modal').on('click', function(){

        CryptoGame.clearAll();

    });



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


    /**
     *
     * Reset button clicked and the function removes all data
     */
    CryptoGame.clearAll = function() {

        $('#modal-success').children('.modal-content').animate({
            top: '-500px',
            opacity: '0.3'
        },'slow');


        CryptoGame.counter = 0;
        CryptoGame.showNumberOfSolutions();
        CryptoGame.solutions = ['SOFT', 'CAT', 'PISI', 'SHARK'];
        CryptoGame.sumOfLetters = '';
        $cells.removeClass('selected');

        CryptoGame.removeLocks();

        $cells.removeClass('lock-' + CryptoGame.counter);
        $('li').removeClass('erase-solution');
        numberOfAnswers.removeClass('has-found');

        $('#shadow').removeClass('shadow');

    };

    // User clicks the "Reset" button
    $('#clearAll').on('click', function(){

        $('#clearAll').toggleClass('clear');
        CryptoGame.clearAll();

    });


});