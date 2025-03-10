/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

// Load the widget script
const script = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
document.body.innerHTML = '<div id="recommendation-widget"></div>';
eval(script);

global.fetch = jest.fn();

describe('Recommendation Widget', () => {
    beforeEach(() => {
        // Reset the DOM before each test
        document.body.innerHTML = '<div id="recommendation-widget"></div>';
        fetch.mockClear(); // Clear any previous mocks
    });

    test('fetchRecommendations() should populate the widget', async () => {
        const mockResponse = {
            list: [
                { name: "Video 1", videoUrl: "https://example.com/video1.mp4", url: "https://example.com" },
                { name: "Article 2", thumbnail: [{ url: "https://example.com/thumb.jpg" }], url: "https://example.com" }
            ]
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        // Execute fetchRecommendations
        await fetchRecommendations();

        // Use async checks to confirm widget updates
        const widget = document.getElementById('recommendation-widget');
        expect(widget.children.length).toBe(2);
        expect(widget.innerHTML).toContain("Video 1");
        expect(widget.innerHTML).toContain("Article 2");
    });

    test('fetchRecommendations() should handle API errors', async () => {
        fetch.mockRejectedValueOnce(new Error("API error"));

        // Execute fetchRecommendations
        await fetchRecommendations();

        const widget = document.getElementById('recommendation-widget');
        expect(widget.innerHTML).toContain("⚠️ Failed to load recommendations");
    });

    test('renderRecommendations() should correctly render different content types', () => {
        const recommendations = [
            { name: "Video 1", videoUrl: "https://example.com/video1.mp4", url: "https://example.com" },
            { name: "Article 2", thumbnail: [{ url: "https://example.com/thumb.jpg" }], url: "https://example.com" }
        ];

        // Directly test renderRecommendations
        renderRecommendations(recommendations);

        const widget = document.getElementById('recommendation-widget');
        expect(widget.querySelectorAll('.recommendation').length).toBe(2);
        expect(widget.innerHTML).toContain("Video 1");
        expect(widget.innerHTML).toContain("Article 2");
    });
});
