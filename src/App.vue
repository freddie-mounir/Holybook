<script setup>
import Navbar from './components/ui/Navbar.vue'
import CartIcon from './components/ui/CartIcon.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <CartIcon />
    <router-view />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
