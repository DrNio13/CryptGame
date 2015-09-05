var CryptoGame = CryptoGame || {};

$(document).ready(function(){

    CryptoGame = {

        value1: $('#item-3').text(),
        item2: $('#item-4'),
        item3: $('#item-5'),

        printNodeName: function(){
            console.log(CryptoGame.value1);
        }

    };

    CryptoGame.printNodeName();


});
