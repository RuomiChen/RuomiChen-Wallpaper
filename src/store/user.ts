// store.ts
import { createGlobalState, StorageSerializers, useStorage } from '@vueuse/core';
import router from '../router';
import { useMyFetch } from '../utils/request';
import { AppToast } from '../utils/toast';

export const useGlobalState = createGlobalState(
    () => {
        const userInfo = useStorage('userInfo', null, undefined, { serializer: StorageSerializers.object }) // 持久化到 localStorage
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
                userInfo.value = user
                localStorage.setItem('token', token)
            }
            router.push({ name: 'Home' })

        }
        // ✅ 新增方法：更新用户信息
        const updateUserInfo = (newData: Partial<typeof userInfo.value>) => {
            if (!userInfo.value) return;
            userInfo.value = { ...userInfo.value, ...newData };
        };
        const logout = () => {
            userInfo.value = null
            router.push({ name: 'Account' })
        }

        const register = async (bodyData: any) => {
            useMyFetch('/api/account/register').post(bodyData).json()
            AppToast.success('register success')

        }

        const refreshUserInfo = async () => {
            const { data, error } = await useMyFetch('/api/user/info_get').get().json();
            if (!error.value) {
                console.log('data',data.value);
                
                userInfo.value = data.value;
            } else {
                AppToast.error('Failed to refresh user info');
            }
        };
        return {
            userInfo,
            login,
            register,
            logout,
            updateUserInfo,
            refreshUserInfo
        }
    }
)