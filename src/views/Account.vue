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
                    <InputText id="name" v-model="form.firstName" type="text" placeholder="Name" fluid />
                </IconField>

                <IconField v-if="!isLogin">
                    <InputIcon>
                        <i class="pi pi-user" />
                    </InputIcon>
                    <InputText id="name" v-model="form.lastName" type="text" placeholder="Name" fluid />
                </IconField>

                <IconField>
                    <InputIcon>
                        <i class="pi pi-envelope" />
                    </InputIcon>
                    <InputText id="email" v-model="form.email" type="email" placeholder="Email" fluid />
                </IconField>

                <IconField>
                    <InputIcon>
                        <i class="pi pi-lock" />
                    </InputIcon>
                    <InputText id="password" v-model="form.password" type="password" placeholder="Password" fluid />
                </IconField>

                <!-- 注册时显示“同意条款” -->
                <div v-if="!isLogin" class="flex items-center gap-2">
                    <Checkbox id="accept" v-model="accept" name="accept" value="yes" />
                    <label for="accept" class="text-white text-sm">
                        I agree to the terms and conditions.
                    </label>
                </div>

                <!-- 按钮 -->
                <Button type="submit" :label="isLogin ? 'Login' : 'Register'" class="mt-2" @click="handleSubmit" />
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
    ToggleSwitch,
    useToast
} from 'primevue';
import { reactive, ref } from 'vue';
import { router } from '../router';
import { useGlobalState } from '../store/user';
const toast = useToast();


const isLogin = ref(true) // true = 登录, false = 注册

const form = reactive({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
})
const accept = ref(false)
const userState = useGlobalState()

const handleSubmit = async () => {
    if (isLogin.value) {
        const loginData = {
            email: form.email,
            password: form.password
        }
        await userState.login(loginData)
        toast.add({
            severity: 'success',
            summary: 'login success',
            life: 2000
        })
        router.push({name:'Home'})
    } else {
        await userState.register(form)
    }
}
</script>