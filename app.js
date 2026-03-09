
const renderLogin = () => {
  app.innerHTML = `
    <section class="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center">
        <div class="w-full max-w-[700px] rounded-[36px] bg-white p-8 shadow-soft sm:p-12">
          <div class="mb-8">
            <img src="assets/github-logo.png" alt="GitHub logo" class="mb-6 h-20 w-20" />
            <p class="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-brand">Welcome Back</p>
            <h1 class="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              GitHub Issues Tracker
            </h1>
            <p class="mt-5 max-w-xl text-[17px] leading-8 text-slate-500">
              Sign in with the demo credentials to access the issue dashboard.
            </p>
          </div>

          <form id="login-form" class="space-y-6">
            <div>
              <label for="username" class="mb-3 block text-[15px] font-semibold text-slate-800">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter username"
                class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg text-slate-700 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
                required
              >
            </div>

            <div>
              <label for="password" class="mb-3 block text-[15px] font-semibold text-slate-800">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg text-slate-700 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
                required
              >
            </div>

            <button
              type="submit"
              class="w-full rounded-3xl bg-gradient-to-r from-brand to-brandDark px-5 py-4 text-2xl font-bold text-white transition hover:opacity-95"
            >
              Sign In
            </button>
          </form>

          <div class="mt-8 rounded-[32px] border border-slate-200 bg-slate-50 p-7">
            <p class="mb-5 text-[18px] font-bold text-slate-900">Demo Credentials</p>
            <p class="text-[16px] text-slate-700">
              <span class="font-bold text-slate-800">Username:</span> admin
            </p>
            <p class="mt-2 text-[16px] text-slate-700">
              <span class="font-bold text-slate-800">Password:</span> admin123
            </p>
          </div>

          <p id="login-error" class="mt-5 hidden rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600"></p>
        </div>
      </div>
    </section>
  `;

  document.getElementById('login-form').addEventListener('submit', handleLogin);
};