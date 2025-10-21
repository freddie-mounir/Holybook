import { ref, computed } from 'vue'
import { useStore } from '@/stores/cart'

export function useCart() {
  const store = useStore()
  
  const cartItems = computed(() => store.items)
  const cartCount = computed(() => store.itemCount)
  
  const addToCart = (book) => {
    store.addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverTexture: book.coverTexture,
      quantity: 1
    })
  }
  
  const removeFromCart = (bookId) => {
    store.removeItem(bookId)
  }
  
  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart
  }
}
