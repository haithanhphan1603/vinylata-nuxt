<script lang="ts" setup>
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  MailIcon,
} from 'lucide-vue-next'

const footerLinks = ref([
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/new-releases', label: 'NEW RELEASES' },
  { to: '/pre-orders', label: 'PRE-ORDERS' },
  { to: '/genres', label: 'GENRES' },
  { to: '/faq', label: 'FAQ' },
])
</script>

<template>
  <footer class="bg-background py-10">
    <div class="container mx-auto px-10">
      <div class="grid grid-cols-3">
        <div>
          <CommonAppIcon class="" />
          <p class="font-extralight">therecord@vinylata.com</p>
          <div class="flex gap-2 mt-2">
            <button class="border-none rounded-full" variant="outline">
              <FacebookIcon height="1.5rem" width="1.5rem" />
              <span class="sr-only">Facebook</span>
            </button>
            <button class="border-none rounded-full" variant="outline">
              <TwitterIcon height="1.5rem" width="1.5rem" />
              <span class="sr-only">Twitter</span>
            </button>
            <button class="border-none rounded-full" variant="outline">
              <InstagramIcon height="1.5rem" width="1.5rem" />
              <span class="sr-only">Instagram</span>
            </button>
            <button class="border-none rounded-full" variant="outline">
              <MailIcon height="1.5rem" width="1.5rem" />
              <span class="sr-only">Mail</span>
            </button>
            <button class="border-none rounded-full" variant="outline">
              <YoutubeIcon height="1.5rem" width="1.5rem" />
              <span class="sr-only">Youtube</span>
            </button>
          </div>
        </div>
        <div>
          <ul class="flex flex-col">
            <li v-for="link in footerLinks" :key="link.label">
              <CommonAppLink class="text-sm font-light" :to="link.to">{{
                link.label
              }}</CommonAppLink>
            </li>
          </ul>
        </div>
        <div>
          <p class="text-bold text-vil">Let's vinyl</p>
        </div>
      </div>
    </div>
  </footer>
</template>
