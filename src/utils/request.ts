import { createFetch } from "@vueuse/core";
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
            return { data: null, response }
        }
    },
    fetchOptions: {
        mode: 'cors',
    },
})
