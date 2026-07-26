import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">
      <div className="bg-gray-900 p-10 rounded-3xl w-full max-w-md border border-orange-500/30">
        <h1 className="text-4xl font-black mb-2 text-center">
          🏯 Hokage Office
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Admin Login
        </p>

        <form
          action={async (formData) => {
            "use server";

            await signIn("credentials", {
              username: formData.get("username"),
              password: formData.get("password"),
              redirectTo: "/admin",
            });
          }}
          className="space-y-5"
        >
          <input
            name="username"
            placeholder="Username"
            className="w-full rounded-xl bg-gray-800 p-3"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-gray-800 p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 rounded-xl py-3 font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}