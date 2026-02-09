import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "./ui/SearchControl";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSearchHero } from "@/heroes/hooks/useSearchHero";
import { useSearchParams } from "react-router";

export const SearchPage = () => {


    const [searchParams] = useSearchParams();

    const name = searchParams.get('name') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;
    const { data: heroesResponse = [] } = useSearchHero({ name, strength });

    return (
        <>
            <CustomJumbotron
                title="Búsqueda de SuperHéroes"
                description="Descubre, explora y administra super héros y villanos" />

            <CustomBreadCrumbs currentPage={"Buscador de Héroes"}
            // breadcrumbs={
            //     [
            //         { label: 'home1', to: '/' },
            //         { label: 'home2', to: '/' },
            //         { label: 'home3', to: '/' },
            //     ]
            // }
            />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and Search */}
            <SearchControl />

            <HeroGrid heroes={heroesResponse} />

        </>
    )
}

export default SearchPage;