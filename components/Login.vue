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
import { Loader2, User } from "lucide-vue-next";
import { toast } from 'vue-sonner'

const phoneNumber = ref("");
const password = ref("");
const email = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);

function handleRegister(){
  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  $fetch("/api/register", {
    method: "POST",
    body: {
      email: email.value,
      phone: phoneNumber.value,
      password: password.value,
    },
  }).then((response) => {
    if (response && response.status === "success") {
      // Handle successful registration
      successMessage.value = "ثبت نام با موفقیت انجام شد.";
      toast.success(successMessage.value, {
        position: 'top-right',
        duration: 3000,
      });

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
    <Dialog>
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
            <span class="irSans">ثبت نام / ورود</span>
          </DialogTitle>
          <DialogDescription class="text-right">
            <span class="irSans">
              برای ورود به سایت لطفا شماره موبایل خود را وارد کنید
            </span>
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4" dir="rtl">
                    <div class="grid grid-cols-4 items-center gap-4">
            <Label for="phone" class="text-right col-span-1">
              <span class="irSans">ایمیل</span>
            </Label>
            <Input 
              type="email"
              v-model="email"
              class="col-span-3 text-right rtl-input" 
              dir="rtl"
              placeholder="email@example.com"
            />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="phone" class="text-right col-span-1">
              <span class="irSans">شماره موبایل</span>
            </Label>
            <Input 
              type="tel"
              v-model="phoneNumber"
              class="col-span-3 text-right rtl-input" 
              dir="rtl"
              placeholder="09123456789"
            />
          </div>
                    <div class="grid grid-cols-4 items-center gap-4">
            <Label for="phone" class="text-right col-span-1">
              <span class="irSans">رمز عبور</span>
            </Label>
            <Input 
              type="password"
              v-model="password"
              class="col-span-3 text-right rtl-input" 
              dir="rtl"
              placeholder="********"
            />
          </div>
        </div>
        <DialogFooter class="rtl-footer">
          <Button :disabled="isLoading" @click="handleRegister">
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            <span class="irSans">ارسال</span>
          </Button>
        </DialogFooter>
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

/* Ensure proper RTL layout for the dialog footer */
.rtl-footer > * {
  margin-left: 0;
  margin-right: auto;
}
</style>