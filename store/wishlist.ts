import type { Tables } from '~/types/database.types'

type WishlistItem = Tables<'wishlist'>
export const useWishlistStore = defineStore('wishlist', () => {
  const wishlist = ref<WishlistItem[]>([])
  const user = useSupabaseUser()

  const { addToWishlistApi, deleteWishlistItemApi, getWishlistItems } =
    useApiServices()

  async function addToWishlist(productId: number) {
    if (!user.value) return
    await addToWishlistApi(user.value.id, productId)
    wishlist.value = await getWishlistItems(user.value.id)
  }

  async function removeFromWishList(id: number) {
    if (!user.value) return
    await deleteWishlistItemApi(user.value.id, id)
    wishlist.value = await getWishlistItems(user.value.id)
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
