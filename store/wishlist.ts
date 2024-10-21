import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Tables } from '~/types/database.types'
import debounce from 'lodash/debounce'
import { useApiServices } from '@/composables/apiServices'

type WishlistItem = Tables<'wishlist'>

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlist = ref<WishlistItem[]>([])
  const user = useSupabaseUser()
  const pendingChanges = ref<Map<number, 'add' | 'remove'>>(new Map())

  const { addToWishlistApi, deleteWishlistItemApi, getWishlistItems } =
    useApiServices()

  // Debounced function to sync changes with the server
  const syncChanges = debounce(async () => {
    if (!user.value) return

    for (const [productId, action] of pendingChanges.value) {
      try {
        if (action === 'add') {
          await addToWishlistApi(user.value.id, productId)
        } else if (action === 'remove') {
          await deleteWishlistItemApi(user.value.id, productId)
        }
      } catch (error) {
        console.error(`Failed to ${action} product ${productId}:`, error)
        // Revert the optimistic update
        if (action === 'add') {
          wishlist.value = wishlist.value.filter(
            (item) => item.product_id !== productId,
          )
        } else if (action === 'remove') {
          const item = await getWishlistItems(user.value.id)
          if (item) wishlist.value.push(...item)
        }
      }
    }

    // Clear pending changes after syncing
    pendingChanges.value.clear()

    // Refresh the wishlist from the server to ensure consistency
    wishlist.value = await getWishlistItems(user.value.id)
  }, 1000)

  function addToWishlist(productId: number) {
    if (!user.value) return

    // Optimistic update
    if (!wishlist.value.some((item) => item.product_id === productId)) {
      wishlist.value.push({ product_id: productId } as WishlistItem)
    }

    // Mark for syncing
    pendingChanges.value.set(productId, 'add')
    syncChanges()
  }

  function removeFromWishList(productId: number) {
    if (!user.value) return

    // Optimistic update
    wishlist.value = wishlist.value.filter(
      (item) => item.product_id !== productId,
    )

    // Mark for syncing
    pendingChanges.value.set(productId, 'remove')
    syncChanges()
  }

  watch(
    user,
    async (newUser) => {
      if (newUser) {
        wishlist.value = await getWishlistItems(newUser.id)
      } else {
        wishlist.value = []
      }
    },
    { immediate: true },
  )

  return {
    wishlist,
    addToWishlist,
    removeFromWishList,
  }
})
