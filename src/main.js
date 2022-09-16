import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import { projectAuth } from '@/firebase/config'
import "@/assets/css/font.css"

let app
projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})
