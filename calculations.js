// Obliczenia 
function PrzekrojWlewka()
{
    var Pp;

    if (document.getElementById("kwadratowy").checked)
    {
        var a = document.getElementById("bokAMM").value;
        var b = document.getElementById("bokBMM").value;
        Pp = a * b;

        var aMetry = KonwersjaNaMetry(a);
        var bMetry = KonwersjaNaMetry(b);

        var wynikBokAMetry = document.getElementById("bokAM");
        var wynikBokBMetry = document.getElementById("bokBM");

        wynikBokAMetry.innerHTML = aMetry.toFixed(3) + " [m]";
        wynikBokBMetry.innerHTML = bMetry.toFixed(3) + " [m]";
        
    }
    else if (document.getElementById("okragly").checked)
    {
        var r = document.getElementById("promienMM").value;

        var rMetry = KonwersjaNaMetry(r);
        var wynikRMetry = document.getElementById("promienM");
        wynikRMetry.innerHTML = rMetry.toFixed(3) + " [m]";

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

    var liniowaPOMetrSekunda = konwersjaNaSekundy(Vodl);
    var wynikLiniowaPOMetryNaSekunde = document.getElementById("liniowaPOMS")
    wynikLiniowaPOMetryNaSekunde.innerHTML = liniowaPOMetrSekunda.toFixed(3) + " [m·s<sup>-1</sup>]";

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

function KonwersjaNaMetry(wartosc)
{
    var wynik = wartosc * 0.001;
    return wynik;
}

function konwersjaNaSekundy(wartosc)
{
    var wynik = wartosc/60;
    return wynik;
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

    let button = document.getElementById('readFromCSVbutton');
    console.log(button);
    let historialResultsDiv = document.getElementById('historical-results');
    console.log(historialResultsDiv);
    button.addEventListener('click', function(){
        if(this.click){
            historialResultsDiv.style.visibility = 'visible'
        }
        
    })

});


function showHistoricalResultsFromCSV(){


}

function saveToCSVFile() {

}


function convertCalculationsToCSV(){

}