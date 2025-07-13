<script lang="ts" setup>

definePageMeta({
  middleware:'admin-auth-middleware'
})

import { ref, onMounted, reactive } from 'vue'
import { toast } from 'vue-sonner'


interface Product {
  ID: number
  title: string
  price: number
  description: string
  image_url: string
  created_at: string
}

interface ProductForm {
  title: string
  price: number | null
  description: string
  image_url: string
}

interface SideProduct {
  id: number
  title: string
  description: string
  in_stock: boolean
  price: number
  image_url: string
  rate?: number
  discount?: number
  shiping_price?: number
  created_at: string
}

// Update the SideProductForm interface
interface SideProductForm {
  title: string
  price: number | null
  description: string
  image_url: string
  in_stock: boolean
}

// State
const activeTab = ref('products')
const products = ref<Product[]>([])
const side_products = ref<SideProduct[]>([])

const loading = ref(false)
const sideloading = ref(false)
const submitLoading = ref(false)
const uploadLoading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Form state
const productForm = reactive<ProductForm>({
  title: '',
  price: null,
  description: '',
  image_url: ''
})

// Form state
// Update the form state
const sideProductForm = reactive<SideProductForm>({
  title: '',
  price: null,
  description: '',
  image_url: '',
  in_stock: true
})

// File input ref
const fileInput = ref<HTMLInputElement | null>(null)

// Fetch all products
interface ProductsApiResponse {
  status: string
  data: Product[]
  message?: string
}

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/products', {
      method: 'GET'
    })
    const typedResponse = response as ProductsApiResponse
    if (typedResponse.status === 'success') {
      products.value = typedResponse.data
    } else {
      showMessage(typedResponse.message || 'خطا در بارگذاری محصولات', 'error')
    }
  } catch (error) {
    showMessage('خطا در بارگذاری محصولات', 'error')
  } finally {
    loading.value = false
  }
}

const fetchSideProducts = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/side-product', {
      method: 'GET'
    })
    const typedResponse = response as ProductsApiResponse
    if (typedResponse.status === 'success') {
      products.value = typedResponse.data
    } else {
      showMessage(typedResponse.message || 'خطا در بارگذاری محصولات', 'error')
    }
  } catch (error) {
    showMessage('خطا در بارگذاری محصولات', 'error')
  } finally {
    loading.value = false
  }
}

// Add new product
const addProduct = async () => {
  if (!productForm.title || !productForm.price || !productForm.description || !productForm.image_url) {
    showMessage('لطفا تمام فیلدها را پر کنید', 'error')
    return
  }

  submitLoading.value = true
  try {
    const response = await $fetch<ProductsApiResponse>('/api/product', {
      method: 'POST',
      body: {
        title: productForm.title,
        price: productForm.price,
        description: productForm.description,
        image_url: productForm.image_url
      }
    })

    if (response.status === 'success') {
      toast.success(response.message || 'محصول با موفقیت اضافه شد', {
        style: {
          background: '#4CAF50',
        },
        position: 'top-right',
        duration: 3000,
      })
      resetForm()
      await fetchProducts() // Refresh the product list
    } else {
      showMessage(response.message || 'خطا در افزودن محصول', 'error')
    }
  } catch (error) {
    showMessage('خطا در افزودن محصول', 'error')
  } finally {
    submitLoading.value = false
  }
}

// Update the addSideProduct function
const addSideProduct = async () => {
  if (!sideProductForm.title || !sideProductForm.price || !sideProductForm.description || !sideProductForm.image_url) {
    showMessage('لطفا تمام فیلدها را پر کنید', 'error')
    return
  }

  submitLoading.value = true
  try {
    const response = await $fetch<ProductsApiResponse>('/api/side-product', {
      method: 'POST',
      body: {
        title: sideProductForm.title,
        price: sideProductForm.price,
        description: sideProductForm.description,
        image_url: sideProductForm.image_url,
        in_stock: sideProductForm.in_stock
      }
    })

    if (response.status === 'success') {
      toast.success(response.message || 'اکسسوری با موفقیت اضافه شد', {
        style: {
          background: '#4CAF50',
        },
        position: 'top-right',
        duration: 3000,
      })
      resetSideProductForm()
      await fetchSideProducts() // Refresh the product list
    } else {
      showMessage(response.message || 'خطا در افزودن اکسسوری', 'error')
    }
  } catch (error) {
    showMessage('خطا در افزودن اکسسوری', 'error')
  } finally {
    submitLoading.value = false
  }
}

// Delete product
const deleteProduct = async (productId: number) => {
    submitLoading.value = true
    $fetch(`/api/product?id=${productId}`, {
      method: 'DELETE'
    })
    .then((response: any) => {
      if (response.status === 'success') {
        toast.success(response.message || 'محصول با موفقیت حذف شد', {
            style: {
              background: '#4CAF50',
            },
          position: 'top-right',
          duration: 3000,
        })
        fetchProducts() // Refresh the product list
      } else {
        showMessage(response.message || 'خطا در حذف محصول', 'error')
      }
    }).finally(() => {
      submitLoading.value = false
    })
    .catch((error) => {
        submitLoading.value = false
      console.error('Error deleting product:', error)
      showMessage('خطا در حذف محصول', 'error')
    })
}

const deleteSideProduct = async (id:number) => {
  console.log("soon be added")
}

// Reset form
const resetForm = () => {
  sideProductForm.title = ''
  sideProductForm.price = null
  sideProductForm.description = ''
  sideProductForm.image_url = ''
  
  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}


// Update the resetSideProductForm function
const resetSideProductForm = () => {
  sideProductForm.title = ''
  sideProductForm.price = null
  sideProductForm.description = ''
  sideProductForm.image_url = ''
  sideProductForm.in_stock = true
  
  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Show message
const showMessage = (msg: string, type: 'success' | 'error') => {
  message.value = msg
  messageType.value = type
  console.log(`Message: ${msg}, Type: ${type}`)
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fa-IR').format(price)
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fa-IR')
}

// Load products on mount
onMounted(() => {
  fetchProducts()
  fetchSideProducts()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6" dir="rtl">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 text-right">پنل مدیریت گلبرگ</h1>
        <div class="flex items-center justify-between mt-2">
            <p class="text-gray-600 text-right">مدیریت محصولات و سایر بخش‌ها</p>
            <Button variant="destructive" size="lg">خروج از پنل</Button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex gap-4 items-center justify-start">
            <button
              @click="activeTab = 'products'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              محصولات
            </button>
            <button
              @click="activeTab = 'side-products'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'side-products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              اکسسوری ها
            </button>
            <button
              @click="activeTab = 'orders'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              سفارشات
            </button>

            <button
              @click="activeTab = 'users'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              کاربران
            </button>

          </nav>
        </div>
      </div>

      <!-- Message Alert -->
      <div v-if="message" class="mb-6">
        <div
          :class="[
            'rounded-md p-4 text-right',
            messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          ]"
        >
          {{ message }}
        </div>
      </div>

      <!-- Products Tab -->
      <div v-if="activeTab === 'products'" class="space-y-6">
        <!-- Add Product Form -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 text-right">افزودن محصول جدید</h2>
          
          <form @submit.prevent="addProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 text-right">عنوان محصول</label>
              <input
                v-model="productForm.title"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                placeholder="نام محصول را وارد کنید"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 text-right">قیمت (تومان)</label>
              <input
                v-model.number="productForm.price"
                type="number"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                placeholder="قیمت را وارد کنید"
              />
            </div>

            <!-- Image Upload Section -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1 text-right">تصویر محصول</label>
              
              <!-- File Input -->
              <div class="flex items-center gap-4 mb-2">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change=""
                  class="hidden"
                />
                <!-- :disabled="uploadLoading" -->
                <button
                  type="button"
                  @click="fileInput?.click()"
                  :disabled="true"
                  class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="uploadLoading">در حال آپلود...</span>
                  <span v-else>انتخاب تصویر</span>
                </button>
                
                <span class="text-sm text-gray-500">
                  حداکثر حجم: 5MB | فرمت‌های مجاز: JPG, PNG, GIF
                </span>
              </div>
    
              <!-- Image Preview -->
              <div v-if="productForm.image_url" class="mt-2">
                <img
                  :src="productForm.image_url"
                  alt="پیش‌نمایش تصویر"
                  class="h-32 w-32 object-cover rounded-lg border border-gray-300"
                />
              </div>

              <!-- Manual URL Input (Optional) -->
              <div class="mt-2">
                <label class="block text-sm font-medium text-gray-700 mb-1 text-right">یا URL تصویر را وارد کنید</label>
                <input
                  v-model="productForm.image_url"
                  type="url"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1 text-right">توضیحات</label>
              <textarea
                v-model="productForm.description"
                rows="3"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                placeholder="توضیحات محصول را وارد کنید"
              ></textarea>
            </div>

            <div class="md:col-span-2 flex justify-start gap-4">
              <button
                type="submit"
                :disabled="submitLoading || uploadLoading"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="submitLoading">در حال افزودن...</span>
                <span v-else>افزودن محصول</span>
              </button>
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                پاک کردن
              </button>
            </div>
          </form>
        </div>

        <!-- Products List -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 text-right">لیست محصولات</h2>
          </div>

          <div v-if="loading" class="p-6 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-2 text-gray-600">در حال بارگذاری...</p>
          </div>

          <div v-else-if="products.length === 0" class="p-6 text-center text-gray-500">
            هیچ محصولی یافت نشد
          </div>

          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عملیات
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاریخ ایجاد
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    قیمت
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عنوان
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تصویر
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="product in products" :key="product.ID" class="hover:bg-gray-50">
                  <td class="flex gap-2 px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button size="sm" variant="outline">ویرایش</Button>
                    <Button size="sm" variant="destructive" @click="deleteProduct(product.ID)">حذف</Button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {{ formatDate(product.created_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {{ formatPrice(product.price) }} تومان
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="text-sm font-medium text-gray-900">{{ product.title }}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ product.description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img
                      :src="product.image_url"
                      :alt="product.title"
                      class="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Side Products Tab -->
<!-- Side Products Tab -->
  <div v-if="activeTab === 'side-products'" class="space-y-6">
    <!-- Add Side Product Form -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4 text-right">افزودن اکسسوری جدید</h2>
      
      <form @submit.prevent="addSideProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-right">عنوان اکسسوری</label>
          <input
            v-model="sideProductForm.title"
            type="text"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
            placeholder="نام اکسسوری را وارد کنید"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 text-right">قیمت (تومان)</label>
          <input
            v-model.number="sideProductForm.price"
            type="number"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
            placeholder="قیمت را وارد کنید"
          />
        </div>

        <!-- Stock Status -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1 text-right">وضعیت موجودی</label>
          <div class="flex items-center gap-4">
            <label class="flex items-center">
              <input
                v-model="sideProductForm.in_stock"
                type="radio"
                :value="true"
                class="ml-2"
              />
              <span class="text-sm text-gray-900">موجود</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="sideProductForm.in_stock"
                type="radio"
                :value="false"
                class="ml-2"
              />
              <span class="text-sm text-gray-900">ناموجود</span>
            </label>
          </div>
        </div>

        <!-- Image Upload Section -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1 text-right">تصویر اکسسوری</label>
          
          <!-- File Input -->
          <div class="flex items-center gap-4 mb-2">
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change=""
              class="hidden"
            />
            <!-- :disabled="uploadLoading" -->
            <button
              type="button"
              @click="fileInput?.click()"
              :disabled="true"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="uploadLoading">در حال آپلود...</span>
              <span v-else>انتخاب تصویر</span>
            </button>
            
            <span class="text-sm text-gray-500">
              حداکثر حجم: 5MB | فرمت‌های مجاز: JPG, PNG, GIF
            </span>
          </div>

          <!-- Image Preview -->
          <div v-if="sideProductForm.image_url" class="mt-2">
            <img
              :src="sideProductForm.image_url"
              alt="پیش‌نمایش تصویر"
              class="h-32 w-32 object-cover rounded-lg border border-gray-300"
            />
          </div>

          <!-- Manual URL Input (Optional) -->
          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700 mb-1 text-right">یا URL تصویر را وارد کنید</label>
            <input
              v-model="sideProductForm.image_url"
              type="url"
              class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1 text-right">توضیحات</label>
          <textarea
            v-model="sideProductForm.description"
            rows="3"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
            placeholder="توضیحات اکسسوری را وارد کنید"
          ></textarea>
        </div>

        <div class="md:col-span-2 flex justify-start gap-4">
          <button
            type="submit"
            :disabled="submitLoading || uploadLoading"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="submitLoading">در حال افزودن...</span>
            <span v-else>افزودن اکسسوری</span>
          </button>
          <button
            type="button"
            @click="resetSideProductForm"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            پاک کردن
          </button>
        </div>
      </form>
    </div>

    <!-- Side Products List -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 text-right">لیست اکسسوری ها</h2>
      </div>

      <div v-if="sideloading" class="p-6 text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-2 text-gray-600">در حال بارگذاری...</p>
      </div>

      <div v-else-if="side_products.length === 0" class="p-6 text-center text-gray-500">
        هیچ اکسسوری یافت نشد
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عملیات
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاریخ ایجاد
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                موجودی
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                قیمت
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عنوان
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تصویر
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="side_product in side_products" :key="side_product.id" class="hover:bg-gray-50">
              <td class="flex gap-2 px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button size="sm" variant="outline">ویرایش</Button>
                <Button size="sm" variant="destructive" @click="deleteSideProduct(side_product.id)">حذف</Button>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {{ formatDate(side_product.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    side_product.in_stock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ side_product.in_stock ? 'موجود' : 'ناموجود' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                {{ formatPrice(side_product.price) }} تومان
              </td>
              <td class="px-6 py-4 text-right">
                <div class="text-sm font-medium text-gray-900">{{ side_product.title }}</div>
                <div class="text-sm text-gray-500 truncate max-w-xs">{{ side_product.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="side_product.image_url"
                  :alt="side_product.title"
                  class="h-12 w-12 rounded-lg object-cover"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

      <!-- Other Tabs (Placeholder) -->
      <div v-else-if="activeTab === 'categories'" class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4 text-right">دسته‌بندی‌ها</h2>
        <p class="text-gray-600 text-right">این بخش به زودی اضافه خواهد شد.</p>
      </div>

      <div v-else-if="activeTab === 'orders'" class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4 text-right">سفارشات</h2>
        <p class="text-gray-600 text-right">این بخش به زودی اضافه خواهد شد.</p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* RTL specific styles */
input[type="number"] {
  direction: ltr;
  text-align: right;
}

input[type="url"] {
  direction: ltr;
  text-align: right;
}
</style>