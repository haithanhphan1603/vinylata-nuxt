type WishlistItem = {
  userId: string
  productId: number
}
export const useMyWishlistStore = defineStore('wishlist', () => {
  const wishlist = ref<WishlistItem[]>([])
  const user = useSupabaseUser()

  const { addToWishlistApi, deleteWishlistItemApi, getWishlistItems } =
    useApiServices()

  function addToWishlist(productId: number) {
    if (!user.value) return
    const wishtListClone = [...wishlist.value]
    wishtListClone.push({ userId: user.value.id, productId })
    addToWishlistApi(user.value.id, productId)
    wishlist.value = wishtListClone
  }

  function deleteWishlistItem(idx: number) {
    if (!user.value) return
    const wishtListClone = [...wishlist.value]
    const productId = wishtListClone[idx].productId
    wishtListClone.splice(idx, 1)
    deleteWishlistItemApi(productId)
  }

  watch(user, async (newUser) => {
    if (newUser) {
      wishlist.value = await getWishlistItems(newUser.id)
    } else {
      wishlist.value = []
    }
  })

  return {
    wishlist,
    addToWishlist,
    deleteWishlistItem,
  }
})
