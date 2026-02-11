import { useSearchParams } from "react-router"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { use, useMemo } from "react"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"




export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { favoriteCount, favorites } = use(FavoriteHeroContext);


    // console.log(searchParams.get('page')); siempre devuelve un string

    const activeTab = searchParams.get('tab') ?? 'all';
    const paginate = {
        page: Number(searchParams.get('page')) || 1,
        limit: Number(searchParams.get('limit')) || 6,
        category: searchParams.get('category') ?? 'all'
    };

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        //! VALIDACIÓN DE URL y SUS PARAMETROS
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab]);

    const { data: heroesResponse } = usePaginatedHero(paginate);
    const { data: summary } = useHeroSummary();


    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron
                    title="Universo de SuperHéroes"
                    description="Descubre, explora y administra super héros y villanos" />

                <CustomBreadCrumbs currentPage="Super Héroes" />


                {/* Stats Dashboard */}
                <HeroStats />

                {/* Advanced Filters */}

                {/* onClick={() => setActiveTab('all')}
            onClick={() => setActiveTab('favorites')}
            onClick={() => setActiveTab('heroes')}
            onClick={() => setActiveTab('villains')} */}

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'all');
                                prev.set('category', 'all');
                                prev.set('page', '1');
                                return prev;
                            })} >
                            All Characters ({summary?.totalHeroes})
                        </TabsTrigger>
                        <TabsTrigger
                            value="favorites"
                            className="flex items-center gap-2"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'favorites');
                                return prev;
                            })} >
                            Favoritos ({favoriteCount})</TabsTrigger>
                        <TabsTrigger
                            value="heroes"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'heroes');
                                prev.set('category', 'hero');
                                prev.set('page', '1');

                                return prev;
                            })} >
                            Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger
                            value="villains"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'villains');
                                prev.set('category', 'villain');
                                prev.set('page', '1');

                                return prev;
                            })} >
                            Villains ({summary?.villainCount})</TabsTrigger>
                    </TabsList>

                    <TabsContent value={"all"}>
                        {/* Mostrar todos los personajes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value={"favorites"}>
                        <h1>Favoritos</h1>
                        <HeroGrid heroes={favorites} />
                    </TabsContent>
                    <TabsContent value={"heroes"}>
                        <h1>Héroes</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value={"villains"}>
                        <h1>Villanos</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>


                {/* Pagination */}
                {/* tarea agregar paginación para favorites  */}
                {
                    selectedTab !== 'favorites' && (
                        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
                    )
                }

            </>
        </>
    )
}
