<template>
  <div>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white loginCard" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">
                  Login
                </h2>
                <p class="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

                <div v-if="formError" class="alert alert-danger custom-danger-alert">
                  {{ formError }}
                </div>

                <div class="form-outline form-white mb-4">
                  <input id="typeEmailX" v-model="loginData.username" type="email" class="form-control form-control-lg">
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input id="typePasswordX" v-model="loginData.password" type="password" class="form-control form-control-lg">
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>

                <p class="small mb-5 pb-lg-2">
                  <a class="text-white-50" href="#!">Forgot password?</a>
                </p>

                <button id="signIn" class="btn btn-outline-light btn-lg px-5" type="submit" @click="submitData()">
                  Login
                </button>

                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg" /></a>
                  <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2" /></a>
                  <a href="#!" class="text-white"><i class="fab fa-google fa-lg" /></a>
                </div>
              </div>

              <div>
                <p class="mb-0">
                  Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginData: {
        username: null,
        password: null
      },
      formError: null
    }
  },
  methods: {
    async submitData () {
      // console.log(this.loginData)
      try {
        await this.$auth.loginWith('local', {
          data: this.loginData
        }).then((res) => {
          if (res.data.success) {
            this.$router.push('/')
            this.formError = null
          } else {
            this.formError = res.data.errorMessage
          }
        }).catch((e) => {
          this.formError = 'Something went wrong'
          if (e.response) {
            const data = e.response.data
            if (data) {
              this.formError = data.errorMessage
            }
          } else {
            this.formError = 'Login failed'
          }
        })
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
.loginCard {
        background-color: #000;
    border: 1px solid;
}
.loginCard .card-body {
    background-color: #000;
    border-radius: 25px;
}
</style>
