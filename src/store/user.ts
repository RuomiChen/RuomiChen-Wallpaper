// store.ts
import { createGlobalState } from '@vueuse/core';
import { shallowRef } from 'vue';
import { useMyFetch } from '../utils/request';

export const useGlobalState = createGlobalState(
    () => {
        const userInfo = shallowRef(null)
        const login = async (bodyData: any) => {
            const { data, error } = await useMyFetch('/api/account/login')
                .post(bodyData)
                .json()

            if (error.value) {
                console.error('登录失败:', error.value)
                return
            }

            if (data.value) {
                const { user, token } = data.value
                localStorage.setItem('userInfo', JSON.stringify(user))
                localStorage.setItem('token', JSON.stringify(token))
                userInfo.value = user // 更新全局状态

              
            }
        }
        const register = async (bodyData: any) => {
            const { data } = useMyFetch('/api/account/register').post(bodyData).json()

        }
        return {
            userInfo,
            login,
            register
        }
    }
)