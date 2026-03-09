const API_BASE = 'https://phi-lab-server.vercel.app/api/v1/lab';
const DEMO_CREDENTIALS = { username: 'admin', password: 'admin123' };
const STORAGE_KEY = 'issue_tracker_auth';

const FALLBACK_ISSUES = [
  {"id":1,"title":"Fix navigation menu on mobile devices","description":"The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.","status":"open","labels":["bug","help wanted"],"priority":"high","author":"john_doe","assignee":"jane_smith","createdAt":"2024-01-15T10:30:00Z","updatedAt":"2024-01-15T10:30:00Z"},
  {"id":2,"title":"Add dark mode support","description":"Users are requesting a dark mode option. This would improve accessibility and user experience.","status":"open","labels":["enhancement","good first issue"],"priority":"medium","author":"sarah_dev","assignee":"","createdAt":"2024-01-14T14:20:00Z","updatedAt":"2024-01-16T09:15:00Z"},
  {"id":3,"title":"Update README with installation instructions","description":"The README file needs better installation instructions for new contributors.","status":"closed","labels":["documentation"],"priority":"low","author":"mike_docs","assignee":"sarah_dev","createdAt":"2024-01-10T08:00:00Z","updatedAt":"2024-01-12T16:45:00Z"},
  {"id":4,"title":"Performance issues with large datasets","description":"Application becomes slow when loading more than 1000 items. Need to implement pagination or virtual scrolling.","status":"open","labels":["bug","enhancement"],"priority":"high","author":"alex_perf","assignee":"john_doe","createdAt":"2024-01-18T11:00:00Z","updatedAt":"2024-01-18T11:00:00Z"},
  {"id":5,"title":"Add user authentication system","description":"Implement JWT-based authentication with login, registration, and password reset functionality.","status":"open","labels":["enhancement"],"priority":"high","author":"security_sam","assignee":"john_doe","createdAt":"2024-01-20T09:00:00Z","updatedAt":"2024-01-20T09:00:00Z"},
  {"id":6,"title":"Fix broken image uploads","description":"Users are unable to upload images larger than 5MB. Need to increase the file size limit or add compression.","status":"open","labels":["bug"],"priority":"medium","author":"emma_ui","assignee":"","createdAt":"2024-01-19T15:30:00Z","updatedAt":"2024-01-19T15:30:00Z"},
  {"id":7,"title":"Improve search functionality","description":"Add filters for advanced search including date ranges, status, and tags.","status":"open","labels":["enhancement","good first issue"],"priority":"low","author":"search_guru","assignee":"emma_ui","createdAt":"2024-01-17T12:00:00Z","updatedAt":"2024-01-17T12:00:00Z"},
  {"id":8,"title":"Database migration fails on production","description":"The latest migration script fails when running on production database. Works fine locally.","status":"open","labels":["bug"],"priority":"high","author":"db_admin","assignee":"alex_perf","createdAt":"2024-01-21T08:45:00Z","updatedAt":"2024-01-21T08:45:00Z"},
  {"id":9,"title":"Add export to PDF feature","description":"Users want to export reports and dashboards to PDF format for sharing and printing.","status":"open","labels":["enhancement"],"priority":"medium","author":"feature_fred","assignee":"","createdAt":"2024-01-16T10:15:00Z","updatedAt":"2024-01-16T10:15:00Z"},
  {"id":10,"title":"Update dependencies to latest versions","description":"Several npm packages are outdated and have security vulnerabilities. Need to update and test.","status":"closed","labels":["documentation"],"priority":"medium","author":"security_sam","assignee":"john_doe","createdAt":"2024-01-05T14:00:00Z","updatedAt":"2024-01-15T11:30:00Z"},
  {"id":11,"title":"Create API documentation","description":"Generate comprehensive API documentation using Swagger or similar tool.","status":"open","labels":["documentation","help wanted"],"priority":"medium","author":"mike_docs","assignee":"","createdAt":"2024-01-22T09:30:00Z","updatedAt":"2024-01-22T09:30:00Z"},
  {"id":12,"title":"Footer not displaying correctly on Safari","description":"The footer overlaps with content on Safari browser. CSS issue with flexbox layout.","status":"open","labels":["bug"],"priority":"low","author":"browser_bob","assignee":"emma_ui","createdAt":"2024-01-18T16:20:00Z","updatedAt":"2024-01-18T16:20:00Z"},
  {"id":13,"title":"Implement real-time notifications","description":"Add WebSocket support for real-time notifications when issues are updated or commented on.","status":"open","labels":["enhancement"],"priority":"high","author":"realtime_ron","assignee":"alex_perf","createdAt":"2024-01-23T10:00:00Z","updatedAt":"2024-01-23T10:00:00Z"},
  {"id":14,"title":"Add unit tests for authentication module","description":"Authentication module lacks proper test coverage. Need to add Jest unit tests.","status":"open","labels":["documentation","good first issue"],"priority":"medium","author":"test_tina","assignee":"","createdAt":"2024-01-12T11:45:00Z","updatedAt":"2024-01-12T11:45:00Z"},
  {"id":15,"title":"Memory leak in dashboard component","description":"Dashboard component causes memory leak after prolonged use. Need to investigate event listeners and cleanup.","status":"open","labels":["bug"],"priority":"high","author":"performance_pete","assignee":"john_doe","createdAt":"2024-01-24T13:15:00Z","updatedAt":"2024-01-24T13:15:00Z"},
  {"id":16,"title":"Add multi-language support","description":"Internationalize the application to support multiple languages including Spanish, French, and German.","status":"open","labels":["enhancement"],"priority":"low","author":"i18n_ivan","assignee":"","createdAt":"2024-01-11T09:00:00Z","updatedAt":"2024-01-11T09:00:00Z"},
  {"id":17,"title":"Email notifications not being sent","description":"Users report not receiving email notifications. SMTP configuration might be incorrect.","status":"open","labels":["bug"],"priority":"high","author":"mail_mary","assignee":"security_sam","createdAt":"2024-01-25T08:30:00Z","updatedAt":"2024-01-25T08:30:00Z"},
  {"id":18,"title":"Refactor user settings page","description":"User settings page code is messy and hard to maintain. Needs refactoring with better component structure.","status":"closed","labels":["enhancement"],"priority":"medium","author":"clean_code_carl","assignee":"emma_ui","createdAt":"2024-01-08T14:30:00Z","updatedAt":"2024-01-20T10:15:00Z"},
  {"id":19,"title":"Add CSV export functionality","description":"Allow users to export data tables to CSV format for analysis in spreadsheet applications.","status":"open","labels":["enhancement","good first issue"],"priority":"low","author":"data_dan","assignee":"","createdAt":"2024-01-26T11:00:00Z","updatedAt":"2024-01-26T11:00:00Z"},
  {"id":20,"title":"Login page shows error on slow connections","description":"Login page displays timeout error when internet connection is slow. Need better error handling.","status":"open","labels":["bug"],"priority":"medium","author":"network_nancy","assignee":"security_sam","createdAt":"2024-01-13T15:45:00Z","updatedAt":"2024-01-13T15:45:00Z"},
  {"id":21,"title":"Implement two-factor authentication","description":"Add 2FA support using TOTP for enhanced security on user accounts.","status":"open","labels":["enhancement"],"priority":"high","author":"security_sam","assignee":"","createdAt":"2024-01-27T09:15:00Z","updatedAt":"2024-01-27T09:15:00Z"},
  {"id":22,"title":"Fix chart rendering issues","description":"Charts don't render correctly when window is resized. Need to add responsive chart logic.","status":"open","labels":["bug"],"priority":"medium","author":"chart_charlie","assignee":"emma_ui","createdAt":"2024-01-14T10:30:00Z","updatedAt":"2024-01-14T10:30:00Z"},
  {"id":23,"title":"Add drag and drop file upload","description":"Implement drag and drop functionality for file uploads to improve user experience.","status":"open","labels":["enhancement","good first issue"],"priority":"low","author":"ux_uma","assignee":"","createdAt":"2024-01-28T12:00:00Z","updatedAt":"2024-01-28T12:00:00Z"},
  {"id":24,"title":"API rate limiting not working","description":"Rate limiting middleware is not properly throttling API requests. Need to debug and fix.","status":"open","labels":["bug"],"priority":"high","author":"api_adam","assignee":"alex_perf","createdAt":"2024-01-29T08:00:00Z","updatedAt":"2024-01-29T08:00:00Z"},
  {"id":25,"title":"Create onboarding tutorial","description":"New users need a guided tutorial to understand key features. Create interactive onboarding flow.","status":"open","labels":["documentation","enhancement"],"priority":"medium","author":"tutorial_tom","assignee":"mike_docs","createdAt":"2024-01-15T13:30:00Z","updatedAt":"2024-01-15T13:30:00Z"},
  {"id":26,"title":"Session timeout too aggressive","description":"Users are being logged out too frequently. Need to adjust session timeout settings.","status":"closed","labels":["bug"],"priority":"medium","author":"session_steve","assignee":"security_sam","createdAt":"2024-01-09T11:00:00Z","updatedAt":"2024-01-22T14:30:00Z"},
  {"id":27,"title":"Add keyboard shortcuts","description":"Implement keyboard shortcuts for common actions to improve productivity for power users.","status":"open","labels":["enhancement"],"priority":"low","author":"shortcuts_shawn","assignee":"","createdAt":"2024-01-30T10:15:00Z","updatedAt":"2024-01-30T10:15:00Z"},
  {"id":28,"title":"Profile picture upload fails","description":"Users cannot upload profile pictures. Getting 413 error (payload too large).","status":"open","labels":["bug"],"priority":"medium","author":"avatar_alice","assignee":"john_doe","createdAt":"2024-01-16T14:45:00Z","updatedAt":"2024-01-16T14:45:00Z"},
  {"id":29,"title":"Implement caching strategy","description":"Add Redis caching for frequently accessed data to improve performance.","status":"open","labels":["enhancement"],"priority":"high","author":"cache_chris","assignee":"alex_perf","createdAt":"2024-01-31T09:30:00Z","updatedAt":"2024-01-31T09:30:00Z"},
  {"id":30,"title":"Fix timezone display issues","description":"Timestamps are showing in UTC instead of user's local timezone. Need to add timezone conversion.","status":"open","labels":["bug","good first issue"],"priority":"low","author":"time_tony","assignee":"","createdAt":"2024-01-17T16:00:00Z","updatedAt":"2024-01-17T16:00:00Z"},
  {"id":31,"title":"Add webhook support","description":"Implement webhooks to allow external services to receive notifications on events.","status":"open","labels":["enhancement"],"priority":"medium","author":"webhook_wendy","assignee":"","createdAt":"2024-02-01T11:20:00Z","updatedAt":"2024-02-01T11:20:00Z"},
  {"id":32,"title":"Accessibility issues with form labels","description":"Screen readers cannot properly identify form fields. Need to add proper ARIA labels.","status":"open","labels":["bug","help wanted"],"priority":"medium","author":"a11y_andy","assignee":"emma_ui","createdAt":"2024-01-19T09:45:00Z","updatedAt":"2024-01-19T09:45:00Z"},
  {"id":33,"title":"Add bulk operations support","description":"Allow users to perform bulk actions like delete, update status on multiple items at once.","status":"open","labels":["enhancement"],"priority":"low","author":"bulk_barry","assignee":"","createdAt":"2024-02-02T10:00:00Z","updatedAt":"2024-02-02T10:00:00Z"},
  {"id":34,"title":"Broken links in documentation","description":"Several links in the documentation are broken or pointing to outdated pages.","status":"closed","labels":["documentation"],"priority":"low","author":"link_larry","assignee":"mike_docs","createdAt":"2024-01-07T13:15:00Z","updatedAt":"2024-01-18T15:00:00Z"},
  {"id":35,"title":"Add comment system for issues","description":"Implement a commenting system so users can discuss and collaborate on issues.","status":"open","labels":["enhancement"],"priority":"high","author":"comment_cathy","assignee":"john_doe","createdAt":"2024-02-03T08:30:00Z","updatedAt":"2024-02-03T08:30:00Z"},
  {"id":36,"title":"Password reset email not received","description":"Users are not receiving password reset emails. Email service might be down or misconfigured.","status":"open","labels":["bug"],"priority":"high","author":"reset_rita","assignee":"security_sam","createdAt":"2024-01-20T15:30:00Z","updatedAt":"2024-01-20T15:30:00Z"},
  {"id":37,"title":"Improve mobile responsiveness","description":"Several pages are not mobile-friendly. Need to improve responsive design across the application.","status":"open","labels":["bug","help wanted"],"priority":"medium","author":"mobile_mike","assignee":"emma_ui","createdAt":"2024-02-04T12:45:00Z","updatedAt":"2024-02-04T12:45:00Z"},
  {"id":38,"title":"Add version control for documents","description":"Implement version history so users can track changes and revert to previous versions.","status":"open","labels":["enhancement"],"priority":"medium","author":"version_vince","assignee":"","createdAt":"2024-01-21T10:15:00Z","updatedAt":"2024-01-21T10:15:00Z"},
  {"id":39,"title":"Fix sorting on data tables","description":"Column sorting doesn't work correctly for numeric and date columns.","status":"open","labels":["bug","good first issue"],"priority":"low","author":"sort_sally","assignee":"","createdAt":"2024-02-05T09:00:00Z","updatedAt":"2024-02-05T09:00:00Z"},
  {"id":40,"title":"Implement activity logging","description":"Add comprehensive activity logs for audit trail and debugging purposes.","status":"open","labels":["enhancement"],"priority":"medium","author":"logger_leo","assignee":"alex_perf","createdAt":"2024-01-22T14:00:00Z","updatedAt":"2024-01-22T14:00:00Z"},
  {"id":41,"title":"Dashboard widgets not loading","description":"Some dashboard widgets fail to load intermittently. Getting CORS errors in console.","status":"open","labels":["bug"],"priority":"high","author":"widget_will","assignee":"john_doe","createdAt":"2024-02-06T11:30:00Z","updatedAt":"2024-02-06T11:30:00Z"},
  {"id":42,"title":"Add role-based access control","description":"Implement RBAC system with different permission levels for users, moderators, and admins.","status":"open","labels":["enhancement"],"priority":"high","author":"rbac_rachel","assignee":"security_sam","createdAt":"2024-01-23T08:45:00Z","updatedAt":"2024-01-23T08:45:00Z"},
  {"id":43,"title":"Create docker deployment guide","description":"Write comprehensive guide for deploying the application using Docker and docker-compose.","status":"closed","labels":["documentation"],"priority":"medium","author":"docker_dave","assignee":"mike_docs","createdAt":"2024-01-06T12:00:00Z","updatedAt":"2024-01-24T16:30:00Z"},
  {"id":44,"title":"Add favorites/bookmarks feature","description":"Allow users to bookmark frequently accessed pages or items for quick access.","status":"open","labels":["enhancement","good first issue"],"priority":"low","author":"fav_frank","assignee":"","createdAt":"2024-02-07T10:30:00Z","updatedAt":"2024-02-07T10:30:00Z"},
  {"id":45,"title":"Search results pagination broken","description":"Pagination controls don't work on search results page. Only first page is accessible.","status":"open","labels":["bug"],"priority":"medium","author":"page_paul","assignee":"emma_ui","createdAt":"2024-01-24T13:45:00Z","updatedAt":"2024-01-24T13:45:00Z"},
  {"id":46,"title":"Implement data backup system","description":"Set up automated daily backups of database with retention policy and restore procedures.","status":"open","labels":["enhancement"],"priority":"high","author":"backup_bruce","assignee":"db_admin","createdAt":"2024-02-08T09:15:00Z","updatedAt":"2024-02-08T09:15:00Z"},
  {"id":47,"title":"Add code syntax highlighting","description":"Implement syntax highlighting for code blocks in comments and descriptions.","status":"open","labels":["enhancement","good first issue"],"priority":"low","author":"syntax_simon","assignee":"","createdAt":"2024-01-25T11:00:00Z","updatedAt":"2024-01-25T11:00:00Z"},
  {"id":48,"title":"Browser console shows warnings","description":"Multiple deprecation warnings appearing in browser console. Need to update deprecated code.","status":"open","labels":["bug"],"priority":"low","author":"console_carol","assignee":"","createdAt":"2024-02-09T14:20:00Z","updatedAt":"2024-02-09T14:20:00Z"},
  {"id":49,"title":"Add Google Analytics integration","description":"Integrate Google Analytics to track user behavior and improve product decisions.","status":"open","labels":["enhancement"],"priority":"medium","author":"analytics_anna","assignee":"john_doe","createdAt":"2024-01-26T10:45:00Z","updatedAt":"2024-01-26T10:45:00Z"},
  {"id":50,"title":"Create automated testing pipeline","description":"Set up CI/CD pipeline with automated tests running on every commit and pull request.","status":"open","labels":["enhancement","help wanted"],"priority":"high","author":"ci_cd_cindy","assignee":"test_tina","createdAt":"2024-02-10T08:00:00Z","updatedAt":"2024-02-10T08:00:00Z"}
];

const state = {
  isAuthenticated: localStorage.getItem(STORAGE_KEY) === 'true',
  issues: [],
  filteredIssues: [],
  activeTab: 'all',
  searchTerm: '',
  loading: false,
  selectedIssue: null,
  error: '',
  source: 'api'
};

const app = document.getElementById('app');

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const capitalize = (text = '') => text ? text.charAt(0).toUpperCase() + text.slice(1) : 'N/A';
const formatDate = (value) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleDateString('en-GB');
};

const tabClass = (tab) => state.activeTab === tab
  ? 'bg-brand text-white shadow-lg shadow-violet-200'
  : 'bg-white text-slate-600 hover:bg-slate-100';

const normalizeIssue = (issue) => ({
  id: issue.id,
  title: issue.title || 'Untitled issue',
  description: issue.description || 'No description provided.',
  status: (issue.status || 'open').toLowerCase(),
  labels: Array.isArray(issue.labels) ? issue.labels : issue.label ? [issue.label] : [],
  priority: (issue.priority || 'medium').toLowerCase(),
  author: issue.author || 'Unknown',
  assignee: issue.assignee || '',
  createdAt: issue.createdAt || issue.created_at || '',
  updatedAt: issue.updatedAt || issue.updated_at || ''
});

const statusDot = (status) => status === 'open'
  ? '<span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500"></span>'
  : '<span class="inline-block h-2.5 w-2.5 rounded-full bg-violet-500"></span>';

const getCounts = (status) => status === 'all'
  ? state.issues.length
  : state.issues.filter((item) => item.status === status).length;

const getVisibleIssues = () => {
  let list = [...state.issues];

  if (state.activeTab !== 'all') {
    list = list.filter((item) => item.status === state.activeTab);
  }

  if (state.searchTerm.trim()) {
    const term = state.searchTerm.toLowerCase();
    list = list.filter((item) => [
      item.title,
      item.description,
      item.author,
      item.assignee,
      item.priority,
      item.status,
      ...(item.labels || [])
    ].join(' ').toLowerCase().includes(term));
  }

  return list;
};

const setFiltered = () => {
  state.filteredIssues = getVisibleIssues();
};

const getPriorityPill = (priority) => {
  const normalized = (priority || '').toLowerCase();
  const map = {
    high: 'bg-rose-100 text-rose-400',
    medium: 'bg-amber-100 text-amber-500',
    low: 'bg-slate-100 text-slate-400'
  };
  return `<span class="rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${map[normalized] || map.medium}">${escapeHtml(normalized || 'medium')}</span>`;
};

const getLabelPill = (label) => {
  const value = (label || '').toLowerCase();
  const map = {
    bug: 'border border-rose-300 bg-rose-50 text-rose-500',
    'help wanted': 'border border-amber-400 bg-amber-50 text-amber-500',
    enhancement: 'border border-emerald-300 bg-emerald-50 text-emerald-500',
    documentation: 'border border-sky-300 bg-sky-50 text-sky-500',
    'good first issue': 'border border-lime-300 bg-lime-50 text-lime-600'
  };
  const icon = value === 'enhancement' ? '✧' : '⊕';
  return `<span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase ${map[value] || 'border border-slate-300 bg-slate-50 text-slate-500'}">${icon} ${escapeHtml(label)}</span>`;
};

const getStatusIcon = (status) => {
  if (status === 'closed') {
    return `
      <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-500">
        <svg viewBox="0 0 20 20" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="10" cy="10" r="7"></circle>
          <path d="M7 10l2 2 4-4"></path>
        </svg>
      </span>`;
  }
  return `
    <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
      <svg viewBox="0 0 20 20" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="10" cy="10" r="7"></circle>
        <circle cx="10" cy="10" r="2" fill="currentColor" stroke="none"></circle>
      </svg>
    </span>`;
};

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

const renderLoading = () => `
  <div class="col-span-full flex min-h-[260px] items-center justify-center rounded-[28px] bg-white shadow-card">
    <div class="text-center">
      <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand/20 border-t-brand"></div>
      <p class="mt-4 text-sm font-medium text-slate-500">Loading issues...</p>
    </div>
  </div>
`;

const renderEmpty = () => `
  <div class="col-span-full rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-card">
    <h3 class="text-xl font-bold text-slate-900">No issues found</h3>
    <p class="mt-2 text-sm text-slate-500">Try a different search term or change the current tab.</p>
  </div>
`;

const renderCard = (issue) => {
  const isOpen = issue.status === 'open';
  const topBorder = isOpen ? 'border-t-emerald-500' : 'border-t-violet-500';

  return `
    <article data-id="${issue.id}" tabindex="0" role="button"
      class="issue-card rounded-[8px] border border-slate-200 border-t-[3px] ${topBorder} bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-brand/10">
      <div class="p-4 pb-3">
        <div class="mb-3 flex items-start justify-between gap-3">
          ${getStatusIcon(issue.status)}
          ${getPriorityPill(issue.priority)}
        </div>

        <h3 class="max-w-[92%] text-[14px] font-semibold leading-6 text-slate-800">${escapeHtml(issue.title)}</h3>
        <p class="mt-2 text-[12px] leading-5 text-slate-400">${escapeHtml(issue.description.slice(0, 78))}${issue.description.length > 78 ? '...' : ''}</p>

        <div class="mt-3 flex flex-wrap gap-2">
          ${(issue.labels || []).length
            ? issue.labels.map(getLabelPill).join('')
            : '<span class="text-xs text-slate-400">No labels</span>'}
        </div>
      </div>

      <div class="border-t border-slate-200 px-4 py-3 text-[12px] text-slate-400">
        <p>#${issue.id} by ${escapeHtml(issue.author)}</p>
        <p class="mt-1">${formatDate(issue.createdAt)}</p>
      </div>
    </article>
  `;
};

const renderModal = () => {
  if (!state.selectedIssue) return '';

  const issue = state.selectedIssue;
  const isOpen = issue.status === 'open';

  const statusBadge = isOpen
    ? `<span class="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">Opened</span>`
    : `<span class="inline-flex items-center rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold text-white">Closed</span>`;

  const priorityMap = {
    high: 'bg-rose-500 text-white',
    medium: 'bg-amber-400 text-white',
    low: 'bg-slate-300 text-slate-700'
  };

  return `
    <div id="issue-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-6">
      <div class="w-full max-w-[670px] rounded-md border-2 border-sky-500 bg-white shadow-2xl">
        <div class="m-6 border border-dashed border-sky-400 p-0">
          <div class="p-7">
            <h2 class="text-[22px] font-extrabold leading-tight text-slate-800">
              ${escapeHtml(issue.title)}
            </h2>

            <div class="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              ${statusBadge}
              <span>•</span>
              <span>Opened by ${escapeHtml(issue.author)}</span>
              <span>•</span>
              <span>${formatDate(issue.createdAt)}</span>
            </div>

            <div class="mt-5 flex flex-wrap gap-2">
              ${(issue.labels || []).length
                ? issue.labels.map((label) => getLabelPill(label)).join('')
                : '<span class="text-sm text-slate-400">No labels</span>'}
            </div>

            <p class="mt-6 text-[15px] leading-7 text-slate-500">
              ${escapeHtml(issue.description)}
            </p>

            <div class="mt-6 grid gap-4 bg-slate-50 p-5 sm:grid-cols-2">
              <div>
                <p class="text-[15px] text-slate-500">Assignee:</p>
                <p class="mt-1 text-[28px] font-bold leading-none text-slate-800 sm:text-[18px]">
                  ${escapeHtml(issue.assignee || 'Unassigned')}
                </p>
              </div>

              <div>
                <p class="text-[15px] text-slate-500">Priority:</p>
                <div class="mt-2">
                  <span class="inline-flex rounded-full px-4 py-1 text-xs font-bold uppercase ${priorityMap[issue.priority] || priorityMap.medium}">
                    ${escapeHtml(issue.priority)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end px-7 pb-7">
            <button
              id="close-modal"
              class="rounded-sm bg-gradient-to-b from-brand to-blue-700 px-4 py-2 text-base font-bold text-white shadow"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
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