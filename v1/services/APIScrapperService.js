export async function obtenerTopTags() {
    try {
        // 👇 import dinámico compatible con CJS/ESM
        const module = await import("@fsoc/royalroadl-api");
        const RoyalRoadAPI = module.RoyalRoadAPI || module.default?.RoyalRoadAPI;

        if (!RoyalRoadAPI) {
            throw new Error("RoyalRoadAPI no disponible en el módulo");
        }

        const api = new RoyalRoadAPI();

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

    } catch (error) {
        console.error("❌ Error en obtenerTopTags:", error);

        throw {
            status: 500,
            message: "Error al obtener datos de RoyalRoad"
        };
    }
}