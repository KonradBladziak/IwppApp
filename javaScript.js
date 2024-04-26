// Obliczenia 
function PrzekrojWlewka()
{
    var Pp;

    if (document.getElementById("kwadratowy").checked)
    {
        var a = document.getElementById("bokA").value;
        var b = document.getElementById("bokB").value;
        Pp = a * b;
    }
    else if (document.getElementById("okragly").checked)
    {
        var r = document.getElementById("promien").value;

        Pp = Math.PI * Math.pow(r, 2);
    }
    return Pp;
}

function WydajnoscMasowa()
{
    var a = document.getElementById("zyly").value;
    var Vodl = document.getElementById("liniowaPO").value;
    var Ps = document.getElementById("gestoscSWSS").value;
    var Qm = a * PrzekrojWlewka() * Vodl * Ps;
    var wynikWydajnosc = document.getElementById("przeplywMasResult");
    wynikWydajnosc.innerHTML = Qm.toFixed(1);
    return Qm;
}

function PrzeliczanieStrumieniaMasowego()
{
    var Pc = document.getElementById("gestoscSWSC").value;
    var Qv = WydajnoscMasowa() / Pc;
    var wynikPrzeliczenia = document.getElementById("przeplywObjResult");
    wynikPrzeliczenia.innerHTML = Qv.toFixed(1);
    return Qv;
}

function NatezeniePrzeplywuCieczy()
{
    var SL = document.getElementById("skalaSi").value;
    var Qvprim = Math.sqrt(Math.pow(SL, 5)) * PrzeliczanieStrumieniaMasowego();
    var wynikPrzeplywu = document.getElementById("przeplywObjCieczyMS");
    wynikPrzeplywu.innerHTML = Qvprim.toFixed(1);

    var zamianaJednostek = Qvprim * (1000 * 60);
    var wynikPrzeplywuZamianaJednostek = document.getElementById("przeplywObjCieczyDmMin");
    wynikPrzeplywuZamianaJednostek.innerHTML = zamianaJednostek.toFixed(1);

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