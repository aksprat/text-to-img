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
    query({"inputs": inputTxt.value}).then((response) => {
        const objectURL = URL.createObjectURL(response)
        image.src = objectURL
    });

})
