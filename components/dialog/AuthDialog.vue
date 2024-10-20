<template>
  <div>
    <Dialog v-model:open="isDialogOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogTitle class="text-2xl font-bold flex items-center gap-2">
          <LockIcon class="text-primary" />
          Authentication Required
        </DialogTitle>
        <DialogDescription class="text-lg mt-4">
          This action requires you to sign in or create an account to proceed.
        </DialogDescription>
        <div class="mt-6 space-y-4">
          <p class="text-sm text-muted-foreground">
            By signing in, you'll unlock these benefits:
          </p>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li class="flex items-center gap-2">
              <TagIcon class="w-4 h-4 text-primary" />
              Exclusive discounts and offers
            </li>
            <li class="flex items-center gap-2">
              <TruckIcon class="w-4 h-4 text-primary" />
              Fast checkout and order tracking
            </li>
            <li class="flex items-center gap-2">
              <HeartIcon class="w-4 h-4 text-primary" />
              Wishlist to save your favorite items
            </li>
            <li class="flex items-center gap-2">
              <HistoryIcon class="w-4 h-4 text-primary" />
              Order history and easy reordering
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-4 mt-8">
          <Button class="w-full gap-2" @click="redirectToAuth">
            <LogIn class="w-4 h-4" />
            Sign In / Create Account
          </Button>
          <Button variant="outline" class="w-full" @click="cancelAction">
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '~/components/ui/dialog/index'
import { Button } from '@/components/ui/button'
import {
  Lock as LockIcon,
  LogIn,
  Tag as TagIcon,
  Truck as TruckIcon,
  Heart as HeartIcon,
  History as HistoryIcon,
} from 'lucide-vue-next'

const isDialogOpen = defineModel({
  type: Boolean,
})

function redirectToAuth() {
  navigateTo('/auth')
}

function cancelAction() {
  isDialogOpen.value = false
  // Additional logic for cancelling the action can be added here
}
</script>
