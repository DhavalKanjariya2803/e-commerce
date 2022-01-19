import Vue from 'vue'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
const notfyCard = new Notyf({
  duration: 5000, // Set your global Notyf configuration here
  position: {
    x: 'right',
    y: 'top'
  },
  dismissible: true
})
Vue.mixin({
  methods: {
    notfyError (msg) {
      notfyCard.error(msg)
    },
    notfySuccess (msg) {
      notfyCard.success(msg)
    }
  }
})
