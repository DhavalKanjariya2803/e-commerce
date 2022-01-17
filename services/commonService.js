export default $axios => ({
  async loadProductsData () {
    return await $axios.$get('/api/data/')
  }
//   getRoadMapData (getDataValue) {
//     return $axios.$post('/api/roadmap/' + getDataValue.statusId, getDataValue.postData ? getDataValue.postData : null)
//   }
})
