import { defineStore } from 'pinia'

export const useStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  
  getters: {
    itemCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    },
    
    total: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
  
  actions: {
    addItem(item) {
      const existingItem = this.items.find(i => i.id === item.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    
    removeItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId)
    },
    
    clearCart() {
      this.items = []
    }
  }
})
