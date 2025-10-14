<template>
    <div class="h-[100vh] bg-gradient-to-b from-gray-900 to-gray-600 flex justify-center items-center">
        <div class="w-full sm:w-96 bg-white/10 p-8 rounded-2xl shadow-lg">
            <!-- 切换开关 -->
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-white text-2xl font-bold">
                    {{ isLogin ? 'Login' : 'Register' }}
                </h2>
                <ToggleSwitch v-model="isLogin" />
            </div>

            <!-- 登录 / 注册 表单 -->
            <div class="flex flex-col gap-6">
                <!-- 注册时显示用户名 -->
                <IconField v-if="!isLogin">
                    <InputIcon>
                        <i class="pi pi-user" />
                    </InputIcon>
                    <InputText id="name" v-model="form.firstName" type="text" placeholder="FirstName" fluid />
                </IconField>

                <IconField v-if="!isLogin">
                    <InputIcon>
                        <i class="pi pi-user" />
                    </InputIcon>
                    <InputText id="name" v-model="form.lastName" type="text" placeholder="LastName" fluid />
                </IconField>

                <IconField>
                    <InputIcon>
                        <i class="pi pi-envelope" />
                    </InputIcon>
                    <InputText autocomplete="off" id="email" v-model="form.email" type="email" placeholder="Email"
                        fluid />
                </IconField>

                <IconField>
                    <InputIcon>
                        <i class="pi pi-lock" />
                    </InputIcon>
                    <InputText id="password" autocomplete="off" v-model="form.password" type="password"
                        placeholder="Password" fluid />
                </IconField>

                <!-- 注册时显示“同意条款” -->
                <div v-if="!isLogin" class="flex items-center gap-2">
                    <Checkbox inputId="accept" v-model="accept" name="accept" value="yes" />
                    <label for="accept" class="text-white text-sm cursor-pointer">
                        I agree to the terms and conditions.
                    </label>
                </div>

                <!-- 按钮 -->
                <div class="flex items-center gap-2">
                    <Button icon="pi pi-home" severity="secondary"  @click="router.push({name:'Home'})" />
                    <Button type="submit" class="ml-auto flex-1" :label="isLogin ? 'Login' : 'Register'"  @click="handleSubmit" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Button,
    Checkbox,
    IconField,
    InputIcon,
    InputText,
    ToggleSwitch
} from 'primevue';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { router } from '../router';
import { useGlobalState } from '../store/user';
import { AppToast } from '../utils/toast';

const route = useRoute()

const isLogin = ref(false) // true = 登录, false = 注册

// ✅ 监听 query 变化（包括刷新页面时）
watch(
    () => route.query.type,
    (val) => {
        isLogin.value = val == 'login'
    },
    { immediate: true } // ✅ 页面刷新时立即执行一次
)



const form = reactive({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
})
const accept = ref(false)
const userState = useGlobalState()

// 邮箱校验
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const handleSubmit = async () => {
    // === 登录 ===
    if (isLogin.value) {
        if (!form.email || !form.password) {
            return AppToast.error('Please fill in both email and password.')
        }
        if (!isValidEmail(form.email)) {
            return AppToast.error('Invalid email format.')
        }

        await userState.login({
            email: form.email,
            password: form.password
        })
        router.push({ name: 'Home' })
    }

    // === 注册 ===
    else {
        if (!form.firstName || !form.lastName) {
            return AppToast.error('Please fill in your first and last name.')
        }
        if (!form.email || !isValidEmail(form.email)) {
            return AppToast.error('Please enter a valid email address.')
        }
        if (!form.password || form.password.length < 6) {
            return AppToast.error('Password must be at least 6 characters long.')
        }
        if (!accept.value) {
            return AppToast.error('Please accept the terms and conditions.')
        }

        await userState.register(form)
        AppToast.success('Registration successful!', 'You can now log in.')
        isLogin.value = true
    }
}
</script>
