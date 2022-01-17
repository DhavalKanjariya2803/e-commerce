<template>
  <div>
    <h1> Top Brands </h1>
    <Products :product-data="{test}" />
  </div>
</template>

<script>
export default {
  // middleware: ['check-admin'],
  async asyncData ({ $axios }) {
    // console.log(context)
    try {
      const test = await $axios.$get('/api/')
      console.log(test)
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      test: null
    }
  }
}
// export default {
//   async asyncData ({ $http }) {
//     const test = await $http.$get('/api/test')
//     return {
//       test
//     }
//   }
// }
</script>

<style scoped>

</style>
