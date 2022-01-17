<template>
  <div>
    <h1 class="text-white">
      Add product
    </h1>
    <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
      <div class="row tm-edit-product-row">
        <div class="col-xl-6 col-lg-6 col-md-12">
          <form class="tm-edit-product-form">
            <div class="form-group mb-3">
              <label for="name" class="text-white">Product Name
              </label>
              <input
                id="name"
                v-model="productData.title"
                name="name"
                type="text"
                class="form-control validate"
                required=""
              >
            </div>
            <div class="form-group mb-3">
              <label for="price" class="text-white">price</label>
              <input
                id="price"
                v-model="productData.price"
                name="price"
                type="text"
                class="form-control validate"
                required=""
              >
            </div>
            <div class="form-group mb-3">
              <label for="description" class="text-white">Description</label>
              <textarea v-model="productData.description" class="form-control validate" rows="3" required="" />
            </div>
          </form>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
          <div class="tm-product-img-dummy mx-auto">
            <i class="fas fa-cloud-upload-alt tm-upload-icon" onclick="document.getElementById('fileInput').click();" />
          </div>
          <div class="custom-file mt-3 mb-3">
            <input id="fileInput" ref="productImage" type="file" style="display:none;">
            <input type="button" class="btn btn-primary btn-block mx-auto" value="UPLOAD PRODUCT IMAGE" onclick="document.getElementById('fileInput').click();">
          </div>
        </div>
        <div class="col-12">
          <button type="button" class="btn btn-primary btn-block text-uppercase" @click="submitData()">
            Add Product Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['check-admin'],
  data () {
    return {
      productData: {
        title: '',
        description: '',
        price: ''
      }
    }
  },
  methods: {
    // eslint-disable-next-line require-await
    submitData () {
      // console.log(this.loginData)
      try {
        const file = this.$refs.productImage.files[0]
        const formData = new FormData()
        if (typeof file !== 'undefined' && file !== null) { formData.append('image', file) }
        formData.append('product_title', this.productData.title)
        formData.append('product_description', this.productData.description)
        formData.append('product_price', this.productData.price)

        this.$axios.$post('/api/product/add', formData).then((response) => {
          console.log(response)
          this.$router.push('/')
        }).catch((error) => {
          console.log(error)
        })
        // await this.$auth.loginWith('local', {
        //   data: this.loginData
        // }).then((res) => {
        //   if (res.data.success) {
        //     this.$router.push('/')
        //     this.formError = null
        //   } else {
        //     this.formError = res.data.errorMessage
        //   }
        // }).catch((e) => {
        //   this.formError = 'Something went wrong'
        //   if (e.response) {
        //     const data = e.response.data
        //     if (data) {
        //       this.formError = data.errorMessage
        //     }
        //   } else {
        //     this.formError = 'Login failed'
        //   }
        // })
      } catch (e) {
        if (e.response) {
          const data = e.response.data
          if (data) {
            this.formError = data.errorMessage
          }
        } else {
          this.formError = 'Login failed'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
