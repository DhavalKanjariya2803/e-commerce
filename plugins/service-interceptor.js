import commonService from '@/services/commonService.js'

export default (context, inject) => {
  inject('commonServiceObj', commonService(context.$axios))
}
