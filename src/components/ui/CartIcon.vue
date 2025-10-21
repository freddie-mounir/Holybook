<template>
  <div class="cart-icon" @click="goToCart">
    <div class="cart-button">
      🛒
      <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'

const router = useRouter()
const { cartCount } = useCart()

const goToCart = () => {
  router.push('/cart')
}
</script>

<style scoped>
.cart-icon {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1001;
  cursor: pointer;
}

.cart-button {
  position: relative;
  background: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cart-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

@media (max-width: 768px) {
  .cart-icon {
    top: 0.5rem;
    right: 0.5rem;
  }
  
  .cart-button {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
}
</style>
