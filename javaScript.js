// Obliczenia 
function PrzekrojWlewka()
{
    var Pp;

    if (document.getElementById("kwadrat/prostokat").selected)
    {
        var a = document.getElementById("bokAWlekwa");
        var b = document.getElementById("bokBWlekwa");
        Pp = a * b;
    }
    else if (document.getElementById("kolo").selected)
    {
        var r = document.getElementById("promienWlekwa");

        Pp = Math.PI * Math.pow(r, 2);
    }

    return Pp;
}

function WydajnoscMasowa()
{
    var a = document.getElementById("iloscZylCOS");
    var Vodl = document.getElementById("LiniowaVOdlewania");
    var Ps = document.getElementById("GestoscStaliStaly");
    var Qm = a * PrzekrojWlewka() * Vodl * Ps;

    return Qm;
}

function PrzeliczanieStrumieniaMasowego()
{
    var Pc = document.getElementById("GestoscStaliCiekly");
    var Qv = WydajnoscMasowa() / Pc;

    return Qv;
}

function NatezeniePrzeplywuCieczy()
{
    var SL = document.getElementById("SkalaSL");
    var Qvprim = Math.sqrt(Math.pow(SL, 5)) * PrzeliczanieStrumieniaMasowego();

    return Qvprim;
}



// Ukrywanie
document.addEventListener("DOMContentLoaded",function() {

    var okralgyRadio = document.getElementById('okragly');
    var kwadratowyRadio = document.getElementById('kwadratowy');
    
    var okraglyDiv = document.getElementById('wymiary_okraglego');
    var kwadratowyDiv = document.getElementById('wymiary_kwadratowego');
    
    okralgyRadio.addEventListener('change',function() {
        if (this.checked) {
            okraglyDiv.style.display = 'block';
            kwadratowyDiv.style.display = 'none';
        }
        
    });

    kwadratowyRadio.addEventListener('change',function() {
        if (this.checked) {
            kwadratowyDiv.style.display = 'block';
            okraglyDiv.style.display = 'none';
        }
    });
});