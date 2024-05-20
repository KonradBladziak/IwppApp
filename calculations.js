// Obliczenia 
function PrzekrojWlewka() {
    var Pp = 0.0;

    if (document.getElementById("kwadratowy").checked) {
        var a = document.getElementById("bokAMM").value;
        var b = document.getElementById("bokBMM").value;
        Pp = (a * b) / 1000000;

        var aMetry = KonwersjaNaMetry(a);
        var bMetry = KonwersjaNaMetry(b);

        var wynikBokAMetry = document.getElementById("bokAM");
        var wynikBokBMetry = document.getElementById("bokBM");

        wynikBokAMetry.innerHTML = aMetry.toFixed(3) + " [m]";
        wynikBokBMetry.innerHTML = bMetry.toFixed(3) + " [m]";

    }
    else if (document.getElementById("okragly").checked) {
        var r = document.getElementById("promienMM").value;

        var rMetry = KonwersjaNaMetry(r);
        var wynikRMetry = document.getElementById("promienM");
        wynikRMetry.innerHTML = rMetry.toFixed(3) + " [m]";

        Pp = Math.PI * Math.pow(r, 2);
    }
    return Pp;
}

function WydajnoscMasowa() {
    var a = document.getElementById("zyly").value;
    var Vodl = document.getElementById("liniowaPO").value;
    var Ps = document.getElementById("gestoscSWSS").value;
    var Qm = a * PrzekrojWlewka() * Vodl * Ps;

    var wynikWydajnosc = document.getElementById("przeplywMasResult");
    wynikWydajnosc.innerHTML = `${Qm.toFixed(1)} [kg·min<sup>-1</sup>]`;

    var liniowaPOMetrSekunda = konwersjaNaSekundy(Vodl);
    let resInsec = a * PrzekrojWlewka() * liniowaPOMetrSekunda * Ps;
    console.log(resInsec);
    wynikWydajnosc.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${resInsec.toFixed(1)} [kg·s<sup>-1</sup>]`;

    var wynikLiniowaPOMetryNaSekunde = document.getElementById("liniowaPOMS")
    wynikLiniowaPOMetryNaSekunde.innerHTML = liniowaPOMetrSekunda.toFixed(3) + " [m·s<sup>-1</sup>]";

    return Qm;
}

function PrzeliczanieStrumieniaMasowego() {
    var Pc = document.getElementById("gestoscSWSC").value;
    var Qv = WydajnoscMasowa() / Pc;
    var a = document.getElementById("zyly").value;
    let QvVein = 0.0;
    let QvVeinS = 0.0;

    if (a == 1) {
        QvVein = Qv;
    } else {
        QvVein = Qv / 4.0;
    }

    let QvS = Qv / 60.0;

    var wynikPrzeliczenia = document.getElementById("przeplywObjResult");
    wynikPrzeliczenia.innerHTML = `${Qv.toFixed(6)} [m<sup>3</sup>min<sup>-1</sup>]`;
    wynikPrzeliczenia.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${QvS.toFixed(6)} [m<sup>3</sup>s<sup>-1</sup>]`;

    if (a == 1) {
        QvVeinS = QvS;
    } else {
        QvVeinS = QvS / 4.0;
    }

    var wynikePrzeliczeniaNaZyle = document.getElementById("przeplywObjResultInOneVein");
    wynikePrzeliczeniaNaZyle.innerHTML = `${QvVein.toFixed(6)} [m<sup>3</sup>min<sup>-1</sup>]`
    wynikePrzeliczeniaNaZyle.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${QvVeinS.toFixed(6)} [m<sup>3</sup>s<sup>-1</sup>]`

    return Qv;
}

function NatezeniePrzeplywuCieczy() {
    var SL = document.getElementById("skalaSi").value;
    var Qvprim = Math.sqrt(Math.pow(SL, 5)) * PrzeliczanieStrumieniaMasowego();
    var wynikPrzeplywu = document.getElementById("przeplywObjCieczyMS");
    wynikPrzeplywu.innerHTML = `${Qvprim.toFixed(1)} [m<sup>3</sup>·s<sup>-1</sup>]`;

    var zamianaJednostek = Qvprim * (1000 * 60);
    var wynikPrzeplywuZamianaJednostek = document.getElementById("przeplywObjCieczyDmMin");
    wynikPrzeplywuZamianaJednostek.innerHTML = `${zamianaJednostek.toFixed(1)} [dm<sup>3</sup>·min<sup>-1</sup>]`;

    return Qvprim;
}

function KonwersjaNaMetry(wartosc) {
    var wynik = wartosc * 0.001;
    return wynik;
}

function konwersjaNaSekundy(wartosc) {
    var wynik = wartosc / 60;
    return wynik;
}

// Ukrywanie
document.addEventListener("DOMContentLoaded", function () {

    var okralgyRadio = document.getElementById('okragly');
    var kwadratowyRadio = document.getElementById('kwadratowy');

    var okraglyDiv = document.getElementById('wymiary_okraglego');
    var kwadratowyDiv = document.getElementById('wymiary_kwadratowego');

    okralgyRadio.addEventListener('change', function () {
        if (this.checked) {
            okraglyDiv.style.display = 'block';
            kwadratowyDiv.style.display = 'none';
        }

    });

    kwadratowyRadio.addEventListener('change', function () {
        if (this.checked) {
            kwadratowyDiv.style.display = 'block';
            okraglyDiv.style.display = 'none';
        }
    });

    let button = document.getElementById('upload');
    let historialResultsDiv = document.getElementById('historical-results');
    if (historialResultsDiv) {
        button.addEventListener('click', function () {
            if (this.click) {
                historialResultsDiv.style.visibility = 'visible'
            }

        })
    }


});
