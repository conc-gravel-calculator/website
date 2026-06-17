let selectedMaterial = "concrete";

const tabButtons = document.querySelectorAll(".tab-btn");
const calculateBtn = document.getElementById("calculateBtn");
const darkModeToggle = document.getElementById("darkModeToggle");

const results = document.getElementById("results");

const volumeResult = document.getElementById("volumeResult");
const bags60Result = document.getElementById("bags60Result");
const bags80Result = document.getElementById("bags80Result");
const tonsResult = document.getElementById("tonsResult");

const concreteResults = document.getElementById("concreteResults");
const gravelResults = document.getElementById("gravelResults");

/* ========================================================= */
/* INTERSTITIAL ADMOB PLACEHOLDER                            */
/* Paste your AdMob Interstitial Ad Unit ID and logic here   */
/* Example: show ad after calculation button is clicked      */
/* ========================================================= */

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        selectedMaterial = button.dataset.type;
    });
});

darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

calculateBtn.addEventListener("click", calculateMaterials);

function calculateMaterials() {
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const depth = parseFloat(document.getElementById("depth").value);
    const includeBuffer = document.getElementById("buffer").checked;

    if (
        isNaN(length) ||
        isNaN(width) ||
        isNaN(depth) ||
        length <= 0 ||
        width <= 0 ||
        depth <= 0
    ) {
        alert("Please enter valid positive values.");
        return;
    }

    let volume =
        (length * width * (depth / 12)) / 27;

    if (includeBuffer) {
        volume *= 1.10;
    }

    volumeResult.textContent = volume.toFixed(2);

    if (selectedMaterial === "concrete") {

        const bags60 = Math.ceil(volume * 45);
        const bags80 = Math.ceil(volume * 33);

        bags60Result.textContent = bags60;
        bags80Result.textContent = bags80;

        concreteResults.classList.remove("hidden");
        gravelResults.classList.add("hidden");

    } else {

        const tons = volume * 1.4;

        tonsResult.textContent = tons.toFixed(2);

        gravelResults.classList.remove("hidden");
        concreteResults.classList.add("hidden");
    }

    results.classList.remove("hidden");

    /*
    ==========================================================
    ADMOB INTERSTITIAL PLACEHOLDER
    Trigger your interstitial ad here after calculation.
    Example:
    showInterstitialAd();
    ==========================================================
    */
}