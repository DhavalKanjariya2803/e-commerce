<template>
  <div class="product-details mr-2">
    <div class="d-flex flex-row align-items-center">
      <i class="fa fa-long-arrow-left" /><span class="ml-2">Shopping</span>
    </div>
    <hr>
    <h6 class="mb-0">
      Total Order List
    </h6>
    <div class="d-flex justify-content-between">
      <span>You have total {{ productData.length }} orders</span>
      <div class="d-flex flex-row align-items-center">
        <div class="price ml-2">
          <span class="mr-1">price</span>
        </div>
      </div>
    </div>
    <div v-for="product in productData" :key="product._id" class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
      <div class="d-flex flex-row">
        <img class="rounded" :src="`/${product.image}`" width="40">
        <div class="ml-2">
          <span class="font-weight-bold d-block">{{ product.title }}</span><span class="spec"> {{ product.description }} </span>>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center">
        <span class="d-block" /><span class="d-block ml-5 font-weight-bold">$ {{ product.price }}</span><i class="fa fa-trash-o ml-3 text-black-50" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  middleware: ['check-auth'],
  async asyncData (context) {
    const responce = await context.$axios.$get('/api/orders')
    return {
      productData: responce
    }
  },
  data () {
    return {
      productData: {}
    }
  }
}

</script>

<style scoped>
.product-details {
    padding: 10px;
    color: #fff
}

body {
    background: #eee
}

.cart {
    background: #000;
    border: 1px solid #fff
}

.p-about {
    font-size: 12px
}

.table-shadow {
    -webkit-box-shadow: 5px 5px 15px -2px rgba(0, 0, 0, 0.42);
    box-shadow: 5px 5px 15px -2px rgba(0, 0, 0, 0.42)
}

.type {
    font-weight: 400;
    font-size: 10px
}
</style>
