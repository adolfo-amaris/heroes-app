import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePaginatedHero } from "./usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getHeoresByPageAction } from "../actions/get-heores-by-page.action";

vi.mock('../actions/get-heores-by-page.action', () => ({
    getHeoresByPageAction: vi.fn()
}));


const mockGetHeroesByPageAction = vi.mocked(getHeoresByPageAction);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const tanStackCustomProvider = () => {


    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}


describe('usePaginatedHero', () => {

    // ! Se limpia el cliente para que en cada prueba no tenga registros de petición
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });

    test('should return the initial state (isLoading) state', () => {

        const { result } = renderHook(() => usePaginatedHero({ page: 1, limit: 6 }), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined);
        expect(result.current.data).toBeUndefined();

    });


    test('should return success state with data wen API call succeeds', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHero({ page: 1, limit: 6 }), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all');


    });

    test('should call getHeroesByPagesAction with arguments', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHero({ page: 1, limit: 6, category: 'heroesABC' }), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'heroesABC');

    });



})