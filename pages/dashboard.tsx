// pages/dashboard.tsx
import Head from "next/head";
import CustomerTable from "../components/CustomerTable";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return (
    <>
      <Head>
        <title>CRM Dashboard</title>
      </Head>
      <main className="min-h-screen bg-white text-black">
        <CustomerTable />
      </main>
    </>
  );
}
