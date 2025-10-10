import { createFetch } from "@vueuse/core";
import { AppToast } from "./toast";
export const BASE_URL = 'https://www-zihao-hk.kooboo.io'
export const useMyFetch = createFetch({
    baseUrl: 'https://www-zihao-hk.kooboo.io',
    options: {
        async beforeFetch({ options }) {
            //   const myToken = await getMyToken()
            //   options.headers.Authorization = `Bearer ${myToken}`

            return { options }
        },
        afterFetch({ data, response, context, execute }) {

            if (data.code == 0) {
                return { data: data.data, response }
            }
            else {
                throw Error(data.message || "Network error");
            }

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
