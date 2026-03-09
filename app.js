
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

const renderDashboard = () => {
  setFiltered();
  app.innerHTML = `
    <div class="min-h-screen">
      <nav class="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div class="flex items-center gap-3">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl"><img src="./assets/github-logo.png" alt="GitHub" class="h-9 w-9"></div>
            <div>
              <h1 class="text-xl font-bold text-slate-900 sm:text-2xl">GitHub Issues Tracker</h1>
              <p class="text-sm text-slate-500">Monitor, search, and review issue details</p>
            </div>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form id="search-form" class="flex w-full gap-2 sm:w-auto">
              <input id="search-input" type="text" value="${escapeHtml(state.searchTerm)}" placeholder="Search issues..." class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 sm:min-w-[290px]">
              <button type="submit" class="rounded-2xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brandDark">Search</button>
            </form>
            <button id="logout-btn" class="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100">Logout</button>
          </div>
        </div>
      </nav>

      <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section class="mb-6 rounded-[32px] bg-white p-5 shadow-soft sm:p-6">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div class="flex flex-wrap gap-2">
                <button data-tab="all" class="tab-btn rounded-full px-5 py-2.5 text-sm font-semibold transition ${tabClass('all')}">All</button>
                <button data-tab="open" class="tab-btn rounded-full px-5 py-2.5 text-sm font-semibold transition ${tabClass('open')}">Open</button>
                <button data-tab="closed" class="tab-btn rounded-full px-5 py-2.5 text-sm font-semibold transition ${tabClass('closed')}">Closed</button>
              </div>

              <div class="mt-6 flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10"><img src="assets/aperture.png" alt="Tracker" class="h-9 w-9"></div>
                <div>
                  <h2 class="text-3xl font-extrabold text-slate-900">${state.filteredIssues.length} Issues</h2>
                  <p class="mt-1 text-[15px] text-slate-500">Track and manage your project issues</p>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-5 text-lg">
              <div class="flex items-center gap-2 text-slate-700">${statusDot('open')}<span class="text-sm">Open</span></div>
              <div class="flex items-center gap-2 text-slate-700">${statusDot('closed')}<span class="text-sm">Closed</span></div>
            </div>
          </div>
        </section>

        

        <section class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          ${state.loading ? renderLoading() : state.filteredIssues.length ? state.filteredIssues.map(renderCard).join('') : renderEmpty()}
        </section>
      </main>

      ${renderModal()}
    </div>
  `;

  bindDashboardEvents();
};


const handleLogin = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '').trim();
  const errorBox = document.getElementById('login-error');

  if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
    localStorage.setItem(STORAGE_KEY, 'true');
    state.isAuthenticated = true;
    state.error = '';
    initializeDashboard();
    return;
  }

  errorBox.textContent = 'Invalid credentials. Use admin / admin123.';
  errorBox.classList.remove('hidden');
};

const handleLogout = () => {
  localStorage.removeItem(STORAGE_KEY);
  state.isAuthenticated = false;
  state.selectedIssue = null;
  state.searchTerm = '';
  state.activeTab = 'all';
  renderApp();
};