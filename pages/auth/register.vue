<template>
  <div>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white loginCard" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">
                  Register
                </h2>
                <p class="text-white-50 mb-5">
                  Please enter your details!
                </p>

                <div v-if="formError" class="alert alert-danger custom-danger-alert">
                  {{ formError }}
                </div>

                <div class="form-outline form-white mb-4">
                  <input id="typeEmailX" v-model="registerData.email" type="email" class="form-control form-control-lg">
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input id="username" v-model="registerData.username" type="email" class="form-control form-control-lg">
                  <label class="form-label" for="username">username</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input id="typePasswordX" v-model="registerData.password" type="password" class="form-control form-control-lg">
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>

                <p class="small mb-5 pb-lg-2">
                  <a class="text-white-50" href="#!">Forgot password?</a>
                </p>

                <button id="signIn" class="btn btn-outline-light btn-lg px-5" type="submit" @click="registerUser()">
                  Login
                </button>

                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="javascript:void(0)" class="text-white"><i class="fab fa-facebook-f fa-lg" /></a>
                  <a href="javascript:void(0)" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2" /></a>
                  <a href="javascript:void(0)" class="text-white"><i class="fab fa-google fa-lg" /></a>
                </div>
              </div>

              <div>
                <p class="mb-0">
                  already have an account? <nuxt-link to="/register" class="nav-link fd-nav-link nav-link-active">
                    <a href="javascript:void(0)" class="text-white-50 fw-bold">Sign in</a>
                  </nuxt-link>
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
      registerData: {
        username: null,
        password: null,
        email: null
      },
      formError: null
    }
  },
  methods: {
    registerUser () {
      if (this.registerData && this.registerData.username && this.registerData.email && this.registerData.password) {
        this.$axios.$post('/api/user/register', { username: this.registerData.username, email: this.registerData.email, password: this.registerData.password }).then((response) => {
          this.notfySuccess('registered successfully')
          this.$router.push('/')
        }).catch((error) => {
          console.log(error)
          this.notfyError('registration failed ')
        })
      } else {
        this.notfyError('please fill all the data correctly')
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
