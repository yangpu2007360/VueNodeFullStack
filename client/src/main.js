import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'

const app = createApp(App);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB9LKz9DQj_pI1Du_ - URrPE20YfZKSM5Ug',
    },
}).mount('#app')


