import { heroApi } from "../api/hero.api"
import type { HeroresResponse } from "../types/get-heores.response";

const BASE_URL = import.meta.env.VITE_API_URL;
export const getHeoresByPageAction = async (page: number, limit: number = 6, category: string = 'all'): Promise<HeroresResponse> => {

    if (isNaN(page)) {
        page = 1;
    };

    if (isNaN(limit)) {
        page = 6;
    };

    const { data } = await heroApi.get<HeroresResponse>('/', {
        params: {
            limit: limit,
            offset: (page - 1) * limit,
            category: category
        }
    });

    const heores = data.heroes.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));

    return {
        ...data,
        heroes: heores
    }

}