<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8 space-y-12">
    <!-- Header Section -->
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">{{t('header.contact')}}</h1>
      <p class="text-lg">{{t('contact.tip')}}</p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Contact Form -->
      <div class="rounded-lg shadow-lg p-8 space-y-6">
        <h2 class="text-2xl font-semibold mb-6">{{t('contact.form.title')}}</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium mb-2">{{t('contact.form.name')}} <span class="text-red-500">*</span></label>
            <InputText id="name" v-model="formData.name" :placeholder="t('contact.form.name')" class="w-full"
              :class="{ 'p-invalid': submitted && !formData.name }" />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium mb-2">{{t('contact.form.email')}} <span class="text-red-500">*</span></label>
            <InputText id="email" type="email" v-model="formData.email" :placeholder="t('contact.form.email')" class="w-full"
              :class="{ 'p-invalid': submitted && !isValidEmail }" />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium mb-2">{{t('contact.form.phone')}}</label>
            <InputText id="phone" v-model="formData.phone" :placeholder="t('contact.form.phone')" class="w-full" />
          </div>

          <div>
            <label for="subject" class="block text-sm font-medium mb-2">{{t('contact.form.subject')}} <span
                class="text-red-500">*</span></label>
            <Dropdown id="subject" v-model="formData.subject" :options="subjects" optionLabel="label"
              optionValue="value" :placeholder="t('contact.form.subject')" class="w-full"
              :class="{ 'p-invalid': submitted && !formData.subject }" />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium mb-2">{{t('contact.form.message')}} <span
                class="text-red-500">*</span></label>
            <Textarea id="message" v-model="formData.message" rows="5" :placeholder="t('contact.form.message')" class="w-full"
              :class="{ 'p-invalid': submitted && !formData.message }" />
          </div>

          <Button type="submit" :label="t('contact.form.submit')" icon="pi pi-send" :loading="loading" class="w-full dark:text-white"
            severity="primary" />
        </form>
      </div>

      <!-- Contact Info + Map -->
      <div class="flex flex-col justify-between">
        <div class="rounded-lg shadow-lg p-4 ">
          <h2 class="text-2xl font-semibold mb-4">{{t('contact.info.title')}}</h2>

          <div class="space-y-4" v-if="data">
            <div class="flex items-start gap-4">
              <i class="pi pi-map-marker text-primary text-xl"></i>
              <div>
                <h3 class="font-medium text-sm">{{t('contact.info.address')}}</h3>
                <p class="text-sm">{{ data!.address }}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <i class="pi pi-phone text-primary text-xl"></i>
              <div>
                <h3 class="font-medium text-sm">{{t('contact.info.whatsapp')}}</h3>
                <Skeleton size="2rem" class="mr-2" v-if="!isFinished"></Skeleton>
                <Button v-else class="p-0" as="a" variant="link" :label="data!.ins" :href="data!.ins" target="_blank"
                  rel="noopener" />
              </div>
            </div>

            <div class="flex items-start gap-4">
              <i class="pi pi-envelope text-primary text-xl"></i>
              <div>
                <h3 class="font-medium text-sm">{{t('contact.info.email')}}</h3>
                <Skeleton size="2rem" class="mr-2" v-if="!isFinished"></Skeleton>
                <Button v-else class="p-0" as="a" variant="link" :label="data!.email" :href="`mailto:${data!.email}`"
                  target="_blank" rel="noopener" />

              </div>
            </div>

          </div>
        </div>



        <!-- Google Map -->
        <div class="rounded-lg overflow-hidden shadow-lg h-64">
          <iframe :src="mapUrl" width="100%" height="100%" style="border:0;" allowfullscreen="true" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

        <!-- Social Media -->
        <div class="bg-primary rounded-lg shadow-lg p-6 text-white">
          <h3 class="text-xl font-semibold mb-4">{{t('contact.info.follow')}}</h3>
          <div class="flex space-x-4" v-if="isFinished">
            <!-- <Button icon="pi pi-facebook" rounded text severity="secondary"
              class="text-primary hover:bg-white/70 bg-white" />
            <Button icon="pi pi-twitter" rounded text severity="secondary"
              class="text-primary hover:bg-white/70 bg-white" />
            <Button icon="pi pi-linkedin" rounded text severity="secondary"
              class="text-primary hover:bg-white/70 bg-white" />
            <Button icon="pi pi-github" rounded text severity="secondary"
              class="text-primary hover:bg-white/70 bg-white" /> -->
            <Button icon="pi pi-instagram" rounded severity="secondary" as="a" variant="link" :href="data!.ins"
              target="_blank" rel="noopener" class="text-primary hover:bg-white/70 bg-white" />

          </div>
        </div>
      </div>
    </div>

    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Skeleton from 'primevue/skeleton'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMyFetch } from '../utils/request'
import { AppToast } from '../utils/toast'

const { t } = useI18n({ useScope: 'global' })



interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const formData = ref<FormData>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const subjects = ref([
  { label: 'General Inquiry', value: 'general' },
  { label: 'Technical Support', value: 'support' },
  { label: 'Business Cooperation', value: 'business' },
  { label: 'Product Feedback', value: 'feedback' },
  { label: 'Other', value: 'other' }
])

const submitted = ref(false)
const loading = ref(false)
const toast = ref<InstanceType<typeof Toast> | null>(null)

const isValidEmail = computed(() => {
  if (!formData.value.email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email)
})

const handleSubmit = async () => {
  submitted.value = true
  if (!formData.value.name || !isValidEmail.value || !formData.value.subject || !formData.value.message) {
    return
  }

  loading.value = true
  const { data } = useMyFetch('/api/contact').post(formData.value).json()
  console.log(data);

  setTimeout(() => {
    loading.value = false
    AppToast.success('message sent', 'We have received your message and will reply soon!')
    formData.value = { name: '', email: '', phone: '', subject: '', message: '' }
    submitted.value = false
  }, 1500)
}

const { isFinished, error, data } = useMyFetch<{
  email: string,
  address: string,
  phone: string,
  tip: string
}>('/api/contact/all').json()


// Google Map - random city
// 随机城市
// 默认地图城市（后端未返回前）
const defaultCity = 'Xiamen'

// 响应式 mapUrl
const mapUrl = ref(`https://www.google.com/maps?q=${encodeURIComponent(defaultCity)}&output=embed`)

// 当 data 加载完成后更新地图
watch(
  () => data.value?.address,
  (address) => {
    if (address) {
      mapUrl.value = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
    }
  },
  { immediate: true } // 首次也执行一次
)

</script>
