// @vitest-environment node
import { beforeEach, describe, expect, test } from "vitest";
import { getHeoresByPageAction } from "./get-heores-by-page.action";
import AxiosMockAdapter from 'axios-mock-adapter';
import { heroApi } from "../api/hero.api";


const BASE_URL = import.meta.env.VITE_API_URL;

describe('getHeoresByPageAction', () => {

    const heroesApiMock = new AxiosMockAdapter(heroApi);
    beforeEach(() => {
        heroesApiMock.reset();
        // heroesApiMock.resetHistory();
    });

    test('should returnt default heroes', async () => {

        heroesApiMock.onGet('/').reply(200, {
            total: 10,
            pages: 2,
            heroes: [
                {
                    image: '1.jpg'
                },
                {
                    image: '2.jpg'
                }
            ]
        })

        const response = await getHeoresByPageAction(1);

        expect(response).toStrictEqual(
            {
                total: 10,
                pages: 2,
                heroes: [
                    { image: `${BASE_URL}/images/1.jpg` },
                    { image: `${BASE_URL}/images/2.jpg` }
                ]
            }
        );
    });

    test('should return the correct heroes when page is not a number', async () => {

        const responseOjbect = {
            total: 10,
            page: 1,
            heroes: []
        };

        heroesApiMock.onGet('/').reply(200, responseOjbect);

        await getHeoresByPageAction('abc' as unknown as number);

        const params = heroesApiMock.history.get[0].params;
        expect(params).toStrictEqual({ limit: 6, offset: 0, category: 'all' })

    });

    test('should return the correct heroes when is string number', async () => {

        const responseOjbect = {
            total: 10,
            page: 1,
            heroes: []
        };

        heroesApiMock.onGet('/').reply(200, responseOjbect);

        await getHeoresByPageAction('5' as unknown as number);

        const params = heroesApiMock.history.get[0].params;
        expect(params).toStrictEqual({ limit: 6, offset: 24, category: 'all' })

    });


    test('should call the api with correct params', async () => {

        const responseOjbect = {
            total: 10,
            page: 1,
            heroes: []
        };

        heroesApiMock.onGet('/').reply(200, responseOjbect);

        await getHeoresByPageAction(2, 10, 'heroes');

        const params = heroesApiMock.history.get[0].params;
        expect(params).toStrictEqual({ limit: 10, offset: 10, category: 'heroes' })

    });



});