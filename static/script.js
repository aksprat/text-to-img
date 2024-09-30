const inputTxt = document.getElementById("input")
const image = document.getElementById("image")
const button = document.getElementById("btn")

async function query(data) {
    image.src = "/loading.gif"
// Fetch the generated image from your Flask back-end
    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
	const result = await response.blob();
	return result;
    } catch (error) {
        console.error("Error: ", error);
});
button.addEventListener('click', async function () {
    query({"inputs": inputTxt.value}).then((response) => {
        const objectURL = URL.createObjectURL(response)
        image.src = objectURL
    });

})
