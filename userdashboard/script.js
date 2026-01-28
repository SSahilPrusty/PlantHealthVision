const fileInput = document.getElementById('file');
const uploadDiv = document.getElementById('upload');
const previewImg = document.getElementById('preview');
const scanBtn = document.getElementById('scanBtn');
const imgScanLine = document.getElementById('imgScan');
const resultDiv = document.getElementById('result');

// 1. Handle File Selection
uploadDiv.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        previewImg.src = url;
        previewImg.style.display = 'block';
        scanBtn.disabled = false;
    }
};

// 2. Handle Scan Button
scanBtn.onclick = async () => {
    const file = fileInput.files[0];
    if (!file) return;

    // Start Animations
    scanBtn.innerText = "⌛ ANALYZING...";
    scanBtn.disabled = true;
    imgScanLine.style.display = 'block';

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/predict", {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (response.ok) {
            showResult(data);
        } else {
            alert("Error: " + (data.error || "Server failed"));
        }
    } catch (err) {
        alert("Connection failed!");
    } finally {
        // Stop Animations
        imgScanLine.style.display = 'none';
        scanBtn.innerText = "🔍 START SCAN";
        scanBtn.disabled = false;
    }
};

// 3. Show Result in HTML
function showResult(data) {
    document.getElementById('diseaseName').innerText = data.disease;
    document.getElementById('confidenceValue').innerText = data.confidence + "%";
    document.getElementById('confidenceBar').style.width = data.confidence + "%";
    document.getElementById('treatmentText').innerText = data.treatment;
    document.getElementById('preventionText').innerText = data.prevention;

    resultDiv.style.display = 'block';
}

// 4. Scan Again Button
document.getElementById('scanAgainBtn').onclick = () => {
    resultDiv.style.display = 'none';
    previewImg.style.display = 'none';
    fileInput.value = "";
    scanBtn.disabled = true;
};