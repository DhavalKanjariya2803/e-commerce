<template>
  <client-only>
    <div class="row d-flex justify-content-center">
      <!-- <h6 class="card-subtitle mb-2 text-muted">
        Clothes
      </h6> -->
      <div class="card col-md-9 col-sm-6 productCard">
        <div class="card-body">
          <div class="row">
            <div v-for="product in productData" :key="product._id" class="col-md-3 col-sm-6">
              <div class="product-grid">
                <div class="product-image">
                  <a href="javascript:void(0)" class="image">
                    <img class="pic-1" :src="`/${product.image}`" alt="">
                    <img class="pic-2" :src="`/${product.image}`" alt="">
                  </a>
                  <ul class="product-links">
                    <li>
                      <nuxt-link href="javascript:void(0)" :to="{ path: `/checkout/${product._id}`, params: { 'productId': product._id }}">
                        <i class="fa fa-shopping-bag" />
                      </nuxt-link>
                    </li>
                    <li><a href="javascript:void(0)" @click="addToCart(product._id)"><i class="fas fa-shopping-cart" /></a></li>
                  </ul>
                </div>
                <div class="product-content">
                  <h3 class="title">
                    <a href="javascript:void(0)"> {{ product.title }} </a>
                  </h3>
                  <span class="product-description"> {{ product.description.substring(0, 30)+"..." }}</span>
                  <div class="price">
                    $ {{ product.price }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  data () {
    return {
      productData: null
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.loggedIn
    },
    loggedInUserData () {
      return this.$store.state.auth.user
    }
  },
  mounted () {
    const vueApp = this
    vueApp.loadData()
  },
  methods: {
    async loadData () {
      const response = await this.$axios.$get('/api/')
      this.productData = response
    },
    addToCart (_id) {
      if (!this.isAuthenticated) {
        this.$router.push('/login')
      } else {
        this.$axios.$post('/api/product/addtocart', { productId: _id }).then((response) => {
          // console.log(response)
          this.notfySuccess('add to cart successfully')
          this.$router.app.refresh()
          // this.loggedInUserData.cartTotal += 1
        }).catch((error) => {
          console.log(error)
          this.notfyError('add to cart failed')
        })
      }
    }
  }
}
</script>

<style scoped>
.productCard {
    background-color: #000;
}
.product-grid{
    /* eslint-disable no-irregular-whitespace */
    background-color: #000;
    border: 1px solid #fff;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    border-radius: 10px;
    margin-top: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}
.product-grid .product-image{
    overflow: hidden;
    position: relative;
}
.product-description {
    margin: 2px;
    color: #fff
}
.product-grid .product-image a.image{ display: block; }
.product-grid .product-image img{
    width: 100%;
    height: auto;
}
.product-grid .product-image .pic-1{
    transition: all 0.3s ease 0s;
    height: 200px;
    border-radius: 10px;
}
.product-grid .product-image:hover .pic-1{ transform: translateX(100%); }
.product-grid .product-image .pic-2{
    width: 100%;
    height: 100%;
    transform: translateX(-101%);
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s ease 0s;
    border-radius: 10px;
}
.product-grid .product-image:hover .pic-2{ transform: translateX(0); }
.product-grid .product-sale-label{
    color: #000;
    border: 1px solid #fff;
    background: #0a805e;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 2px 8px;
    position: absolute;
    top: 15px;
    left: 15px;
}
.product-grid .product-like-icon{
    color: #696969;
    font-size: 22px;
    line-height: 20px;
    position: absolute;
    top: 15px;
    right: 15px;
}
.product-grid .product-like-icon:hover{ color: #0a805e; }
.product-grid .product-like-icon:before,
.product-grid .product-like-icon:after{
    content: attr(data-tip);
    color: #000;
    border: 1px solid #fff;
    background-color: #000;
    font-size: 12px;
    line-height: 18px;
    padding: 7px 7px 5px;
    visibility: hidden;
    position: absolute;
    right: 0;
    top: 15px;
    transition: all 0.3s ease 0s;
}
.product-grid .product-like-icon:after{
    content: '';
    height: 15px;
    width: 15px;
    padding: 0;
    transform: translateX(-50%) rotate(45deg);
    right: auto;
    left: 50%;
    top: 15px;
    z-index: -1;
}
.product-grid .product-like-icon:hover:before,
.product-grid .product-like-icon:hover:after{
    visibility: visible;
    top: 30px;
}
.product-grid .product-links{
    width: 170px;
    padding: 0;
    margin: 0;
    list-style: none;
    opacity: 0;
    transform: translateX(-50%);
    position: absolute;
    bottom: -50px;
    left: 50%;
    transition: all 0.3s ease 0s;
}
.product-grid:hover .product-links{
    bottom: 40px;
    opacity: 1;
}
.product-grid .product-links li{
    display: inline-block;
    margin: 0 2px;
}
.product-grid .product-links li a{
    color: #000;
    border: 1px solid #fff;
    background: yellow;
    font-size: 16px;
    line-height: 48px;
    width: 48px;
    height: 48px;
    border-radius: 10px;
    display: block;
    transition: all 0.3s ease 0s;
}
.product-grid:hover .product-links li a:hover{ background: orange; }
.product-grid .product-content{
    text-align: center;
    padding: 15px 0 0;
}
.product-grid .title{
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
    margin: 0 0 8px;
}
.product-grid .title a{
    color: white;
    transition: all 0.3s ease 0s;
}
.product-grid .title a:hover{ color: yellow; }
.product-grid .price{
    color: white;
    font-size: 16px;
    font-weight: 500;
}
.product-grid .price span{
    color: #555;
    font-size: 14px;
    font-weight: 400;
    text-decoration: line-through;
    margin: 0 5px 0 0;
}
@media screen and (max-width: 990px){
    .product-grid{ margin: 0 0 30px; }
}
</style>
