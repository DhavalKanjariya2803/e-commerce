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
      <a class="navbar-brand m-2" href="#">my Ecommerce</a>
    </nuxt-link>

    <div id="navbarTogglerDemo03" class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">my Orders</a>
        </li>
      </ul>
    </div>
    <div class="text-white m-2">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="#"><span class="icon" style="margin-right:10px"><i class="fa fa-shopping-cart" aria-hidden="true" /></span></a>
        </li>
        <li class="nav-item">
          <nuxt-link to="/login/" class="nav-link fd-nav-link nav-link-active">
            <a class="nav-link log-btn" href="#">login</a>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

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
</style>
