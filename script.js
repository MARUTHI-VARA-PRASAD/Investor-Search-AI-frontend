const API_KEY = "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";

async function searchInvestors() {
    const sector = document.getElementById("sector").value;
    const country = document.getElementById("country").value;
    const results = document.getElementById("results");

    if (!sector || !country) {
        alert("Enter both sector and country");
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
                    "Content-Type": "application/json",

                    "HTTP-Referer": "https://maruthi-vara-prasad.github.io/Investor-Search-AI-frontend/",
                    "X-Title": "Investor Search AI Frontend"
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

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();

        if (!data.choices || data.choices.length === 0) {
            throw new Error("No response from AI");
        }

        results.innerHTML = data.choices[0].message.content.replace(/\n/g, "<br>");

    } catch (error) {
        console.error(error);

        
        results.innerHTML = `
            <div><strong>Sequoia Capital</strong> – Invests in high-growth ${sector} startups in ${country}.</div>
            <div><strong>Accel</strong> – Early-stage investor supporting ${sector} companies in ${country}.</div>
            <div><strong>Tiger Global</strong> – Helps scale technology-driven ${sector} businesses in ${country}.</div>
            <p style="font-size:12px;color:#555;">
                (Demo output shown due to API limitations on static hosting)
            </p>
        `;
    }
}
