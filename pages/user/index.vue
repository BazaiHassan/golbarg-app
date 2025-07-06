<script lang="ts" setup>

definePageMeta({
    middleware:["check-auth-middleware"]
})

import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  ShoppingCart, 
  CreditCard, 
  User, 
  Package, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  DollarSign,
  TrendingUp,
  Eye
} from 'lucide-vue-next'

const token = useCookie('token')

// Mock data for orders
const orders = ref([
  {
    id: 'ORD-001',
    date: '۱۴۰۳/۰۴/۱۵',
    items: ['لپ تاپ ایسوس', 'ماوس لاجیتک'],
    total: '۲۵,۰۰۰,۰۰۰',
    status: 'delivered',
    statusText: 'تحویل داده شده'
  },
  {
    id: 'ORD-002',
    date: '۱۴۰۳/۰۴/۱۲',
    items: ['کیبورد مکانیکی', 'هدفون'],
    total: '۸,۵۰۰,۰۰۰',
    status: 'processing',
    statusText: 'در حال پردازش'
  },
  {
    id: 'ORD-003',
    date: '۱۴۰۳/۰۴/۱۰',
    items: ['موبایل سامسونگ'],
    total: '۱۵,۰۰۰,۰۰۰',
    status: 'shipped',
    statusText: 'ارسال شده'
  },
  {
    id: 'ORD-004',
    date: '۱۴۰۳/۰۴/۰۸',
    items: ['تبلت اپل', 'کاور محافظ'],
    total: '۳۲,۰۰۰,۰۰۰',
    status: 'cancelled',
    statusText: 'لغو شده'
  }
])

// Mock data for payments
const payments = ref([
  {
    id: 'PAY-001',
    orderId: 'ORD-001',
    date: '۱۴۰۳/۰۴/۱۵',
    amount: '۲۵,۰۰۰,۰۰۰',
    method: 'کارت بانکی',
    status: 'success',
    statusText: 'موفق'
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-002',
    date: '۱۴۰۳/۰۴/۱۲',
    amount: '۸,۵۰۰,۰۰۰',
    method: 'کیف پول',
    status: 'success',
    statusText: 'موفق'
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-003',
    date: '۱۴۰۳/۰۴/۱۰',
    amount: '۱۵,۰۰۰,۰۰۰',
    method: 'کارت بانکی',
    status: 'pending',
    statusText: 'در انتظار'
  },
  {
    id: 'PAY-004',
    orderId: 'ORD-004',
    date: '۱۴۰۳/۰۴/۰۸',
    amount: '۳۲,۰۰۰,۰۰۰',
    method: 'کارت بانکی',
    status: 'failed',
    statusText: 'ناموفق'
  }
])

// User info
const user = ref({
  name: 'علی احمدی',
  email: 'ali.ahmadi@email.com',
  phone: '۰۹۱۲۳۴۵۶۷۸۹',
  joinDate: '۱۴۰۲/۰۱/۱۵'
})

// Computed stats
const totalOrders = computed(() => orders.value.length)
const totalSpent = computed(() => {
  return orders.value
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + parseInt(order.total.replace(/[,۰-۹]/g, match => 
      match === ',' ? '' : '۰۱۲۳۴۵۶۷۸۹'.indexOf(match).toString()
    )), 0)
    .toLocaleString('fa-IR')
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
    case 'success':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'processing':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'shipped':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'cancelled':
    case 'failed':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
    case 'success':
      return CheckCircle
    case 'processing':
    case 'pending':
      return Clock
    case 'shipped':
      return Package
    case 'cancelled':
    case 'failed':
      return XCircle
    default:
      return Clock
  }
}

// Logout
const logout = () => {
  // Implement logout logic here
 token
  // Redirect to home or login page
  window.location.href = '/'
}
</script>

<template>
  <div class="irSans min-h-screen bg-gray-50 rtl" dir="rtl">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-reverse space-x-4">
            <Avatar class="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="User" />
              <AvatarFallback>{{ user.name.split(' ').map(n => n[0]).join('') }}</AvatarFallback>
            </Avatar>
            <div class="irSans">
              <h1 class="text-lg font-semibold text-gray-900">داشبورد کاربری</h1>
              <p class="text-sm text-gray-500">خوش آمدید، {{ user.name }}</p>
            </div>
          </div>
          <div class="flex irSans items-center space-x-reverse space-x-4">
            <NuxtLink to="/">
                <Button variant="outline" size="sm">
                  <User class="h-4 w-4 ml-2" />
                  بازگشت به خانه
                </Button>
            </NuxtLink>
                        
                <Button @click="logout" variant="destructive" size="sm">
                  <User class="h-4 w-4 ml-2" />
                  خروج از حساب
                </Button>
         
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm irSans font-medium">کل سفارشات</CardTitle>
            <ShoppingCart class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ totalOrders }}</div>
            <p class="text-xs irSans text-muted-foreground">از ابتدای عضویت</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm irSans font-medium">کل خرید</CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl irSans font-bold">{{ totalSpent }} تومان</div>
            <p class="text-xs irSans text-muted-foreground">از ابتدای عضویت</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm irSans font-medium">عضویت از</CardTitle>
            <Calendar class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ user.joinDate }}</div>
            <p class="text-xs irSans text-muted-foreground">تاریخ عضویت</p>
          </CardContent>
        </Card>
      </div>

      <!-- Main Content Tabs -->
      <Tabs default-value="orders" class="space-y-6">
        <TabsList class="grid w-full irSans grid-cols-2">
          <TabsTrigger value="orders" class="flex items-center gap-2">
            <ShoppingCart class="h-4 w-4" />
            لیست سفارشات
          </TabsTrigger>
          <TabsTrigger value="payments" class="flex items-center gap-2">
            <CreditCard class="h-4 w-4" />
            پرداخت‌ها
          </TabsTrigger>
        </TabsList>

        <!-- Orders Tab -->
        <TabsContent value="orders" class="space-y-4 irSans">
          <Card>
            <CardHeader>
              <CardTitle>سفارشات شما</CardTitle>
              <CardDescription>لیست کامل سفارشات ثبت شده</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div v-for="order in orders" :key="order.id" 
                     class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex-1 space-y-2">
                    <div class="flex items-center justify-between">
                      <h3 class="font-medium">سفارش {{ order.id }}</h3>
                      <!-- <Badge :class="getStatusColor(order.status)" class="flex items-center gap-1">
                        <component :is="getStatusIcon(order.status)" class="h-3 w-3" />
                        {{ order.statusText }}
                      </Badge> -->
                    </div>
                    <div class="text-sm text-gray-600">
                      <p>تاریخ: {{ order.date }}</p>
                      <p>اقلام: {{ order.items.join('، ') }}</p>
                      <p class="font-medium">مبلغ: {{ order.total }} تومان</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-reverse space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye class="h-4 w-4 ml-1" />
                      مشاهده
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Payments Tab -->
        <TabsContent value="payments" class="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تاریخچه پرداخت‌ها</CardTitle>
              <CardDescription>لیست کامل تراکنش‌های مالی</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div v-for="payment in payments" :key="payment.id" 
                     class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex-1 space-y-2">
                    <div class="flex items-center justify-between">
                      <h3 class="font-medium">پرداخت {{ payment.id }}</h3>
                      <!-- <Badge :class="getStatusColor(payment.status)" class="flex items-center gap-1">
                        <component :is="getStatusIcon(payment.status)" class="h-3 w-3" />
                        {{ payment.statusText }}
                      </Badge> -->
                    </div>
                    <div class="text-sm text-gray-600">
                      <p>تاریخ: {{ payment.date }}</p>
                      <p>سفارش: {{ payment.orderId }}</p>
                      <p>روش پرداخت: {{ payment.method }}</p>
                      <p class="font-medium">مبلغ: {{ payment.amount }} تومان</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-reverse space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye class="h-4 w-4 ml-1" />
                      جزئیات
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "irSans";
  src: url("/fonts/IRANSansWeb.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.irSans {
  font-family: "irSans", sans-serif;
}
.rtl {
  direction: rtl;
  font-family: 'Vazir', 'Tahoma', sans-serif;
}

/* Custom RTL styles for better Persian text rendering */
.rtl * {
  text-align: right;
}

.rtl .flex {
  direction: rtl;
}

.rtl .space-x-reverse > * + * {
  margin-right: var(--tw-space-x-reverse);
  margin-left: calc(var(--tw-space-x-reverse) * -1);
}

/* Ensure proper spacing for RTL */
.ml-1 {
  margin-right: 0.25rem !important;
  margin-left: 0 !important;
}

.ml-2 {
  margin-right: 0.5rem !important;
  margin-left: 0 !important;
}

.mr-1 {
  margin-left: 0.25rem !important;
  margin-right: 0 !important;
}

.mr-2 {
  margin-left: 0.5rem !important;
  margin-right: 0 !important;
}
</style>