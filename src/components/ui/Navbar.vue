
<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-logo">
        <router-link to="/">
          <img src="\src\assets\images\logo.png" height="100" width="100" alt="holy books">
        </router-link>
      </div>
      <div class="navbar-links">
        <router-link to="/all-products">All Books</router-link>
        <router-link to="/cart">Cart ({{ cartCount }})</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCart } from '@/composables/useCart'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { cartCount } = useCart()
const { scrollToSection } = useScrollAnimation()

const scrollTo = (page) => {
  scrollToSection(page)
}
</script>

<style scoped>
/* Navbar is fixed - doesn't take document flow space */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.navbar-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 2rem;
}

.navbar-links a, .navbar-links .router-link-active {
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  font-size: 1rem;
}

.navbar-links a:hover, .navbar-links .router-link-active:hover {
  color: #4a6cf7;
}

.navbar-links .router-link-active {
  color: #4a6cf7;
}

/* Remove any mobile menu that could create sidebar */
@media (max-width: 768px) {
  .navbar-content {
    padding: 0 1rem;
  }

  .navbar-links {
    gap: 1rem;
  }
}
</style>

