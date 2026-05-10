const screen = document.getElementById("pTextarea");

async function paste() {
    try {
        alert("hi")
        const textP = await navigator.clipboard.readText();
        screen.value += textP;
    }
    catch (err) {
        console.error("Failed to copy text:", err)
    }
}   