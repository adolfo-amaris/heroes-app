import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";
import type { Options } from "../types/search-hero-options";

const BASE_URL = import.meta.env.VITE_API_URL;
export const getSearchHeroesAction = async (options: Options = {}): Promise<Hero[]> => {

    const { name, team, category, universe, status, strength } = options;

    if (!name && !team && !category && !universe && !status && !strength) {
        return [];
    }

    const { data } = await heroApi.get<Hero[]>('/search', {
        params: {
            name: name,
            team: team,
            category: category,
            universe: universe,
            status: status,
            strength: strength,
        }
    });


    return data.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));

}