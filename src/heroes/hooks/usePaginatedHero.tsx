import { useQuery } from "@tanstack/react-query";
import { getHeoresByPageAction } from "../actions/get-heores-by-page.action";

interface Props {
    page: number,
    limit: number,
    category?: string
}

export const usePaginatedHero = ({ page, limit, category = 'all' }: Props) => {

    //  Tanstack query para peticiones http y para que se ejecuten una unica vez
    return useQuery({
        queryKey: ['heores', {
            page,
            limit,
            category
        }],
        queryFn: () => getHeoresByPageAction(+page, +limit, category), // puedes ennviar solo el nombre de la funcion si no ocupa argumenos
        staleTime: 1000 * 60 * 5 // 5 minutos
    });

}