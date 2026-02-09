import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout } from "@/admin/layout/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layout/HeroesLayout";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { HeroPage } from "@/heroes/pages/hero/Heropage";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";


// ! CARGA PEREZOZA
const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));

export const appRouter = createBrowserRouter([

    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'heroes/:idSlug',
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: '*',
                // element: <h1>404</h1>
                element: <Navigate to='/' />
            }
        ]
    },

    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    }

]);