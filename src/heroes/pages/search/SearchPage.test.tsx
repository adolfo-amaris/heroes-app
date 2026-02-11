import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchHero } from "@/heroes/hooks/useSearchHero";
import type { Hero } from "@/heroes/types/hero.interface";



vi.mock('@/heroes/hooks/useSearchHero', () => ({
    useSearchHero: vi.fn()
}));

const mockUseSearchHero = vi.mocked(useSearchHero);

vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid='custom-jumbotron'></div>
}));

vi.mock('./ui/SearchControl', () => ({
    SearchControl: () => <div data-testid='search-control'></div>
}));

vi.mock('@/heroes/components/HeroStats', () => ({
    HeroStats: () => <div data-testid='custom-herostats'></div>
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes }: { heroes: Hero[] }) => (<div data-testid='hero-grid'>
        {
            heroes.map(hero => (
                <div key={hero.id}>{hero.name}</div>
            ))
        }
    </div>)
}))


mockUseSearchHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
} as unknown as ReturnType<typeof useSearchHero>);

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    )
}

describe('SearchPage', () => {


    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render searchPage with default values', () => {

        const { container } = renderSearchPage();
        expect(mockUseSearchHero).toHaveBeenCalledWith({
            name: undefined,
            strength: undefined
        });

        expect(container).toMatchSnapshot()

    });

    test('should call search action with name parameter', () => {

        const { container } = renderSearchPage(['/search?name=superman']);
        expect(mockUseSearchHero).toHaveBeenCalledWith({
            name: 'superman',
            strength: undefined
        });

        expect(container).toMatchSnapshot()

    });

    test('should call search action with strength parameter', () => {

        const { container } = renderSearchPage(['/search?strength=6']);
        expect(mockUseSearchHero).toHaveBeenCalledWith({
            name: undefined,
            strength: '6'
        });

        expect(container).toMatchSnapshot()

    });

    test('should call search action with name and strength parameter', () => {

        const { container } = renderSearchPage(['/search?strength=8&name=batman']);
        expect(mockUseSearchHero).toHaveBeenCalledWith({
            name: 'batman',
            strength: '8'
        });

        expect(container).toMatchSnapshot()

    });

    test('should render herogrid with search results', () => {
        const mockHeroes: Hero[] = [
            { id: '1', name: 'Clark Kent' } as Hero, // Casteo simple si faltan props
            { id: '2', name: 'Bruce Wayne' } as Hero,
        ];

        mockUseSearchHero.mockReturnValue({
            data: mockHeroes,
            isLoading: false,
            isError: false,
            isSuccess: true,
            // ... otras props obligatorias mockeadas con 'as any' para no ensuciar

        } as unknown as ReturnType<typeof useSearchHero>);

        renderSearchPage();

        // await waitFor(() => {
        //     expect(screen.getByText('Clark Kent')).toBeDefined();
        //     expect(screen.getByText('Bruce Wayne')).toBeDefined();
        // });

        expect(screen.getByText('Clark Kent')).toBeDefined();
        expect(screen.getByText('Bruce Wayne')).toBeDefined();
    });

});