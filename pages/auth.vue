<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import Label from '~/components/ui/label/Label.vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const isLogin = ref(true)
const errorMsg = ref('')
const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required'),
})

const signupSchema = loginSchema.shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: computed(() =>
    isLogin.value ? loginSchema : signupSchema,
  ),
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')

const onSubmit = handleSubmit(async (values) => {
  try {
    let result
    if (isLogin.value) {
      result = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })
    } else {
      result = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
          },
        },
      })
    }

    const { error } = result
    if (error) throw error
  } catch (error) {
    errorMsg.value = error.message
    console.error(error)
    // Handle auth error (e.g., show error message)
  }
})

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  errorMsg.value = ''
  resetForm()
}

watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <Card class="w-full lg:w-1/2 lg:my-10 my-4 border-0">
    <CardHeader>
      <CardTitle class="uppercase text-3xl">
        {{ isLogin ? 'Login into' : 'Sign up for' }}
        <span class="text-violet-600">Vinyl</span> realm
      </CardTitle>
      <CardDescription>
        {{
          isLogin
            ? 'Enter your credentials to access your account'
            : 'Create your account to join the Vinyl community'
        }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form class="space-y-6" @submit="onSubmit">
        <div class="grid w-full items-center gap-4">
          <div v-if="!isLogin" class="flex flex-col space-y-1.5">
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              v-model="firstName"
              placeholder="First Name"
              type="text"
              class="w-full"
            />
            <span v-if="errors.firstName" class="text-sm text-red-500">{{
              errors.firstName
            }}</span>
          </div>
          <div v-if="!isLogin" class="flex flex-col space-y-1.5">
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              v-model="lastName"
              placeholder="Last Name"
              type="text"
              class="w-full"
            />
            <span v-if="errors.lastName" class="text-sm text-red-500">{{
              errors.lastName
            }}</span>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              placeholder="Email"
              type="email"
              class="w-full"
            />
            <span v-if="errors.email" class="text-sm text-red-500">{{
              errors.email
            }}</span>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model="password"
              placeholder="Password"
              type="password"
              class="w-full"
            />
            <span v-if="errors.password" class="text-sm text-red-500">{{
              errors.password
            }}</span>
          </div>

          <div v-if="!isLogin" class="flex flex-col space-y-1.5">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              class="w-full"
            />
            <span v-if="errors.confirmPassword" class="text-sm text-red-500">{{
              errors.confirmPassword
            }}</span>
          </div>
        </div>
        <span v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</span>
      </form>
    </CardContent>
    <CardFooter class="flex flex-col space-y-4">
      <Button class="w-full" type="submit" @click="onSubmit">
        {{ isLogin ? 'Login' : 'Sign Up' }}
      </Button>
      <div
        class="flex flex-col lg:flex-row justify-between w-full space-y-4 lg:space-y-0"
      >
        <CommonAppLink v-if="isLogin" to="/auth/forget-password">
          Forgot Password?
        </CommonAppLink>
        <Button variant="link" @click="toggleAuthMode">
          {{
            isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'
          }}
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>
