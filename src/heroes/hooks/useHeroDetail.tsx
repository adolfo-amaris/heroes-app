import { useQuery } from "@tanstack/react-query"
import { getHeroAction } from "../actions/get-hero.action";



export const useHeroDetail = (idSlug: string) => {

    return useQuery({
        queryKey: ['hero-detail', idSlug],
        queryFn: () => getHeroAction(idSlug),
        retry: false
    });

}