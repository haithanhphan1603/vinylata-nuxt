<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-800',
      props.class,
    )"
  >
    <SwitchThumb
      :class="cn('pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-slate-950')"
    />
  </SwitchRoot>
</template>
