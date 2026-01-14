const API_KEY = "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"; 

async function searchInvestors() {
    const sector = document.getElementById("sector").value;
    const country = document.getElementById("country").value;
    const results = document.getElementById("results");

    if (!sector || !country) {
        alert("Enter both sector and country");
        return;
    }

    results.innerHTML = "Searching...";

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
                    messages: [{ role: "user", content: prompt }]
                })
            }
        );

        const data = await response.json();

        if (!data.choices) {
            throw new Error("No response");
        }

        results.innerHTML = data.choices[0].message.content.replace(/\n/g, "<br>");

    } catch (err) {
        console.error(err);
        results.innerHTML = "API error. Check console.";
    }
}
