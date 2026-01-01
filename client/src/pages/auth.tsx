import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema, InsertUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, HandHeart, CheckCircle2 } from "lucide-react";

export default function AuthPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <Card className="w-full max-w-md z-10 shadow-2xl border-primary/10 backdrop-blur-sm bg-card/80">
          <CardHeader className="space-y-3 text-center pb-8">
            <div className="mx-auto size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
              <HandHeart className="size-7" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Selamat Datang Kembali
              </CardTitle>
              <CardDescription className="text-base">
                Masuk untuk mengakses Dashboard SPK Bansos
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:flex flex-col justify-center p-12 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-slate-900/90" />

        <div className="max-w-xl mx-auto space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-primary-foreground/90">
              Sistem Pendukung Keputusan v1.0
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-white">
              Penyaluran Bantuan Sosial Yang Tepat Sasaran
            </h1>
            <p className="text-lg text-slate-200 leading-relaxed max-w-lg">
              Menggunakan metode VIKOR untuk menganalisis dan menentukan
              penerima bantuan sosial secara objektif, transparan, dan
              akuntabel.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4">
            {[
              "Analisis Kriteria Multidimensi",
              "Perhitungan Ranking Otomatis",
              "Pengelolaan Data Terpusat",
              "Laporan Transparan & Akuntabel",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-200">
                <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground">
                  <CheckCircle2 className="size-4" />
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative footer */}
        <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center text-slate-400 text-sm z-10">
          <p>© 2026 wahyu & Akmal. All rights reserved.</p>
          <div className="flex gap-4">
            {/* <span>Privacy Policy</span> */}
            <span>UNIVERSITAS SAINS AL-QUR'AN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const { loginMutation } = useAuth();
  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => loginMutation.mutate(data))}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan username anda"
                  className="h-11 bg-background/50 border-input/60 focus:border-primary focus:ring-primary/20 transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 bg-background/50 border-input/60 focus:border-primary focus:ring-primary/20 transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-11 text-base font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all mt-2"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Masuk ke Aplikasi
        </Button>
      </form>
    </Form>
  );
}
