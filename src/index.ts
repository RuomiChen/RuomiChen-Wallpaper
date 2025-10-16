import Aura from '@primeuix/themes/aura';
import { DialogService } from 'primevue';
import AnimateOnScroll from 'primevue/animateonscroll';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import FocusTrap from 'primevue/focustrap';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';
createApp(App)
    .directive('animateonscroll', AnimateOnScroll)
    .directive('focustrap', FocusTrap)
    .use(ToastService)
    .use(ConfirmationService)
    .use(DialogService)
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.dark',
                cssLayer: {
                    name: 'primevue',
                    order: 'theme, base, primevue',
                }
            }
        }
    }).mount('#root');
