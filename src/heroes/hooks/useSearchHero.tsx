import { useQuery } from "@tanstack/react-query";
import type { Options } from "../types/search-hero-options";
import { getSearchHeroesAction } from "../actions/search-heros.action";



export const useSearchHero = ({ name, team, category, universe, status, strength }: Options) => {
    return useQuery({
        queryKey: ['search-heroes', {
            name: name,
            team: team,
            category: category,
            universe: universe,
            status: status,
            strength: strength
        }],
        queryFn: () => getSearchHeroesAction({ name, team, category, universe, status, strength }),
        retry: false,
        staleTime: 1000 * 60 * 5 // 5 minutos
    });
}