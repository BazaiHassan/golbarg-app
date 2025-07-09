<script lang="ts" setup>
definePageMeta({
  middleware:["check-auth-middleware"]
})

import { ref, computed } from 'vue';
import { Upload, Camera, Leaf, AlertCircle, CheckCircle, Lightbulb, Droplets, Sun, Heart, Shield } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const { diagnosePlant, isLoading, error, result, reset } = useGolbargAi();

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const isDragOver = ref(false);

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    setSelectedFile(target.files[0]);
  }
};

const setSelectedFile = (file: File) => {
  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
  
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    setSelectedFile(event.dataTransfer.files[0]);
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleDiagnose = async () => {
  if (!selectedFile.value) return;
  await diagnosePlant(selectedFile.value);
};

const handleReset = () => {
  reset();
  selectedFile.value = null;
  previewUrl.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const healthStatusColor = computed(() => {
  if (!result.value) return 'default';
  
  const status = result.value.health_status;
  if (status.includes('سالم')) return 'default';
  if (status.includes('خفیف')) return 'secondary';
  if (status.includes('متوسط')) return 'outline';
  if (status.includes('شدید')) return 'destructive';
  return 'secondary';
});

const healthStatusClass = computed(() => {
  if (!result.value) return '';
  
  const status = result.value.health_status;
  if (status.includes('سالم')) return 'bg-green-100 text-green-800 border-green-200';
  if (status.includes('خفیف')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (status.includes('متوسط')) return 'bg-orange-100 text-orange-800 border-orange-200';
  if (status.includes('شدید')) return 'bg-red-100 text-red-800 border-red-200';
  return '';
});

const confidenceColor = computed(() => {
  if (!result.value) return 'bg-gray-200';
  
  const score = result.value.confidence_score * 100;
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4" dir="rtl">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-4">
          <div class="bg-green-100 p-3 rounded-full ml-3">
            <Leaf class="h-8 w-8 text-green-600" />
          </div>
          <h1 class="text-4xl font-bold text-gray-900">تشخیص بیماری و راه حل درمان</h1>
        </div>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          تصویر گیاه خود را بارگذاری کنید و تشخیص هوشمند بیماری‌ها و راه‌حل‌های درمانی را دریافت کنید
        </p>
      </div>

      <!-- Upload Section -->
      <Card class="mb-8 border-2 border-dashed border-green-300 bg-white/80 backdrop-blur-sm">
        <CardContent class="p-6">
          <div
            class="relative"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            
            <div
              v-if="!previewUrl"
              class="flex flex-col items-center justify-center py-12 px-4 text-center cursor-pointer transition-all duration-200 hover:bg-green-50 rounded-lg"
              :class="{ 'bg-green-100 border-green-400': isDragOver }"
              @click="triggerFileInput"
            >
              <Upload class="h-12 w-12 text-green-500 mb-4" />
              <h3 class="text-lg font-semibold text-gray-900 mb-2">تصویر گیاه را بارگذاری کنید</h3>
              <p class="text-gray-600 mb-4">فایل را اینجا بکشید یا کلیک کنید</p>
              <Button variant="outline" class="bg-white">
                <Camera class="h-4 w-4 ml-2" />
                انتخاب تصویر
              </Button>
            </div>

            <div v-else class="text-center">
              <div class="relative inline-block">
                <img
                  :src="previewUrl"
                  alt="Preview"
                  class="max-h-64 rounded-lg shadow-lg mx-auto"
                />
                <Button
                  variant="outline"
                  size="sm"
                  class="absolute top-2 left-2 bg-white/90 backdrop-blur-sm"
                  @click="handleReset"
                >
                  تغییر تصویر
                </Button>
              </div>
              
              <div class="mt-4 flex flex-row gap-4 items-center justify-center">
                <Button
                  @click="handleDiagnose"
                  :disabled="isLoading"
                  class="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Leaf class="h-4 w-4 ml-2" />
                  {{ isLoading ? 'در حال تشخیص...' : 'تشخیص بیماری' }}
                </Button>
                <Button variant="outline" @click="handleReset">
                  تصویر جدید
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p class="text-gray-600">در حال تجزیه و تحلیل تصویر...</p>
      </div>

      <!-- Error -->
      <Alert v-if="error" variant="destructive" class="mb-6">
        <AlertCircle class="h-4 w-4" />
        <AlertDescription>{{ error }}</AlertDescription>
      </Alert>

      <!-- Results -->
      <div v-if="result" class="space-y-6">
        <!-- Plant Info Card -->
        <Card class="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-2xl text-green-800">{{ result.plant_name }}</CardTitle>
              <Badge :variant="healthStatusColor" :class="healthStatusClass" class="px-3 py-1">
                {{ result.health_status }}
              </Badge>
            </div>
            <CardDescription>
              <div class="flex items-center mt-2">
                <span class="text-sm text-gray-600 ml-2">میزان اطمینان:</span>
                <Progress :value="result.confidence_score * 100" class="flex-1 max-w-32" />
                <span class="text-sm font-medium mr-2">{{ Math.round(result.confidence_score * 100) }}%</span>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        <!-- Main Content Tabs -->
        <Tabs default-value="diseases" class="w-full">
          <TabsList class="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="diseases">بیماری‌ها</TabsTrigger>
            <TabsTrigger value="treatment">درمان</TabsTrigger>
            <TabsTrigger value="prevention">پیشگیری</TabsTrigger>
            <TabsTrigger value="care">مراقبت</TabsTrigger>
          </TabsList>

          <!-- Diseases Tab -->
          <TabsContent value="diseases" class="space-y-4">
            <div v-for="disease in result.diseases_detected" :key="disease.disease_name" class="space-y-4">
              <Card class="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle class="flex items-center text-red-700">
                    <AlertCircle class="h-5 w-5 ml-2" />
                    {{ disease.disease_name }}
                  </CardTitle>
                  <div class="flex items-center gap-2">
                    <Badge variant="outline">شدت: {{ disease.severity }}</Badge>
                    <Badge variant="secondary">{{ disease.possible_causes.join(', ') }}</Badge>
                  </div>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">قسمت‌های آسیب‌دیده:</h4>
                    <div class="flex flex-wrap gap-2">
                      <Badge v-for="part in disease.affected_parts" :key="part" variant="outline">
                        {{ part }}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">علائم:</h4>
                    <ul class="space-y-1 text-gray-700">
                      <li v-for="symptom in disease.symptoms" :key="symptom" class="flex items-start">
                        <span class="text-red-500 ml-2">•</span>
                        {{ symptom }}
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <!-- Treatment Tab -->
          <TabsContent value="treatment" class="space-y-4">
            <div v-for="treatment in result.treatment_recommendations" :key="treatment.method" class="space-y-4">
              <Card class="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle class="flex items-center text-blue-700">
                    <Heart class="h-5 w-5 ml-2" />
                    روش {{ treatment.method }}
                  </CardTitle>
                </CardHeader>
                <CardContent class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">اقدام درمانی:</h4>
                    <p class="text-gray-700">{{ treatment.action }}</p>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">زمان‌بندی:</h4>
                    <p class="text-gray-700">{{ treatment.timing }}</p>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">نکات مهم:</h4>
                    <p class="text-gray-700 bg-yellow-50 p-3 rounded-lg border-r-4 border-yellow-400">
                      {{ treatment.notes }}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <!-- Prevention Tab -->
          <TabsContent value="prevention" class="space-y-4">
            <Card class="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle class="flex items-center text-green-700">
                  <Shield class="h-5 w-5 ml-2" />
                  نکات پیشگیری
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul class="space-y-3">
                  <li v-for="tip in result.prevention_tips" :key="tip" class="flex items-start">
                    <CheckCircle class="h-5 w-5 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-700">{{ tip }}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <!-- Care Tab -->
          <TabsContent value="care" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card class="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle class="flex items-center text-blue-600">
                    <Droplets class="h-5 w-5 ml-2" />
                    آبیاری
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p class="text-gray-700">{{ result.care_instructions.watering }}</p>
                </CardContent>
              </Card>

              <Card class="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle class="flex items-center text-yellow-600">
                    <Sun class="h-5 w-5 ml-2" />
                    نورپردازی
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p class="text-gray-700">{{ result.care_instructions.lighting }}</p>
                </CardContent>
              </Card>

              <Card class="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle class="flex items-center text-purple-600">
                    <Lightbulb class="h-5 w-5 ml-2" />
                    کوددهی
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p class="text-gray-700">{{ result.care_instructions.fertilization }}</p>
                </CardContent>
              </Card>

              <Card class="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle class="flex items-center text-teal-600">
                    <Leaf class="h-5 w-5 ml-2" />
                    محیط رشد
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p class="text-gray-700">{{ result.care_instructions.environment }}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    <div class="text-center mt-12">
        <NuxtLink to="/" class="inline-block">
          <Button variant="outline" class="bg-white hover:bg-gray-100">
            بازگشت به صفحه اصلی
          </Button>
        </NuxtLink>
    </div>
    <div class="mt-12 text-center text-gray-500 text-sm">
  قدرت گرفته از mlgrid.com<br>
  کپی رایت هوش گستران ابر پرداز
</div>

  </div>

</template>

<style scoped>
/* Custom animations and transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive image preview */
@media (max-width: 640px) {
  .max-h-64 {
    max-height: 200px;
  }
}

/* RTL Support */
* {
  direction: rtl;
}

/* Ensure proper spacing for RTL */
.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-reverse > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}
</style>
