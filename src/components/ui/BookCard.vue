<template>
  <div class="book-card">
    <img :src="book.coverTexture" :alt="book.title" class="book-cover">
    <div class="book-info">
      <h3 class="book-title">{{ book.title }}</h3>
      <p class="book-author">{{ book.author }}</p>
      <p class="book-price">${{ book.price }}</p>
      <button @click="$emit('add-to-cart', book)" class="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart'])
</script>

<style scoped>
.book-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.book-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.book-info {
  padding: 1rem;
}

.book-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
  color: #1a1a1a;
}

.book-author {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem;
}

.book-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c5282;
  margin: 0.5rem 0;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.5rem;
  background-color: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
  background-color: #2a4365;
}
</style>