if (document.getElementById('upload')) {
	document.getElementById('upload').document.addEventListener("click", function () {
		showHistoricalResultsFromCSV();
	});
}



function convertCalculationsToCSV() {
	let headers= [
		"Przekrój odlewanego wklewka",
		"Wymiary",
		"Ilość żył maszyny COS",
		"Liniowa prędkość odlewania [m·min-1]",
		"Gęstość stali w stanie stałym [kg·m-3]",
		"Gęstość stali w stanie cieklym [kg·m-3]",
		"Przepływ masowy - urządzenie przemysłowe [kg·min-1]",
		"Przepływ objętościowy - urządzenie przemysłowe [m3·min-1]",
		"Przepływ objętościowy - w jednej żyle [m3·min-1]",
		"Skala modelu SI;Przepływ objętościowy - w jednej żyle [m3·s-1]",
		"Data"
	]

	let values= [
		pobierzTypBryly(),pobierzWymiaryM(),pobierzIloscZylCOS(),pobierzLiniowaPredkoscOdlewaniaMmin(),
		pobierzGestoscStala(),pobierzGestoscCiekla(),pobierzPrzeplywMasowy(),pobierzPrzeplywObjetosciowyUP(),
		pobierzPrzeplywObjetosciowyJZ(),pobierzSkaleModelu(),pobierzPrzeplywCieczyMW(),pobierzDate()
	]

	console.log(values);
	
	var fileContent="";

	for(let i = 0;i< headers.length;i++){
		fileContent+=headers[i]+";";
	}	

	fileContent+="\n";

	for(let i = 0;i< values.length;i++){
		fileContent+=values[i].replace(/\./g, ',')+";";
	}

	fileContent=fileContent.slice(0, -1);
	fileContent=fileContent.replace(/\n/g, '\r\n')
	downloadCSVFile(fileContent);

}

function downloadCSVFile(csvContent) {

	// const bom = "\uFEFF";
	// const CSVFile = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });


	const CSVFile = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

	let temp_link = document.createElement('a');

	temp_link.download = "wyniki.csv";
	let url = window.URL.createObjectURL(CSVFile);
	temp_link.href = url;

	// This link should not be displayed
	temp_link.style.display = "none";
	document.body.appendChild(temp_link);

	// Automatically click the link to trigger download 
	temp_link.click();
	document.body.removeChild(temp_link);
}

function sprawdzPrzekroj() {
	let przekrojKwadratowy = document.getElementById("kwadratowy");
	let przekrojOkragly = document.getElementById("okragly");

	if (przekrojKwadratowy) {
		if (document.getElementById("bokAMM").value == document.getElementById("bokBMM").value) {
			return "Kwadratowy";
		}
		else {
			return "Prostokątny";
		}
	}
	else if (przekrojOkragly) {
		return "Okrągły";
	}

	return "";
}


function showHistoricalResultsFromCSV() {
	var fileUpload = document.getElementById("fileUpload");
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
	if (regex.test(fileUpload.value.toLowerCase())) {
		if (typeof (FileReader)) {
			var reader = new FileReader();
			var tbody = document.getElementById('csv-results-table-tbody');
			reader.onload = function (e) {
				var rows = e.target.result.split("\r");
				for (let i = 1; i < rows.length ;i++) {
					var cells = rows[i].split(";");
					var row = tbody.insertRow(-1);
					console.log(rows[i] + " i " + row);
					if (cells.length > 1) {
						for (let c of cells) {
							var cell = row.insertCell(-1);
							cell.innerHTML += c;
						}
					}
					tbody.appendChild(row);
				}
			}
			reader.readAsText(fileUpload.files[0]);
		} else {
			alert("Przeglądarka nie wspiera HTML5.");
		}
	} else {
		alert("Proszę wybrać plik csv.");
	}
}

function pobierzTypBryly(){

	if(document.getElementById("kwadratowy").checked){
		return "Kwadratowy/Prostokątny";
	}

	if(document.getElementById("okragly").checked){
		return "Okrągły";
	}
}

function pobierzWymiaryM(){

	if(document.getElementById("kwadratowy").checked){
		let varA = document.getElementById("bokAM").textContent.replace(" [m]", "");
		let varB = document.getElementById("bokBM").textContent.replace(" [m]", "");
		return varA+"x"+varB;
	}

	if(document.getElementById("okragly").checked){
		let varA = document.getElementById("promienM").textContent.replace(" [m]", "");
		return varA;
	}
}

function pobierzIloscZylCOS(){
	let varA=document.getElementById("zyly").value;
	return varA;
}

function pobierzLiniowaPredkoscOdlewaniaMmin(){
	let varA = document.getElementById("liniowaPO").value;
	return varA;
}


function pobierzGestoscStala(){
	let varA = document.getElementById("gestoscSWSS").value;
	return varA;
}

function pobierzGestoscCiekla(){
	let varA = document.getElementById("gestoscSWSC").value;
	return varA;
}

function pobierzPrzeplywMasowy(){
	let varA = document.getElementById("przeplywMasResult").textContent.split(" [kg·min-1]        ")[0];
	return varA;
}

function pobierzPrzeplywObjetosciowyUP(){
	let varA = document.getElementById("przeplywObjResult").textContent.split(" [m3min-1]        ")[0];
	return varA;
}

function pobierzPrzeplywObjetosciowyJZ(){
	let varA = document.getElementById("przeplywObjResultInOneVein").textContent.split(" [m3min-1]        ")[0];
	return varA;
}

function pobierzSkaleModelu(){
	let varA = document.getElementById("skalaSi").value;
	return varA;
}

function pobierzPrzeplywCieczyMW(){
	let varA = document.getElementById("przeplywObjCieczyMS").textContent.replace(" [m3·s-1]","");
	return varA;
}


function pobierzDate() {
    // Utworzenie nowego obiektu Date reprezentującego bieżącą datę i czas
    let today = new Date();

    // Pobranie roku
    let year = today.getFullYear();

    // Pobranie miesiąca (miesiące są indeksowane od 0, więc dodajemy 1)
    let month = today.getMonth() + 1;

    // Pobranie dnia miesiąca
    let day = today.getDate();

    // Dodanie zer wiodących do miesiąca i dnia, jeśli jest to konieczne
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    // Sformatowanie daty w formacie YYYY-MM-DD
    let formattedDate = year + '-' + month + '-' + day;

    return formattedDate;
}