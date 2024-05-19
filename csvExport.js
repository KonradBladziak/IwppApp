const csvFile = fetch('./temp.csv');

document.getElementById('').document.addEventListener("readFromCSVbutton", function () {
	showHistoricalResultsFromCSV();
});

function convertCalculationsToCSV() {
	let danePrzemysloweMap = new Map();

	let przekroj = sprawdzPrzekroj();
	danePrzemysloweMap.set(0, przekroj);

	let danePrzemysloweKlucz = [
		"Przekrój odlewanego wklewka",
		"Wymiary odlewanego wklewka [mm]",
		"Wymiary odlewanego wklewka [m]",
		"Ilość żył maszyny COS",
		"Liniowa prędkość odlewania [m·min⁻¹]",
		"Gęstość stali w stanie stałym [kg·min⁻³]",
		"Gęstość stali w stanie cieklym [kg·min⁻³]",
		"Przepływ masowy - urządzenie przemysłowe [kg·min⁻³]",
		"Przepływ objętościowy - urządzenie przemysłowe [kg·min⁻³]"
	];


	let danePrzemysloweWartosc = [przekroj, "test", "", "", "", "", "", "", ""];

	if (danePrzemysloweKlucz.length !== danePrzemysloweWartosc.length) {
		console.error("Długości tablic danePrzemysloweColTyt i danePrzemysloweColWart są różne.");
		return;
	}

	let csvContent = "";

	for (let i = 0; i < danePrzemysloweKlucz.length; i++) {
		csvContent += `"${danePrzemysloweKlucz[i]}";"${danePrzemysloweWartosc[i]}"\n`;
	}

	downloadCSVFile(csvContent);
}

function downloadCSVFile(csvContent) {

	const bom = "\uFEFF";
	const CSVFile = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });

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
	let fileReader = new FileReader();
	fileReader.addEventListener("loadend", function () {

		document.getElementById('file').innerText = fileReader.result;
	});
	fileReader.readAsText(csvFile);
	console.log(fileReader.result);
}




