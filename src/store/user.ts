// store.ts
import { createGlobalState } from '@vueuse/core';
import { shallowRef } from 'vue';
import { useMyFetch } from '../utils/request';
import { AppToast } from '../utils/toast';

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
                localStorage.setItem('token', token)
                userInfo.value = user // 更新全局状态


            }
        }

        const logout = () => {
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
            userInfo.value = null
        }

        const register = async (bodyData: any) => {
            useMyFetch('/api/account/register').post(bodyData).json()
            AppToast.success('register success')

        }
        return {
            userInfo,
            login,
            register,
            logout
        }
    }
)