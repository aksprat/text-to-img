const inputTxt = document.getElementById("input")
const image = document.getElementById("image")
const button = document.getElementById("btn")
const prompt = document.querySelector("input").value;

async function query(data) {
    image.src = "/loading.gif"
	const response = await fetch("/generate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({prompt})
	});
	const result = await response.blob();
	return result;
}
button.addEventListener('click', async function () {
    query({"inputs": inputTxt.value}).then((response) => {
        const objectURL = URL.createObjectURL(response)
        image.src = objectURL
    });
})
