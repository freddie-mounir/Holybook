

<template>
  <div class="all-products">
    <div class="products-header">
      <h1>All Books</h1>
      <p>Explore our complete collection of books</p>
    </div>

    <div class="products-container">
      <!-- Sidebar with filters -->
      <div class="filters-sidebar">
        <div class="filter-section">
          <h3>Filters</h3>

          <div class="filter-group">
            <label for="category-filter">Category</label>
            <select id="category-filter" v-model="selectedCategory" @change="applyFilters">
              <option value="">All Categories</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="biography">Biography</option>
            </select>
          </div>



          <div class="filter-group">
            <label for="price-range">Price Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}</label>
            <div class="price-slider-container">
              <div class="price-slider">
                <div class="slider-track">
                  <div class="slider-range" :style="{ left: priceRange[0] + '%', width: (priceRange[1] - priceRange[0]) + '%' }"></div>
                </div>
                <input type="range" v-model="priceRange[0]" @input="applyFilters" min="0" :max="priceRange[1]" step="1" class="range-min">
                <input type="range" v-model="priceRange[1]" @input="applyFilters" :min="priceRange[0]" max="100" step="1" class="range-max">
              </div>
              <div class="price-labels">
                <span>${{ priceRange[0] }}</span>
                <span>${{ priceRange[1] }}</span>
              </div>
            </div>
          </div>



          <button class="reset-filters" @click="resetFilters">Reset Filters</button>
        </div>
      </div>

      <!-- Main content area with products -->
      <div class="products-content">
        <div v-if="loading" class="loading">Loading books...</div>

        <div v-else-if="filteredBooks.length === 0" class="no-results">
          <p>No books match your filters. Try adjusting your criteria.</p>
        </div>


        <div v-else class="book-grid">
          <div v-for="book in filteredBooks" :key="book.id" class="book-card">
            <div class="book-image">
              <img :src="book.coverTexture" :alt="book.title">
              <div v-if="book.featured" class="featured-badge">Featured</div>
            </div>
            <div class="book-info">
              <h3>{{ book.title }}</h3>
              <p class="author">{{ book.author }}</p>
              <p class="price">${{ book.price.toFixed(2) }}</p>
              <div class="book-actions">
                <button @click="viewBook(book.id)" class="view-btn">View Details</button>
                <button @click="addToCart(book)" class="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'

const router = useRouter()
const { addToCart } = useCart()

const loading = ref(true)
const books = ref([])
const selectedCategory = ref('')
const priceRange = ref([0, 100])

// Mock data for books - in a real app, this would come from an API
const mockBooks = [
  {
    id: 1,
    title: 'The Great Adventure',
    author: 'John Smith',
    price: 24.99,
    category: 'fiction',
    modelPath: '/models/book1.glb',
    coverTexture: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.2,
    featured: true
  },
  {
    id: 2,
    title: 'Science Explained',
    author: 'Dr. Jane Doe',
    price: 29.99,
    category: 'science',
    modelPath: '/models/book2.glb',
    coverTexture: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 0.8
  },
  {
    id: 3,
    title: 'Historical Events',
    author: 'Robert Johnson',
    price: 34.99,
    category: 'history',
    modelPath: '/models/book3.glb',
    coverTexture: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.0
  },
  {
    id: 4,
    title: 'A Life Story',
    author: 'Emily Wilson',
    price: 27.99,
    category: 'biography',
    modelPath: '/models/book4.glb',
    coverTexture: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.1,
    featured: true
  },
  {
    id: 5,
    title: 'The World of Fiction',
    author: 'Michael Brown',
    price: 22.99,
    category: 'fiction',
    modelPath: '/models/book5.glb',
    coverTexture: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 0.9
  },
  {
    id: 6,
    title: 'Understanding the Universe',
    author: 'Dr. Sarah Davis',
    price: 39.99,
    category: 'science',
    modelPath: '/models/book6.glb',
    coverTexture: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.3,
    featured: true
  },
  {
    id: 7,
    title: 'Ancient Civilizations',
    author: 'Prof. Thomas Miller',
    price: 32.99,
    category: 'history',
    modelPath: '/models/book7.glb',
    coverTexture: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 0.7
  },
  {
    id: 8,
    title: 'Non-Fiction Guide',
    author: 'Lisa Anderson',
    price: 26.99,
    category: 'non-fiction',
    modelPath: '/models/book8.glb',
    coverTexture: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    scrollSpeed: 1.0
  }
]

// Filter books based on selected criteria
const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const categoryMatch = !selectedCategory.value || book.category === selectedCategory.value
    const priceMatch = book.price >= priceRange.value[0] && book.price <= priceRange.value[1]
    return categoryMatch && priceMatch
  })
})

const viewBook = (bookId) => {
  router.push(`/book/${bookId}`)
}


const applyFilters = () => {
  // Force reactivity by creating a new array reference
  const tempBooks = [...books.value];
  books.value = tempBooks;
}


const resetFilters = () => {
  selectedCategory.value = ''
  priceRange.value = [0, 100]
}

// Simulate loading books data
onMounted(() => {
  setTimeout(() => {
    books.value = mockBooks
    loading.value = false
  }, 500)
})
</script>

<style scoped>
.all-products {
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
}

.products-header {
  text-align: center;
  margin-bottom: 2rem;
}

.products-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.products-header p {
  color: #666;
  font-size: 1.2rem;
}

.products-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
}

.filters-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 80px;
}

.filter-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.filter-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}



.price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-inputs input {
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.price-slider-container {
  margin-top: 10px;
}

.price-slider {
  position: relative;
  height: 30px;
}

.slider-track {
  position: absolute;
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  top: 12px;
}

.slider-range {
  position: absolute;
  height: 6px;
  background: #4a6cf7;
  border-radius: 3px;
  top: 0;
}

.range-min, .range-max {
  position: absolute;
  width: 100%;
  height: 6px;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  top: 12px;
  z-index: 2;
}

.range-min::-webkit-slider-thumb {
  pointer-events: all;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #4a6cf7;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}

.range-max::-webkit-slider-thumb {
  pointer-events: all;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #4a6cf7;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}

.range-min::-moz-range-thumb {
  pointer-events: all;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #4a6cf7;
  background: white;
  cursor: pointer;
  -moz-appearance: none;
}

.range-max::-moz-range-thumb {
  pointer-events: all;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #4a6cf7;
  background: white;
  cursor: pointer;
  -moz-appearance: none;
}

.price-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 0.9rem;
  color: #666;
}



.reset-filters {
  width: 100%;
  padding: 0.75rem;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.reset-filters:hover {
  background: #3a5ce5;
}

.products-content {
  flex: 1;
}

.loading {
  text-align: center;
  padding: 4rem 0;
  font-size: 1.2rem;
  color: #666;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: #666;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.book-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}


.book-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.book-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}



.featured-badge {
  position: absolute;
  top: 10px;
  right: -30px;
  background: #ff6b6b;
  color: white;
  padding: 5px 30px;
  border-radius: 0;
  font-weight: bold;
  font-size: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  transform: rotate(45deg);
}

.book-info {
  padding: 1.5rem;
}

.book-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.author {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #4a6cf7;
  margin-bottom: 1rem;
}

.book-actions {
  display: flex;
  gap: 0.5rem;
}

.view-btn, .add-to-cart-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.view-btn {
  background: #f0f0f0;
  color: #333;
}

.view-btn:hover {
  background: #e0e0e0;
}

.add-to-cart-btn {
  background: #4a6cf7;
  color: white;
}

.add-to-cart-btn:hover {
  background: #3a5ce5;
}

@media (max-width: 1024px) {
  .products-container {
    flex-direction: column;
  }

  .filters-sidebar {
    width: 100%;
    position: static;
  }
}

@media (max-width: 768px) {
  .all-products {
    padding: 5rem 1rem 1rem;
  }

  .book-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
}
</style>


