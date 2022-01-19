<template>
  <div class="container mt-5 p-3 rounded cart">
    <div class="row no-gutters">
      <div class="col-md-8">
        <div class="product-details mr-2">
          <div class="d-flex flex-row align-items-center">
            <i class="fa fa-long-arrow-left" /><span class="ml-2">Continue Shopping</span>
          </div>
          <hr>
          <h6 class="mb-0">
            Shopping cart
          </h6>
          <div class="d-flex justify-content-between">
            <span>You have {{ productData.length }} items in your cart</span>
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
                <span class="font-weight-bold d-block">{{ product.title }}</span><span class="spec">{{ product.description }}</span>>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center">
              <span class="d-block" /><span class="d-block ml-5 font-weight-bold">$ {{ product.price }}</span><i class="fas fa-trash-alt trashIcon" @click="removeProduct(product._id)" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="payment-info">
          <div class="">
            <div class="col-md-6">
              <label class="credit-card-label">Email</label><input v-model="orderdetails.email" type="email" class="form-control credit-inputs" placeholder="">
            </div>
            <div class="col-md-6">
              <div class="form-group mb-3">
                <label for="description" class="text-white">Address</label>
                <textarea v-model="orderdetails.address" class="form-control validate addres-in" rows="3" required="" />
              </div>
              <!-- <label class="credit-card-label">Address</label><input type="text" class="form-control credit-inputs" placeholder="address"> -->
            </div>
          </div>
          <hr class="line">
          <div class="d-flex justify-content-between information">
            <span>Subtotal</span><span>$ {{ subTotalCost }}</span>
          </div>
          <div class="d-flex justify-content-between information">
            <span>Shipping</span><span>Free</span>
          </div>
          <div class="d-flex justify-content-between information">
            <span>Total(Incl. taxes)</span><span>$ {{ subTotalCost }} </span>
          </div><button class="btn placeOrderBtn btn-block d-flex justify-content-between mt-3" type="button" @click="placeOrder()">
            <span>$ {{ subTotalCost }} </span><span>Checkout<i class="fa fa-long-arrow-right ml-1" /></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['check-auth'],
  async asyncData (context) {
    const responce = await context.$axios.$get('/api/product/cart')
    let subTotal = 0
    if (responce && responce.length) {
      for (let i = 0; i < responce.length; i++) {
        const singleRes = responce[i]
        subTotal += singleRes.price
      }
    }
    return {
      productData: responce,
      subTotalCost: subTotal
    }
  },
  data () {
    return {
      productData: {},
      orderdetails: {
        address: null,
        email: null
      },
      subTotalCost: 0
    }
  },
  methods: {

    placeOrder () {
      if (this.orderdetails && this.orderdetails.address && this.orderdetails.email) {
        this.$axios.$post('/api/order/placeAll', { address: this.orderdetails.address, email: this.orderdetails.email }).then((response) => {
          this.notfySuccess('order placed successfully')
        }).catch((error) => {
          console.log(error)
          this.notfyError('order failed')
        })
      } else {
        this.notfyError('please fill all the data correctly')
      }
    },
    removeProduct (_id) {
      this.$axios.$post('/api/product/removefromcart', { productId: _id }).then((response) => {
        this.notfySuccess('removed successfully')
        this.$router.app.refresh()
      }).catch((error) => {
        console.log(error)
        this.notfyError('removed failed')
      })
    }
  }
}
</script>

<style scoped>
.payment-info {
    background: #000;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #fff;
    color: #fff;
    font-weight: bold
}

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

label.radio {
    cursor: pointer
}

label.radio input {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none
}

label.radio span {
    padding: 1px 12px;
    border: 2px solid #ada9a9;
    display: inline-block;
    color: #8f37aa;
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 300
}

label.radio input:checked+span {
    border-color: #fff;
    background-color: blue;
    color: #fff
}

.credit-inputs {
    color: #fff !important;
    background: #383844;
    border: yellow
}

.credit-inputs::placeholder {
    color: #fff;
    font-size: 13px
}

.credit-card-label {
    font-size: 9px;
    font-weight: 300
}

.form-control.credit-inputs:focus {
    background: #383844;
    border: yellow
}

.addres-in:focus {
  background: #383844;
    border: yellow
}
.addres-in {
  color: #fff;
  background: #383844;
}

.line {
    border-bottom: 1px solid rgb(102, 102, 221)
}

.information span {
    font-size: 12px;
    font-weight: 500
}

.information {
    margin-bottom: 5px
}

.items {
    -webkit-box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.25);
    box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.08)
}

.spec {
    font-size: 11px
}

.placeOrderBtn {
    background-color: yellow
}
.placeOrderBtn:hover {
    background-color: orange
}
.trashIcon {
  margin-left: 5px;
  color: yellow
}
.trashIcon:hover {
  color: orange;
  cursor: pointer;
}
</style>
