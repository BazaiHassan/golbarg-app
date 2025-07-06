<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, User, LucideLayoutDashboard } from "lucide-vue-next";
import { toast } from 'vue-sonner'

const token = useCookie('token')
const activeTab = ref("login");

// Login form data
const loginIdentifier = ref("");
const loginPassword = ref("");

// Register form data
const registerPhoneNumber = ref("");
const registerPassword = ref("");
const registerEmail = ref("");

const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);

function handleLogin() {
  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  $fetch("/api/login", {
    method: "POST",
    body: {
      identifier: loginIdentifier.value,
      password: loginPassword.value,
    },
  }).then((response) => {
    if (response && response.status === "success") {
      // Handle successful login
      successMessage.value = "ورود با موفقیت انجام شد.";
      toast.success(successMessage.value, {
        position: 'top-right',
        duration: 3000,
      });

      // Store the token in a cookie
      token.value = response.data.token;

      // reload window to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } else if (response) {
      // Handle login error
      errorMessage.value = response.message || "ورود ناموفق بود.";
      toast.error(errorMessage.value, {
        position: 'top-right',
        duration: 3000,
      });
      isLoading.value = false;

    } else {
      // Handle undefined response
      errorMessage.value = "خطا در ارتباط با سرور.";
      toast.error(errorMessage.value, {
        position: 'top-right',
        duration: 3000,
      });
      isLoading.value = false;
    }
  })
  .catch((error) => {
    // Handle network or other errors
    errorMessage.value = "خطا در ارتباط با سرور: " + error.message;
    toast.error(errorMessage.value, {
      position: 'top-right',
      duration: 3000,
    });
    isLoading.value = false;
  });
}

function handleRegister() {
  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  $fetch("/api/register", {
    method: "POST",
    body: {
      email: registerEmail.value,
      phone: registerPhoneNumber.value,
      password: registerPassword.value,
    },
  }).then((response) => {
    if (response && response.status === "success") {
      // Handle successful registration
      successMessage.value = "ثبت نام با موفقیت انجام شد.";
      toast.success(successMessage.value, {
        position: 'top-right',
        duration: 3000,
      });

      // Store the token in a cookie
      token.value = response.data.token;

      // reload window to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } else if (response) {
      // Handle registration error
      errorMessage.value = response.message || "ثبت نام ناموفق بود.";
      toast.error(errorMessage.value, {
        position: 'top-right',
        duration: 3000,
      });
      isLoading.value = false;

    } else {
      // Handle undefined response
      errorMessage.value = "خطا در ارتباط با سرور.";
      toast.error(errorMessage.value, {
        position: 'top-right',
        duration: 3000,
      });
      isLoading.value = false;
    }
  })
  .catch((error) => {
    // Handle network or other errors
    errorMessage.value = "خطا در ارتباط با سرور: " + error.message;
    toast.error(errorMessage.value, {
      position: 'top-right',
      duration: 3000,
    });
    isLoading.value = false;
  });
}
</script>

<template>
  <div>
    <NuxtLink to="/user" v-if="token">
      <Button size="lg" class="bg-green-600 text-white hover:bg-primary/90">
          <p>داشبورد</p>
          <LucideLayoutDashboard class="cursor-pointer" />
      </Button>
    </NuxtLink>
    <Dialog v-if="!token">
      <DialogTrigger as-child>
        <Button size="lg" variant="default">
            <p>ورود</p>
          <User class="cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px] rtl-content" @interact-outside="event => {
        const target = event.target as HTMLElement;
        if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
      }">
        <DialogHeader class="text-right">
          <DialogTitle class="text-center">
            <span class="irSans">ورود / ثبت نام</span>
          </DialogTitle>
          <DialogDescription class="text-right">
            <span class="irSans">
              برای ورود یا ثبت نام در سایت فرم زیر را پر کنید
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs v-model="activeTab" class="w-full" dir="rtl">
          <TabsList class="grid w-full grid-cols-2 rtl-tabs">
            <TabsTrigger value="login" class="irSans">ورود</TabsTrigger>
            <TabsTrigger value="register" class="irSans">ثبت نام</TabsTrigger>
          </TabsList>
          
          <!-- Login Tab -->
          <TabsContent value="login" class="space-y-4">
            <div class="grid gap-4 py-4" dir="rtl">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="loginIdentifier" class="text-right col-span-1">
                  <span class="irSans">ایمیل</span>
                </Label>
                <Input 
                  id="loginIdentifier"
                  type="text"
                  v-model="loginIdentifier"
                  class="col-span-3 text-right rtl-input" 
                  dir="rtl"
                  placeholder="09123456789 یا email@example.com"
                />
              </div>
              
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="loginPassword" class="text-right col-span-1">
                  <span class="irSans">رمز عبور</span>
                </Label>
                <Input 
                  id="loginPassword"
                  type="password"
                  v-model="loginPassword"
                  class="col-span-3 text-right rtl-input" 
                  dir="rtl"
                  placeholder="********"
                />
              </div>
            </div>
            
            <DialogFooter class="rtl-footer">
              <Button :disabled="isLoading" @click="handleLogin">
                <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
                <span class="irSans">ورود</span>
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <!-- Register Tab -->
          <TabsContent value="register" class="space-y-4">
            <div class="grid gap-4 py-4" dir="rtl">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="registerEmail" class="text-right col-span-1">
                  <span class="irSans">ایمیل</span>
                </Label>
                <Input 
                  id="registerEmail"
                  type="email"
                  v-model="registerEmail"
                  class="col-span-3 text-right rtl-input" 
                  dir="rtl"
                  placeholder="email@example.com"
                />
              </div>

              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="registerPhone" class="text-right col-span-1">
                  <span class="irSans">شماره موبایل</span>
                </Label>
                <Input 
                  id="registerPhone"
                  type="tel"
                  v-model="registerPhoneNumber"
                  class="col-span-3 text-right rtl-input" 
                  dir="rtl"
                  placeholder="09123456789"
                />
              </div>
              
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="registerPassword" class="text-right col-span-1">
                  <span class="irSans">رمز عبور</span>
                </Label>
                <Input 
                  id="registerPassword"
                  type="password"
                  v-model="registerPassword"
                  class="col-span-3 text-right rtl-input" 
                  dir="rtl"
                  placeholder="********"
                />
              </div>
            </div>
            
            <DialogFooter class="rtl-footer">
              <Button :disabled="isLoading" @click="handleRegister">
                <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
                <span class="irSans">ثبت نام</span>
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
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

/* RTL specific styles */
.rtl-content {
  direction: rtl;
}

.rtl-input {
  text-align: right;
  direction: rtl;
}

.rtl-footer {
  direction: rtl;
  justify-content: flex-start;
}

.rtl-tabs {
  direction: rtl;
}

/* Ensure proper RTL layout for the dialog footer */
.rtl-footer > * {
  margin-left: 0;
  margin-right: auto;
}

/* Fix tabs layout for RTL */
.rtl-tabs [data-orientation="horizontal"] {
  flex-direction: row-reverse;
}
</style>