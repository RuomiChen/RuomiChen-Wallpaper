import { createFetch, useStorage } from "@vueuse/core";
import { AppToast } from "./toast";
export const BASE_URL = 'https://www-zihao-hk.kooboo.io'
export const useMyFetch = createFetch({
    baseUrl: 'https://www-zihao-hk.kooboo.io',
    options: {
        async beforeFetch({ options }) {
            const token = useStorage('token', null)
            options.headers.Authorization = `Bearer ${token.value}`

            return { options }
        },
        afterFetch({ data, response, context, execute }) {
            console.log(data);
            console.log(response);

            if (data.code == 0) {
                return { data: data.data, response }
            }
            else if (data.code) {
                throw Error(data.message || "Network error");
            }
            return { data, response }

        }, updateDataOnError: true,
        onFetchError({ error, data, response, context, execute }) {
            // same as afterFetch
            AppToast.error(error.message || "Network error");
            
            return { error, data }
        },
    },
    fetchOptions: {
        mode: 'cors',
    },
})
