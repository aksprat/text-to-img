document.querySelector("button").addEventListener("click", async () => {
    const prompt = document.querySelector("input").value;
    
    if (!prompt) {
        console.log("No prompt entered");
        return;
    }
    
    console.log(`Sending prompt: ${prompt}`);
    
    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });
        
        if (response.ok) {
            console.log("Image generated successfully");
            const blob = await response.blob();
            const imgURL = URL.createObjectURL(blob);
            document.querySelector("img").src = imgURL;
        } else {
            const errorData = await response.json();
            console.error("Error from server: ", errorData.error);
            alert("Error: " + errorData.error);
        }
    } catch (error) {
        console.error("Error fetching image: ", error);
        alert("Error: " + error.message);
    }
});



document.getElementById('btn').addEventListener('click', async () => {
    const prompt = document.getElementById('input').value;
    const loadingElement = document.getElementById('loading');
    const imageElement = document.getElementById('image');
    
    // Show the loading spinner
    loadingElement.style.display = 'block';
    imageElement.style.display = 'none';

    // Fetch the generated image from your Flask back-end
    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            imageElement.src = imageUrl;
            imageElement.style.display = 'block'; // Display the image
        } else {
            console.error("Error generating image", response.statusText);
        }
    } catch (error) {
        console.error("Error: ", error);
    } finally {
        // Hide the loading spinner
        loadingElement.style.display = 'none';
    }
});
