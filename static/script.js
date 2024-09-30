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
