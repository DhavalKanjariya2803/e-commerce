<template>
  <div class="card order-summry-card">
    <div class="card-body">
      <div class="row text-center">
        <div class="text-center">
          <div class="border text-center">
            <div class="header text-white">
              Order Summary
            </div>
            <!-- <p></p> -->
            <div class="row item">
              <div class="col-4 align-self-center productImageDiv">
                <img class="img-fluid productImage" :src="`/${productData.image}`">
              </div>
              <div class="col-8 text-center">
                <div class="product-info">
                  <div class="row text-center">
                    <b class="text-white">{{ productData.title }} </b>
                  </div>
                  <div class="row text-white">
                    {{ productData.description }}
                  </div>
                  <div class="row text-white">
                    Qty:1
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-12 text-center">
                    <form class="tm-edit-product-form">
                      <div class="form-group mb-3">
                        <label for="orderEmail" class="text-white">Email</label>
                        <input
                          id="orderEmail"
                          v-model="orderdetails.email"
                          name="orderEmail"
                          type="email"
                          class="form-control validate"
                          required=""
                        >
                      </div>
                      <div class="form-group mb-3">
                        <label for="description" class="text-white">Address</label>
                        <textarea v-model="orderdetails.address" class="form-control validate" rows="3" required="" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class="row lower">
              <div class="col text-left text-white">
                Subtotal
              </div>
              <div class="col text-right text-white">
                {{ productData.price }}
              </div>
            </div>
            <div class="row lower">
              <div class="col text-left text-white">
                Delivery
              </div>
              <div class="col text-right text-white">
                Free
              </div>
            </div>
            <div class="row lower">
              <div class="col text-left">
                <b class="text-white">Total to pay</b>
              </div>
              <div class="col text-right text-white">
                <b>$ {{ productData.price }}</b>
              </div>
            </div>
          </div>
          <button class="btn btn-primary placeOrderBtn" @click="buyProduct(productData._id)">
            Place order
          </button>
          <p class="text-muted text-center">
            Complimentary Shipping & Returns
          </p>
        </div>
      </div>
    </div>
    <div />
  </div>
</template>

<script>
export default {
  middleware: ['check-auth'],
  async asyncData (context) {
    const productId = context.route.params.id
    const responce = await context.$axios.$post('/api/product/single', { id: productId })
    // console.log(productData)
    return {
      productData: responce
    }
  },
  data () {
    return {
      productData: null,
      orderdetails: {
        email: '',
        address: ''
      }
    }
  },
  mounted () {
    // const productId = this.$route.params.id
    // // console.log(productId)
    // this.getProductDetails(productId)
  },
  methods: {
    buyProduct (_id) {
      if (this.orderdetails && this.orderdetails.address && this.orderdetails.email) {
        this.$axios.$post('/api/product/buy', { address: this.orderdetails.address, email: this.orderdetails.email, productId: _id }).then((response) => {
          this.notfySuccess('order placed successfully')
          this.$router.push('/')
          this.$router.app.refresh()
        }).catch((error) => {
          console.log(error)
          this.notfyError('order failed')
        })
      } else {
        this.notfyError('please fill details correctly')
      }
    }
  }
}
</script>

<style scoped>
.placeOrderBtn {
    color: #000;
    background-color: yellow;
    margin-top: 20px;
}
.placeOrderBtn:hover {
    background-color: orange
}
.order-summry-card {
    background-color: #000
}
.productImage {
    border-radius: 30px;
    margin: 10px;
}
.product-info {
  margin: 10px;
}
</style>
