import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed", { description: error.message });
    } else {
      toast.success("Logged out");
      router.push("/login");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 transition"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
}
