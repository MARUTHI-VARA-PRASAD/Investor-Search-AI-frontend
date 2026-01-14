const API_KEY = "This is the Api key's location which i could not paste due to security reasons  kindly understand";

async function searchInvestors() {
    const sector = document.getElementById("sector").value.trim();
    const country = document.getElementById("country").value.trim();
    const results = document.getElementById("results");

    if (!sector || !country) {
        alert("Please enter both sector and country");
        return;
    }

    results.innerHTML = "Searching investors...";

    const prompt = `Suggest 3 investors who invest in the ${sector} sector in ${country}.
Give one-line reasoning for each.`;

    try {
        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",
                    messages: [
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.7
                })
            }
        );

        const data = await response.json();

        if (!data.choices || data.choices.length === 0) {
            throw new Error("No response from API");
        }

        results.innerHTML = data.choices[0].message.content.replace(/\n/g, "<br>");

    } catch (error) {
        console.error("API Error:", error);
        results.innerHTML = "Error fetching investor data (check console).";
    }
}
