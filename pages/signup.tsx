import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error("Signup failed", { description: error.message });
    } else {
      toast.success("Signup successful! Check your email to confirm.");
      setEmail("");
      setPassword("");
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create an Account</h1>
        <div className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700" onClick={handleSignUp}>
            Create Account
          </Button>
        </div>
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
