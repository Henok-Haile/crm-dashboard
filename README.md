# 🚀 SimpleCRM – Customer Relationship Manager

**SimpleCRM** is a lightweight, modern, and secure Customer Relationship Management (CRM) system built with **Next.js 15**, **TypeScript**, and **Supabase**. It enables authenticated users to manage their own customer data efficiently, with features like searching, sorting, filtering, and real-time updates.

---

## 📸 Demo

![SimpleCRM Dashboard Screenshot](https://via.placeholder.com/1000x400.png?text=Demo+Coming+Soon)

> 🔐 Only authenticated users can access the dashboard.

---

## ✨ Features

* 🔐 **Authentication** via Supabase
* ➕ Add, edit, delete customers
* 📊 Dashboard with stats (total, weekly, latest)
* 🔍 Search, sort (A-Z, Z-A, Latest), and date range filter
* 🧍 Row-level security – each user sees **only their own customers**
* ⚡ Built using **Next.js App Router**, **TailwindCSS**, **Supabase**, and **React Context**

---

## 🛠️ Tech Stack

| Tech            | Role                             |
| --------------- | -------------------------------- |
| Next.js 15      | Frontend Framework               |
| Supabase        | Backend-as-a-Service (Auth + DB) |
| React + Context | State Management                 |
| TailwindCSS     | Utility-first styling            |
| Sonner          | Modern toast notifications       |
| Lucide Icons    | Iconography                      |

---

## 📁 Folder Structure

```
crm-dashboard/
├── components/         # Reusable components (forms, stats, table)
│   └── ui/             # Button, Input, Dialog, Label
├── context/            # AuthContext for session state
├── lib/                # Supabase client setup
├── pages/              # Next.js Pages: /, /login, /signup, /dashboard
├── styles/             # Tailwind global styles
├── public/             # Static assets
├── .env.local          # Supabase credentials (not committed)
└── README.md
```

---

## 🧪 How It Works

### 🔐 Authentication

* Uses Supabase Auth (email/password).
* On login, user is redirected to `/dashboard`.
* If unauthenticated, user is redirected to `/login`.

### 🧍 User-Specific Data

Supabase Row-Level Security (RLS) policy ensures users **only see their own customers**.

```sql
CREATE POLICY "Users can access their own customers"
ON public.customers
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### 📦 Database Schema

```sql
customers (
  id uuid PRIMARY KEY,
  name text,
  email text,
  phone text,
  notes text,
  created_at timestamp,
  user_id uuid REFERENCES auth.users(id)
)
```

---

## ✅ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/crm-dashboard.git
cd crm-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

Create a **`.env.local`** file with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the App

```bash
npm run dev
```

Access your app at `http://localhost:3000`

---

## 🧹 Optional Scripts

```bash
npm run lint     # Run ESLint
npm run build    # Build for production
```

---

## 📚 Learnings / What You’ll Practice

* Modern React Patterns (Hooks, Context)
* Serverless backend with Supabase
* Row-level security enforcement
* Auth-guarded routing
* UI design with TailwindCSS

---

## 🙌 Acknowledgments

* [Supabase](https://supabase.com)
* [TailwindCSS](https://tailwindcss.com)
* [Lucide Icons](https://lucide.dev)
* [Sonner](https://sonner.emilkowal.ski)

---

## 📄 License

MIT © Amina, Fanuel, Henok and Robel - GROUP-3 (https://github.com/Henok-Haile)

---
