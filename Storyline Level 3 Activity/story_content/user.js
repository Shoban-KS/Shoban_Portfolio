window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  var player = GetPlayer();

function validate(){

    var audience = player.GetVar("DegreeSelected");
    var inputs = document.querySelectorAll("input, textarea");

    if(inputs.length < 8){
        return;
    }

    var ready = audience;

    for(var i=0;i<8;i++){
        if(inputs[i].value.trim()==""){
            ready = false;
            break;
        }
    }

    player.SetVar("EnableSubmit", ready);
}

// Prevent multiple intervals
if(window.submitChecker){
    clearInterval(window.submitChecker);
}

window.submitChecker = setInterval(validate,50);
}

window.Script2 = function()
{
  function lettersOnly(e){

    const allowed = [
        "Backspace","Delete","Tab",
        "ArrowLeft","ArrowRight",
        "ArrowUp","ArrowDown",
        "Home","End"
    ];

    if(allowed.includes(e.key)){
        return;
    }

    if(!/^[A-Za-z '\-]$/.test(e.key)){
        e.preventDefault();
    }
}

function cleanLetters(e){
    e.target.value = e.target.value.replace(/[^A-Za-z '\-]/g,"");
}

// Phone field validation
function phoneOnly(e){

    const allowed = [
        "Backspace","Delete","Tab",
        "ArrowLeft","ArrowRight",
        "ArrowUp","ArrowDown",
        "Home","End"
    ];

    if(allowed.includes(e.key)){
        return;
    }

    // Allow numbers and common phone symbols
    if(!/^[0-9()\-\+\.\s]$/.test(e.key)){
        e.preventDefault();
    }
}

function cleanPhone(e){
    e.target.value = e.target.value.replace(/[^0-9()\-\+\.\s]/g,"");
}

function attachValidation(){

    var inputs = document.querySelectorAll("input, textarea");

    if(inputs.length < 8){
        return;
    }

    // LETTERS ONLY FIELDS
    var letterTargets = [0,1,5,6];

    letterTargets.forEach(function(index){

        var field = inputs[index];

        if(!field.dataset.lettersAttached){

            field.addEventListener("keydown", lettersOnly);
            field.addEventListener("input", cleanLetters);

            field.dataset.lettersAttached = "true";
        }
    });

    // PHONE FIELD (TextEntry4 = index 4)
    var phoneField = inputs[4];

    if(phoneField && !phoneField.dataset.phoneAttached){

        phoneField.addEventListener("keydown", phoneOnly);
        phoneField.addEventListener("input", cleanPhone);

        phoneField.dataset.phoneAttached = "true";
    }
}

// Continuously monitor Storyline DOM
if(window.letterChecker){
    clearInterval(window.letterChecker);
}

window.letterChecker = setInterval(attachValidation,100);
}

};
