<template>
  <div id="app">
    <div id="title" class="bg-dark text-light p-3">
      <h2>JuteBag.IO</h2>
      <h3>Your Shopping Bag</h3>
    </div>
    <div id="nav" class="navbar mt-0 navbar-expand-sm navbar-dark bg-secondary sticky-top">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Menu
        <span class="navbar-toggler-icon text-right"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <router-link
          to="/"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >Home</router-link>
        <router-link
          to="about"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >About</router-link>
        <router-link
          to="shoppinglist"
          class="nav-item nav-link"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >Go Shopping!</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
