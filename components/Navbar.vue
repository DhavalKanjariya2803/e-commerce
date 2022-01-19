<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo03"
      aria-controls="navbarTogglerDemo03"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <nuxt-link to="/" class="nav-link fd-nav-link nav-link-active">
      <a class="navbar-brand m-2" href="javascript:void(0)">my Ecommerce</a>
    </nuxt-link>

    <div id="navbarTogglerDemo03" class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <!-- <li class="nav-item active">
          <a class="nav-link" href="javascript:void(0)">Home </a>
        </li> -->
        <li v-if="isAuthenticated && loggedInUserData.isAdmin" class="nav-item">
          <nuxt-link :to="{ path: `/allOrders`}" class="nav-link">
            <a class="nav-link" href="javascript:void(0)">All Orders</a>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/myorders" class="nav-link">
            <a class="nav-link" href="javascript:void(0)">my Orders</a>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/add-product" class="nav-link">
            <a class="nav-link" href="javascript:void(0)">Add Product <i class="fa fa-plus" aria-hidden="true" /></a>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="text-white m-2">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <nuxt-link to="/cart" class="nav-link fd-nav-link nav-link-active">
            <a class="nav-link" href="javascript:void(0)"><span class="icon" style="margin-right:10px"><span class="fa-stack fa-2x has-badge" :data-count="loggedInUserData.cartTotal">
              <i class="fa fa-circle fa-stack-2x" />
              <i class="fa fa-shopping-cart fa-stack-1x fa-inverse" />
            </span></span></a>
          </nuxt-link>
        </li>
        <li v-if="!isAuthenticated" class="nav-item">
          <nuxt-link to="/login" class="nav-link fd-nav-link nav-link-active">
            <a class="nav-link log-btn" href="javascript:void(0)">signIn</a>
          </nuxt-link>
        </li>
        <li v-else class="nav-item">
          <a class="nav-link log-btn" href="javascript:void(0)" @click="logoutUser"><i class="fas fa-sign-in-alt" /></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.loggedIn
    },
    loggedInUserData () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async logoutUser () {
      await this.$auth.logout()
      this.notfySuccess('log out successfully')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.navbar {
    background-color: #000 !important;
}

.nav-link:hover {
    color: yellow !important
}

.log-btn {
    background-color: yellow;
    color: #000 !important;
    border: 1px solid #000 !important;
    border-radius: 20px
}
.log-btn:hover {
  background-color: orange
}
.log-btn:hover {
    color: #000 !important;
    padding-left: 100px;
    padding-right: 100px;
}

.fa-stack[data-count]:after{
  position:absolute;
  right:0%;
  top:0%;
  content: attr(data-count);
  font-size:40%;
  padding:.6em;
  border-radius:999px;
  line-height:.75em;
  color: black;
  color:black;
  text-align:center;
  min-width:2em;
  font-weight:bold;
  background: white;
  border-style:solid;
}
.fa-circle {
  color:orange;
}

.red-cart {color: orange; background:white;
}
.nav-link {
  text-decoration: none;
}
</style>
