import { login } from "@/app/actions/login";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">
      <div className="bg-gray-900 p-10 rounded-3xl w-full max-w-md border border-orange-500/30">

        <h1 className="text-4xl font-black mb-2 text-center">
          🏯 Hokage Office
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Admin Login
        </p>

        {params.error && (
          <p className="text-red-400 mb-6 text-center">
            Invalid username or password.
          </p>
        )}

        <form action={login} className="space-y-5">

          <input
            name="username"
            placeholder="Username"
            className="w-full rounded-xl bg-gray-800 p-3"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-gray-800 p-3"
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