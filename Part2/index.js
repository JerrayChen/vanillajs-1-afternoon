

function setCard(){
    let id = document.getElementById('idInput').value;
    let color = document.getElementById('colorInput').value;
    document.getElementById(id).style.color = color;
}


function reset(){
    let suit = ['spade','heart','diamond','club'];
    suit.forEach(function(s) {
        document.getElementById(s).style.color = 'gray';
    });
    
}