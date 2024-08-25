<script lang="ts" setup>
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  MailIcon,
  GithubIcon,
} from 'lucide-vue-next'
import AppFooterItem from './AppFooterItem.vue'

const footerLinks = ref([
  { to: '/new-releases', label: 'New Release' },
  { to: '/pre-orders', label: 'Pre-orders' },
  { to: '/genres', label: 'Genres' },
  { to: '/pop', label: 'Pop' },
])

const supportLinks = ref([
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/shipping', label: 'Shipping' },
  { to: '/returns', label: 'Returns' },
])

const accountLinks = ref([
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
  { to: '/shipping', label: 'My Cart' },
  { to: '/returns', label: 'My Wishlist' },
  { to: '/orders', label: 'My Order' },
])

const socialLinks = ref([
  { href: '#', icon: FacebookIcon, label: 'Facebook' },
  { href: '#', icon: TwitterIcon, label: 'Twitter' },
  { href: '#', icon: InstagramIcon, label: 'Instagram' },
  { href: '#', icon: MailIcon, label: 'Mail' },
  {
    href: 'https://github.com/haithanhphan1603',
    icon: GithubIcon,
    label: 'Github',
    target: '_blank',
  },
])
</script>

<template>
  <footer class="bg-background pt-10 pb-8">
    <div class="container mx-auto px-10">
      <div class="grid grid-cols-4 gap-4">
        <div class="flex flex-col gap-2">
          <CommonAppIcon />
          <a class="font-extralight">therecord@vinylata.com</a>
          <div class="flex gap-2 mt-2">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              :target="link.target || '_self'"
              class="border-none rounded-full"
            >
              <component :is="link.icon" height="1.5rem" width="1.5rem" />
              <span class="sr-only">{{ link.label }}</span>
            </a>
          </div>
        </div>
        <AppFooterItem label="Let's Vinyl" :footer-links="footerLinks" />
        <AppFooterItem label="Support" :footer-links="supportLinks" />
        <AppFooterItem label="Account" :footer-links="accountLinks" />
      </div>
    </div>
  </footer>
</template>
