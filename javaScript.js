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