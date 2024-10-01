const inputTxt = document.getElementById("input")
const image = document.getElementById("image")
const button = document.getElementById("btn")

async function query(data) {
    image.src = "/static/loading.gif"
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
		{
			headers: {
				Authorization: "Bearer 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" ,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
button.addEventListener('click', async function () {
    query({"inputs": inputTxt.value}).then((prompt) => {
        const objectURL = URL.createObjectURL(prompt)
        image.src = objectURL
    });
}
// Add click event listener to the button
button.addEventListener("click", async function () {
    handleGenerate();
});

// Add keypress event listener to the input field to detect 'Enter' key
inputTxt.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleGenerate();
    }
});
