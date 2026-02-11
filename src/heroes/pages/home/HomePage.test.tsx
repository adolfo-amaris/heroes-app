import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

vi.mock('@/heroes/hooks/usePaginatedHero');
vi.mock('@/heroes/hooks/useHeroSummary');

const mockUsePaginatedHero = vi.mocked(usePaginatedHero);
const mockUseHeroSummary = vi.mocked(useHeroSummary); // 2. Referencia al mock


mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
} as unknown as ReturnType<typeof usePaginatedHero>);

mockUseHeroSummary.mockReturnValue({
    data: {
        totalHeroes: 10,
        heroCount: 5,
        villainCount: 5,
        strongestHero: { alias: 'Superman', strength: 10 },
        smartestHero: { alias: 'Batman', intelligence: 10 }
    },
    isLoading: false,
    isError: false
} as unknown as ReturnType<typeof useHeroSummary>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    )
}

describe('HomePage', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render home page with default values', () => {

        const { container } = renderHomePage();

        expect(container).toMatchSnapshot();


    });

    test('should call usePaginatedHero with default value', () => {
        renderHomePage();

        expect(mockUsePaginatedHero).toHaveBeenCalledWith({ page: 1, limit: 6, category: 'all' })

    });

    test('should call usePaginatedHero with default value', () => {
        renderHomePage(['/?page=2&limit=10&category=villain']);

        expect(mockUsePaginatedHero).toHaveBeenCalledWith({ page: 2, limit: 10, category: 'villain' })

    });

    test('should called usePaginatedHero with default page and same limit on tab click', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10']);

        const [, , , villainsTab] = screen.getAllByRole('tab');


        fireEvent.click(villainsTab);

        expect(mockUsePaginatedHero).toHaveBeenCalledWith({ page: 1, limit: 10, category: 'villain' })

    });

});