import { RoyalRoadAPI } from "@fsoc/royalroadl-api";

const api = new RoyalRoadAPI();

export async function obtenerTopTags() {
    const response = await api.fictions.getPopular();

    const top10 = response.data.slice(0, 10);

    const contadorTags = {};

    top10.forEach(fiction => {
        if (!fiction.tags) return;

        fiction.tags.forEach(tag => {
            contadorTags[tag] = (contadorTags[tag] || 0) + 1;
        });
    });

    return Object.entries(contadorTags)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag, cantidad]) => ({
            tag,
            cantidad
        }));
}