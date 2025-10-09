<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8 space-y-12">
    <!-- Header Section -->
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
      <p class="text-lg">Have any questions or suggestions? We'd love to hear from you.</p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Contact Form -->
      <div class="rounded-lg shadow-lg p-8 space-y-6">
        <h2 class="text-2xl font-semibold mb-6">Send a Message</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium mb-2">Name <span class="text-red-500">*</span></label>
            <InputText id="name" v-model="formData.name" placeholder="Enter your name" class="w-full"
              :class="{ 'p-invalid': submitted && !formData.name }" />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium mb-2">Email <span class="text-red-500">*</span></label>
            <InputText id="email" type="email" v-model="formData.email" placeholder="you@example.com" class="w-full"
              :class="{ 'p-invalid': submitted && !isValidEmail }" />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium mb-2">Phone</label>
            <InputText id="phone" v-model="formData.phone" placeholder="Enter your phone number" class="w-full" />
          </div>

          <div>
            <label for="subject" class="block text-sm font-medium mb-2">Subject <span
                class="text-red-500">*</span></label>
            <Dropdown id="subject" v-model="formData.subject" :options="subjects" optionLabel="label"
              optionValue="value" placeholder="Select a subject" class="w-full"
              :class="{ 'p-invalid': submitted && !formData.subject }" />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium mb-2">Message <span
                class="text-red-500">*</span></label>
            <Textarea id="message" v-model="formData.message" rows="5" placeholder="Type your message..." class="w-full"
              :class="{ 'p-invalid': submitted && !formData.message }" />
          </div>

          <Button type="submit" label="Send Message" icon="pi pi-send" :loading="loading" class="w-full"
            severity="primary" />
        </form>
      </div>

      <!-- Contact Info + Map -->
      <div class="space-y-6" >
        <div class="rounded-lg shadow-lg p-8 space-y-4">
          <h2 class="text-2xl font-semibold mb-4">Contact Information</h2>

          <div class="space-y-4" v-if="data">
            <div class="flex items-start gap-4">
              <i class="pi pi-map-marker text-indigo-600 text-xl"></i>
              <div>
                <h3 class="font-medium text-sm">Address</h3>
                <p class="text-sm" >{{ data!.address }}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <i class="pi pi-phone text-indigo-600 text-xl"></i>
              <div>
                <h3 class="font-medium text-sm">Phone</h3>
                <Skeleton size="2rem" class="mr-2" v-if="isFetching"></Skeleton>
                <p class="text-sm" v-else>{{ data!.phone }}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <i class="pi pi-envelope text-indigo-600 text-xl"></i>
              <div>
                <h3 class="font-medium text-sm">Email</h3>
                <Skeleton size="2rem" class="mr-2" v-if="isFetching"></Skeleton>
                <p class="text-sm" v-else>{{ data!.email }}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <i class="pi pi-clock text-indigo-600 text-xl"></i>
              <div v-html="data!.tip">
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="bg-indigo-600 rounded-lg shadow-lg p-6 text-white">
          <h3 class="text-xl font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <Button icon="pi pi-facebook" rounded text severity="secondary" class="text-white hover:bg-indigo-700" />
            <Button icon="pi pi-twitter" rounded text severity="secondary" class="text-white hover:bg-indigo-700" />
            <Button icon="pi pi-linkedin" rounded text severity="secondary" class="text-white hover:bg-indigo-700" />
            <Button icon="pi pi-github" rounded text severity="secondary" class="text-white hover:bg-indigo-700" />
          </div>
        </div>

        <!-- Google Map -->
        <div class="rounded-lg overflow-hidden shadow-lg h-64">
          <iframe :src="mapUrl" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
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
import { computed, ref } from 'vue'
import { useMyFetch } from '../utils/request'

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
  setTimeout(() => {
    loading.value = false
    toast.value?.add({
      severity: 'success',
      summary: 'Message Sent',
      detail: 'We have received your message and will reply soon!',
      life: 3000
    })

    formData.value = { name: '', email: '', phone: '', subject: '', message: '' }
    submitted.value = false
  }, 1500)
}

// Google Map - random city
// 随机城市
const cities = ['Xiamen']
const randomCity = cities[Math.floor(Math.random() * cities.length)]

// 不需要 API Key 的 Google Maps Embed URL
const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(randomCity)}&output=embed`
const { isFetching, error, data } = useMyFetch<{
  email:string,
  address:string,
  phone:string,
  tip:string
}>('/api/contact/all')
console.log(data);

</script>
