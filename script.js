document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("recommendation-widget")) {
        fetchRecommendations();
    }
});

async function fetchRecommendations() {
    try {
        const widget = document.getElementById('recommendation-widget');
        if (!widget) {
            console.error("Error: recommendation-widget not found");
            return;
        }

        widget.innerHTML = '<div class="loader"></div>';

        const API_URL = "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get";

        const params = new URLSearchParams({
            "app.type": "desktop",
            "app.apikey": "f9040ab1b9c802857aa783c469d0e0ff7e7366e4",
            "count": 6,
            "source.type": "video",
            "source.id": "demo-source",
            "source.url": "http://www.site.com/videos/demo.html",
            "_t": Date.now()
        });

        const apiUrl = `${API_URL}?${params.toString()}`;
        console.log("Request URL:", apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log('API Response:', data);

        widget.innerHTML = ''; // Clear loader before rendering

        if (data.list && data.list.length > 0) {
            renderRecommendations(data.list);
        } else {
            widget.innerHTML = '<p class="error">No recommendations available, try refreshing</p>';
        }
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        const widget = document.getElementById('recommendation-widget');
        if (widget) {
            widget.innerHTML = '<p class="error">⚠️ Failed to load recommendations. Please try again later.</p>';
        }
    }
}

function renderRecommendations(recommendations) {
    const widget = document.getElementById('recommendation-widget');
    if (!widget) {
        console.error("Error: recommendation-widget not found");
        return;
    }

    widget.innerHTML = ''; // Clear loader before rendering items

    recommendations.forEach(rec => {
        try {
            const isSponsored = rec.origin && rec.origin.toLowerCase() === 'sponsored';

            const div = document.createElement('div');
            div.className = 'recommendation';

            let mediaContent = renderMediaContent(rec);

            div.innerHTML = `
                ${isSponsored ? '<span class="badge">Sponsored</span>' : ''}
                ${mediaContent}
                <h3>${rec.name}</h3>
                <p>${rec.branding || ''}</p>
                <a href="${rec.url}" target="${isSponsored ? '_blank' : '_self'}">Read More</a>
            `;

            widget.appendChild(div);
        } catch (error) {
            console.error("Error rendering recommendation:", error);
        }
    });
}

function renderMediaContent(rec) {
    if (rec.videoUrl) {
        return `<video controls class="video"><source src="${rec.videoUrl}" type="video/mp4"></video>`;
    } else if (rec.thumbnail && rec.thumbnail[0]) {
        return `<img src="${rec.thumbnail[0].url || 'https://via.placeholder.com/150'}" alt="Thumbnail">`;
    } else {
        return `<p>No media content available</p>`;
    }
}
