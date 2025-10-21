<template>
  <div class="cart-view">
    <div class="cart-header">
      <h1>Your Cart</h1>
      <p>{{ cartItems.length }} items</p>
    </div>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/" class="btn btn-primary">
        Continue Shopping
      </router-link>
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="cart-item"
        >
          <div class="item-image">
            <img :src="item.coverTexture" :alt="item.title" />
          </div>
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p class="author">{{ item.author }}</p>
            <p class="price">${{ item.price.toFixed(2) }}</p>
          </div>
          <div class="item-actions">
            <button @click="removeFromCart(item.id)" class="remove-btn">
              Remove
            </button>
          </div>
        </div>
      </div>
      
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${{ shipping.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax</span>
          <span>${{ tax.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
        
        <button @click="checkout" class="btn btn-primary checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '@/composables/useCart'

const { cartItems, removeFromCart } = useCart()

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price, 0)
})

const shipping = computed(() => {
  return subtotal.value > 50 ? 0 : 5.99
})

const tax = computed(() => {
  return subtotal.value * 0.08 // 8% tax rate
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value
})

const checkout = () => {
  alert('Checkout functionality would be implemented here')
  // In a real app: router.push('/checkout')
}
</script>

<style scoped>
.cart-view {
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
}

.cart-header {
  text-align: center;
  margin-bottom: 3rem;
}

.cart-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.cart-header p {
  color: #666;
  font-size: 1.2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 0;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.cart-content {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-items {
  flex: 2;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.item-image {
  width: 80px;
  height: 100px;
  overflow: hidden;
  border-radius: 4px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.author {
  color: #666;
  margin-bottom: 0.5rem;
}

.price {
  font-weight: bold;
  color: #4a6cf7;
}

.item-actions {
  display: flex;
  align-items: center;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 0.9rem;
}

.remove-btn:hover {
  text-decoration: underline;
}

.cart-summary {
  flex: 1;
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 8rem;
}

.cart-summary h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  border-top: 1px solid #ddd;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

.checkout-btn {
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;
  font-size: 1.1rem;
}

@media (max-width: 900px) {
  .cart-content {
    flex-direction: column;
  }
  
  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-view {
    padding: 5rem 1rem 1rem;
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-image {
    width: 100%;
    height: 200px;
    margin-bottom: 1rem;
  }
}
</style>
