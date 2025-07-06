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
import { User } from "lucide-vue-next";

const phoneNumber = ref("");
const password = ref("");
const email = ref("");

function handleRegister(){
  $fetch("/api/register", {
    method: "POST",
    body: {
      email: email.value,
      phone: phoneNumber.value,
      password: password.value,
    },
  })
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
      <DialogContent class="sm:max-w-[425px] rtl-content">
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
          <Button @click="handleRegister">
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