/* ===== SkillEarn — Main Application JS ===== */

// ===== SAMPLE DATA =====
const SAMPLE_TASKS = [
  { id:1, title:"Create 3 Instagram Posters for Kirana Shop", category:"design", difficulty:"Easy", budget:"₹150–₹300", desc:"Design 3 eye-catching Instagram posters for a local kirana store. Include product offers and shop branding. Use Canva or Photoshop.", business:"Sharma General Store", deadline:"3 days", skills:["Canva","Photoshop","Design"], status:"open" },
  { id:2, title:"Build Landing Page for Yoga Studio", category:"webdev", difficulty:"Medium", budget:"₹500–₹800", desc:"Create a responsive landing page for a yoga studio with class schedule, pricing, and contact form. HTML/CSS/JS required.", business:"ZenFlow Yoga", deadline:"5 days", skills:["HTML","CSS","JavaScript"], status:"open" },
  { id:3, title:"Write 5 Product Descriptions for Online Store", category:"content", difficulty:"Easy", budget:"₹200–₹400", desc:"Write compelling product descriptions for 5 items in an online fashion store. SEO-optimized, 100-150 words each.", business:"TrendyFit Fashion", deadline:"2 days", skills:["Content Writing","SEO"], status:"open" },
  { id:4, title:"Edit 3 YouTube Thumbnails", category:"design", difficulty:"Easy", budget:"₹100–₹200", desc:"Create 3 attractive YouTube thumbnails for a cooking channel. Bold text, food images, and vibrant colors.", business:"Chef Anita's Kitchen", deadline:"2 days", skills:["Canva","Photoshop"], status:"open" },
  { id:5, title:"Python Data Cleaning Script", category:"python", difficulty:"Medium", budget:"₹400–₹600", desc:"Write a Python script to clean a CSV dataset with 5000 rows. Handle missing values, duplicates, and format standardization.", business:"DataWorks Analytics", deadline:"4 days", skills:["Python","Pandas"], status:"open" },
  { id:6, title:"WhatsApp Catalog Setup for Bakery", category:"data", difficulty:"Easy", budget:"₹150–₹250", desc:"Set up a WhatsApp Business catalog with 30 products including images, descriptions, and prices for a local bakery.", business:"Sweet Bites Bakery", deadline:"3 days", skills:["Data Entry","WhatsApp Business"], status:"open" },
  { id:7, title:"Edit Instagram Reels for Fitness Coach", category:"video", difficulty:"Medium", budget:"₹300–₹500", desc:"Edit 5 short Instagram Reels (15-30 sec each) with transitions, text overlays, and music for a fitness coach.", business:"FitLife Coach", deadline:"4 days", skills:["Video Editing","CapCut"], status:"open" },
  { id:8, title:"Create College PPT on Machine Learning", category:"data", difficulty:"Easy", budget:"₹100–₹200", desc:"Create a 15-slide professional PowerPoint presentation on Machine Learning basics with visuals and animations.", business:"Student Request", deadline:"2 days", skills:["PowerPoint","Research"], status:"open" },
  { id:9, title:"Fix Bugs in React E-commerce Site", category:"webdev", difficulty:"Advanced", budget:"₹800–₹1500", desc:"Debug and fix 5 reported issues in a React e-commerce site. Issues include cart calculation errors and responsive layout bugs.", business:"ShopEasy Tech", deadline:"5 days", skills:["React","JavaScript","CSS"], status:"open" },
  { id:10, title:"Resume Design for 10 Clients", category:"design", difficulty:"Easy", budget:"₹300–₹500", desc:"Design professional resumes for 10 clients using modern templates. Each resume must be unique and ATS-friendly.", business:"CareerBoost Services", deadline:"5 days", skills:["Canva","Design","Typography"], status:"open" },
  { id:11, title:"SEO Blog Articles (3 Posts)", category:"content", difficulty:"Medium", budget:"₹450–₹700", desc:"Write 3 SEO-optimized blog articles (800-1000 words each) about digital marketing trends for 2026.", business:"GrowthHack Digital", deadline:"5 days", skills:["Content Writing","SEO","Research"], status:"open" },
  { id:12, title:"Java Console Application", category:"python", difficulty:"Medium", budget:"₹500–₹800", desc:"Build a Java console-based student management system with CRUD operations using file storage.", business:"EduTech Solutions", deadline:"5 days", skills:["Java","OOP"], status:"open" },
];

const AI_RESPONSES = [
  "Great question! Let me help you with that. 🎯",
  "Here's a step-by-step approach to complete this task:\n\n1. First, understand the requirements carefully\n2. Break the work into smaller pieces\n3. Start with the most important part\n4. Review your work before submitting",
  "💡 Pro tip: Always communicate with the client if you have questions. It's better to ask than to assume!",
  "For design tasks, I recommend:\n• Use consistent colors and fonts\n• Keep it simple and clean\n• Make sure text is readable\n• Test on mobile too!",
  "For web development tasks:\n• Start with HTML structure\n• Add CSS styling next\n• Make it responsive\n• Test in multiple browsers",
  "For content writing:\n• Research the topic thoroughly\n• Use short paragraphs\n• Include relevant keywords naturally\n• Proofread before submitting",
  "You're doing great! 🌟 Remember, every completed task builds your portfolio and reputation. Keep going!",
  "Need more help? Try breaking down the task into smaller milestones. Complete one at a time and you'll be done before you know it! 🚀",
  "That's the right approach! Make sure you also check the task deadline and plan your time accordingly. ⏰",
  "Here are some free tools that might help:\n🎨 Design: Canva, Figma\n💻 Code: VS Code, CodePen\n✍️ Writing: Grammarly, Hemingway\n🎬 Video: CapCut, DaVinci Resolve",
];

// ===== STATE =====
let currentUser = JSON.parse(localStorage.getItem('skillearn_user')) || null;
let allTasks = JSON.parse(localStorage.getItem('skillearn_tasks')) || [...SAMPLE_TASKS];
let userTasks = JSON.parse(localStorage.getItem('skillearn_user_tasks')) || [];
let transactions = JSON.parse(localStorage.getItem('skillearn_transactions')) || [];
let submissions = JSON.parse(localStorage.getItem('skillearn_submissions')) || [];
let portfolio = JSON.parse(localStorage.getItem('skillearn_portfolio')) || [];
let currentRatingTaskId = null;
let selectedRole = 'student';

function saveState() {
  localStorage.setItem('skillearn_tasks', JSON.stringify(allTasks));
  localStorage.setItem('skillearn_user_tasks', JSON.stringify(userTasks));
  localStorage.setItem('skillearn_transactions', JSON.stringify(transactions));
  localStorage.setItem('skillearn_submissions', JSON.stringify(submissions));
  localStorage.setItem('skillearn_portfolio', JSON.stringify(portfolio));
}

// ===== SPA ROUTER =====
function navigateTo(path) { window.location.hash = path; }

function router() {
  const hash = window.location.hash.slice(1) || '/';
  const path = hash.split('?')[0];
  const params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  if (path === '/login') {
    document.getElementById('page-auth').classList.add('active');
    document.getElementById('authLogin').style.display = 'block';
    document.getElementById('authSignup').style.display = 'none';
  } else if (path === '/signup') {
    document.getElementById('page-auth').classList.add('active');
    document.getElementById('authSignup').style.display = 'block';
    document.getElementById('authLogin').style.display = 'none';
    if (params.get('role') === 'business') selectRole('business');
  } else if (path === '/student') {
    if (!currentUser) { navigateTo('/login'); return; }
    document.getElementById('page-student').classList.add('active');
    document.getElementById('studentName').textContent = currentUser.name;
    showStudentTab('overview');
  } else if (path === '/business') {
    if (!currentUser) { navigateTo('/login'); return; }
    document.getElementById('page-business').classList.add('active');
    document.getElementById('businessName').textContent = currentUser.businessName || currentUser.name;
    showBusinessTab('overview');
  } else if (path === '/tasks') {
    document.getElementById('page-tasks').classList.add('active');
    renderPublicTasks('all');
  } else {
    document.getElementById('page-home').classList.add('active');
  }

  updateNavbar();
  window.scrollTo(0, 0);
}

function updateNavbar() {
  const authDiv = document.getElementById('navAuth');
  if (currentUser) {
    const dash = currentUser.role === 'student' ? '/student' : '/business';
    authDiv.innerHTML = `
      <a href="#${dash}" class="btn btn-secondary btn-sm">📊 Dashboard</a>
      <a href="#" onclick="handleLogout()" class="btn btn-primary btn-sm">Log Out</a>
    `;
  } else {
    authDiv.innerHTML = `
      <a href="#/login" class="btn btn-secondary btn-sm">Log In</a>
      <a href="#/signup" class="btn btn-primary btn-sm">Sign Up Free</a>
    `;
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

// ===== AUTH =====
function selectRole(role) {
  selectedRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.role-btn[data-role="${role}"]`).classList.add('active');
  document.getElementById('businessField').style.display = role === 'business' ? 'block' : 'none';
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const businessName = document.getElementById('signupBusiness').value;

  currentUser = { name, email, password, role: selectedRole, businessName, balance: 0, rating: 0, tasksCompleted: 0, joinDate: new Date().toISOString() };
  localStorage.setItem('skillearn_user', JSON.stringify(currentUser));

  navigateTo(selectedRole === 'student' ? '/student' : '/business');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const stored = localStorage.getItem('skillearn_user');
  if (stored) {
    currentUser = JSON.parse(stored);
    navigateTo(currentUser.role === 'student' ? '/student' : '/business');
  } else {
    currentUser = { name: 'Demo User', email, role: 'student', balance: 500, rating: 4.2, tasksCompleted: 3, joinDate: new Date().toISOString() };
    localStorage.setItem('skillearn_user', JSON.stringify(currentUser));
    navigateTo('/student');
  }
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('skillearn_user');
  navigateTo('/');
}

// ===== STUDENT DASHBOARD =====
function showStudentTab(tab) {
  const content = document.getElementById('studentContent');
  document.querySelectorAll('#page-student .sidebar-nav a').forEach(a => a.classList.remove('active'));
  event && event.target && event.target.closest('a') && event.target.closest('a').classList.add('active');

  const balance = currentUser ? currentUser.balance || 0 : 0;
  const completed = userTasks.filter(t => t.status === 'completed').length;
  const active = userTasks.filter(t => t.status === 'in-progress').length;

  switch(tab) {
    case 'overview':
      content.innerHTML = `
        <div class="dash-header"><h1>Welcome back, ${currentUser?.name || 'Student'}! 👋</h1><p>Here's your learning & earning overview</p></div>
        <div class="stats-row">
          <div class="glass-card stat-card"><div class="stat-icon">💰</div><div class="stat-value">₹${balance}</div><div class="stat-label">Total Earnings</div></div>
          <div class="glass-card stat-card"><div class="stat-icon">✅</div><div class="stat-value">${completed}</div><div class="stat-label">Tasks Completed</div></div>
          <div class="glass-card stat-card"><div class="stat-icon">🔄</div><div class="stat-value">${active}</div><div class="stat-label">Active Tasks</div></div>
          <div class="glass-card stat-card"><div class="stat-icon">⭐</div><div class="stat-value">${currentUser?.rating || '0.0'}</div><div class="stat-label">Avg Rating</div></div>
        </div>
        <h2 style="font-size:1.3rem;margin-bottom:16px;">📋 Recent Tasks</h2>
        <div class="task-list">
          ${userTasks.length ? userTasks.slice(0,5).map(t => `
            <div class="glass-card task-card">
              <div class="task-info">
                <h3>${t.title}</h3>
                <p>${t.desc ? t.desc.slice(0,80)+'...' : ''}</p>
                <div class="task-meta">
                  <span class="badge badge-${t.status==='completed'?'green':t.status==='in-progress'?'amber':'blue'}">${t.status}</span>
                  <span class="task-budget">${t.budget}</span>
                </div>
              </div>
              ${t.status==='in-progress' ? '<button class="btn btn-primary btn-sm" onclick="submitTask('+t.id+')">Submit Work</button>' : ''}
            </div>
          `).join('') : '<div class="empty-state"><div class="empty-icon">📋</div><h3>No tasks yet</h3><p>Browse tasks and start earning!</p><a href="#/tasks" class="btn btn-primary" style="margin-top:16px;">Browse Tasks</a></div>'}
        </div>
      `;
      break;

    case 'mytasks':
      content.innerHTML = `
        <div class="dash-header"><h1>My Tasks 📋</h1><p>Track and manage your accepted tasks</p></div>
        <div class="task-list">
          ${userTasks.length ? userTasks.map(t => `
            <div class="glass-card task-card">
              <div class="task-info">
                <h3>${t.title}</h3>
                <p>${t.desc ? t.desc.slice(0,100)+'...' : ''}</p>
                <div class="task-meta">
                  <span class="badge badge-${t.status==='completed'?'green':t.status==='in-progress'?'amber':'blue'}">${t.status}</span>
                  <span class="task-budget">${t.budget}</span>
                  <span style="color:var(--text-muted);font-size:0.8rem;">⏰ ${t.deadline}</span>
                </div>
              </div>
              <div class="task-actions">
                ${t.status==='in-progress' ? '<button class="btn btn-primary btn-sm" onclick="submitTask('+t.id+')">Submit</button>' : ''}
                ${t.status==='completed' ? '<span class="badge badge-green">✅ Done</span>' : ''}
              </div>
            </div>
          `).join('') : '<div class="empty-state"><div class="empty-icon">📋</div><h3>No tasks yet</h3><p>Browse and accept tasks to get started</p><a href="#/tasks" class="btn btn-primary" style="margin-top:16px;">Browse Tasks</a></div>'}
        </div>
      `;
      break;

    case 'browse':
      renderStudentBrowse(content);
      break;

    case 'portfolio':
      content.innerHTML = `
        <div class="dash-header"><h1>My Portfolio 📁</h1><p>Showcase your completed work</p></div>
        <div class="portfolio-grid">
          ${portfolio.length ? portfolio.map(p => `
            <div class="portfolio-item">
              <div class="portfolio-img">${getCategoryIcon(p.category)}</div>
              <div class="portfolio-info">
                <h4>${p.title}</h4>
                <p>${p.category} • ⭐ ${p.rating || 'N/A'}</p>
              </div>
            </div>
          `).join('') : `
            ${userTasks.filter(t=>t.status==='completed').length ? userTasks.filter(t=>t.status==='completed').map(t => `
              <div class="portfolio-item">
                <div class="portfolio-img">${getCategoryIcon(t.category)}</div>
                <div class="portfolio-info"><h4>${t.title}</h4><p>${t.category} • Completed</p></div>
              </div>
            `).join('') : '<div class="empty-state" style="grid-column:1/-1;"><div class="empty-icon">📁</div><h3>Portfolio is empty</h3><p>Complete tasks to build your portfolio</p></div>'}
          `}
        </div>
      `;
      break;

    case 'wallet':
      renderWallet(content);
      break;

    case 'aimentor':
      renderAIMentor(content);
      break;

    case 'certificates':
      const certs = userTasks.filter(t => t.status === 'completed');
      content.innerHTML = `
        <div class="dash-header"><h1>My Certificates 🎓</h1><p>Certificates earned from completed skill paths</p></div>
        <div class="grid-3">
          ${certs.length ? certs.map((t, i) => `
            <div class="glass-card" style="text-align:center;padding:32px;">
              <div style="font-size:3rem;margin-bottom:12px;">🏆</div>
              <h3 style="font-size:1rem;margin-bottom:8px;">Certificate of Completion</h3>
              <p style="color:var(--accent-3);font-weight:600;margin-bottom:4px;">${t.title}</p>
              <p style="color:var(--text-muted);font-size:0.8rem;">Issued ${new Date().toLocaleDateString()}</p>
              <p style="color:var(--text-muted);font-size:0.8rem;">ID: SKLE-${1000+i}</p>
            </div>
          `).join('') : '<div class="empty-state" style="grid-column:1/-1;"><div class="empty-icon">🎓</div><h3>No certificates yet</h3><p>Complete tasks and skill paths to earn certificates</p></div>'}
        </div>
      `;
      break;
  }
}

function renderStudentBrowse(content) {
  const open = allTasks.filter(t => t.status === 'open');
  content.innerHTML = `
    <div class="dash-header"><h1>Browse Tasks 🔍</h1><p>Find tasks matching your skills</p></div>
    <div class="browse-filters" style="border:none;padding:0 0 20px;">
      <button class="filter-chip active" onclick="filterDashTasks('all',this)">All</button>
      <button class="filter-chip" onclick="filterDashTasks('design',this)">🎨 Design</button>
      <button class="filter-chip" onclick="filterDashTasks('webdev',this)">🌐 Web Dev</button>
      <button class="filter-chip" onclick="filterDashTasks('content',this)">✍️ Content</button>
      <button class="filter-chip" onclick="filterDashTasks('video',this)">🎬 Video</button>
      <button class="filter-chip" onclick="filterDashTasks('data',this)">📊 Data</button>
      <button class="filter-chip" onclick="filterDashTasks('python',this)">🐍 Python</button>
    </div>
    <div class="tasks-grid" id="dashTaskGrid">
      ${renderTaskCards(open)}
    </div>
  `;
}

function renderTaskCards(tasks) {
  return tasks.map(t => `
    <div class="glass-card task-grid-card" onclick="openTaskModal(${t.id})">
      <div class="flex justify-between items-center" style="margin-bottom:12px;">
        <span class="badge badge-${t.difficulty==='Easy'?'green':t.difficulty==='Medium'?'amber':'purple'}">${t.difficulty}</span>
        <span style="font-size:0.8rem;color:var(--text-muted);">⏰ ${t.deadline}</span>
      </div>
      <h3>${t.title}</h3>
      <p class="task-desc">${t.desc}</p>
      <div class="task-footer">
        <div class="flex gap-1" style="flex-wrap:wrap;">
          ${t.skills.slice(0,3).map(s => `<span class="badge badge-blue">${s}</span>`).join('')}
        </div>
        <span class="task-budget">${t.budget}</span>
      </div>
    </div>
  `).join('');
}

// ===== BUSINESS DASHBOARD =====
function showBusinessTab(tab) {
  const content = document.getElementById('businessContent');
  document.querySelectorAll('#page-business .sidebar-nav a').forEach(a => a.classList.remove('active'));
  event && event.target && event.target.closest('a') && event.target.closest('a').classList.add('active');

  const myPosted = allTasks.filter(t => t.business === (currentUser?.businessName || currentUser?.name));
  const totalSpent = submissions.filter(s => s.status === 'approved').reduce((a,s) => a + (s.payment || 0), 0);

  switch(tab) {
    case 'overview':
      content.innerHTML = `
        <div class="dash-header"><h1>Business Dashboard 💼</h1><p>Manage your tasks and find talent</p></div>
        <div class="stats-row">
          <div class="glass-card stat-card"><div class="stat-icon">📋</div><div class="stat-value">${myPosted.length}</div><div class="stat-label">Tasks Posted</div></div>
          <div class="glass-card stat-card"><div class="stat-icon">📥</div><div class="stat-value">${submissions.length}</div><div class="stat-label">Submissions</div></div>
          <div class="glass-card stat-card"><div class="stat-icon">💸</div><div class="stat-value">₹${totalSpent}</div><div class="stat-label">Total Spent</div></div>
          <div class="glass-card stat-card"><div class="stat-icon">⭐</div><div class="stat-value">4.8</div><div class="stat-label">Avg Rating</div></div>
        </div>
        <h2 style="font-size:1.3rem;margin-bottom:16px;">Recent Submissions</h2>
        ${submissions.length ? submissions.slice(0,3).map(s => `
          <div class="glass-card submission-card">
            <div class="sub-header"><h3>${s.taskTitle}</h3><span class="badge badge-${s.status==='approved'?'green':s.status==='rejected'?'red':'amber'}">${s.status}</span></div>
            <div class="sub-body"><p>Submitted by: ${s.student} • ${s.notes || 'No notes'}</p></div>
          </div>
        `).join('') : '<div class="empty-state"><div class="empty-icon">📥</div><h3>No submissions yet</h3><p>Post tasks to start receiving submissions</p></div>'}
      `;
      break;

    case 'posttask':
      content.innerHTML = `
        <div class="dash-header"><h1>Post a New Task ➕</h1><p>Describe the work you need done</p></div>
        <form class="post-task-form" onsubmit="handlePostTask(event)">
          <div class="form-group"><label>Task Title</label><input type="text" id="taskTitle" placeholder="e.g. Create Instagram posters for my shop" required></div>
          <div class="form-group"><label>Category</label>
            <select id="taskCategory" required>
              <option value="">Select category</option>
              <option value="design">🎨 Graphic Design</option>
              <option value="webdev">🌐 Web Development</option>
              <option value="content">✍️ Content Writing</option>
              <option value="video">🎬 Video Editing</option>
              <option value="data">📊 Data Entry</option>
              <option value="python">🐍 Python/Java</option>
            </select>
          </div>
          <div class="form-group"><label>Description</label><textarea id="taskDesc" placeholder="Describe the task in detail..." required></textarea></div>
          <div class="grid-2">
            <div class="form-group"><label>Budget (₹)</label><input type="text" id="taskBudget" placeholder="e.g. ₹200-₹400" required></div>
            <div class="form-group"><label>Deadline</label><input type="text" id="taskDeadline" placeholder="e.g. 3 days" required></div>
          </div>
          <div class="form-group"><label>Required Skills (comma separated)</label><input type="text" id="taskSkills" placeholder="e.g. Canva, Photoshop, Design"></div>
          <div class="form-group"><label>Difficulty</label>
            <select id="taskDifficulty">
              <option value="Easy">Easy — Micro Task</option>
              <option value="Medium">Medium — Skill Task</option>
              <option value="Advanced">Advanced — Internship Level</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-lg">📋 Post Task</button>
        </form>
      `;
      break;

    case 'mytasks':
      content.innerHTML = `
        <div class="dash-header"><h1>My Posted Tasks 📋</h1><p>Tasks you've posted for students</p></div>
        <div class="task-list">
          ${myPosted.length ? myPosted.map(t => `
            <div class="glass-card task-card">
              <div class="task-info">
                <h3>${t.title}</h3>
                <div class="task-meta">
                  <span class="badge badge-${t.status==='open'?'green':t.status==='assigned'?'amber':'blue'}">${t.status}</span>
                  <span class="task-budget">${t.budget}</span>
                  <span style="color:var(--text-muted);font-size:0.8rem;">${t.difficulty}</span>
                </div>
              </div>
            </div>
          `).join('') : '<div class="empty-state"><div class="empty-icon">📋</div><h3>No tasks posted yet</h3><p>Post your first task and find talent!</p><button class="btn btn-primary" onclick="showBusinessTab(\'posttask\')" style="margin-top:16px;">Post a Task</button></div>'}
        </div>
      `;
      break;

    case 'submissions':
      content.innerHTML = `
        <div class="dash-header"><h1>Review Submissions 📥</h1><p>Review and approve student work</p></div>
        ${submissions.length ? submissions.map(s => `
          <div class="glass-card submission-card">
            <div class="sub-header">
              <h3>${s.taskTitle}</h3>
              <span class="badge badge-${s.status==='approved'?'green':s.status==='rejected'?'red':'amber'}">${s.status}</span>
            </div>
            <div class="sub-body">
              <p><strong>Student:</strong> ${s.student}</p>
              <p>${s.notes || 'No notes provided'}</p>
            </div>
            ${s.status==='pending' ? `
              <div class="sub-actions">
                <button class="btn btn-primary btn-sm" onclick="approveSubmission(${s.id})">✅ Approve</button>
                <button class="btn btn-secondary btn-sm" onclick="rejectSubmission(${s.id})">❌ Reject</button>
              </div>
            ` : ''}
          </div>
        `).join('') : '<div class="empty-state"><div class="empty-icon">📥</div><h3>No submissions yet</h3><p>Students will submit work here for your review</p></div>'}
      `;
      break;

    case 'payments':
      content.innerHTML = `
        <div class="dash-header"><h1>Payments 💳</h1><p>Track your spending and escrow</p></div>
        <div class="stats-row" style="grid-template-columns:repeat(3,1fr);">
          <div class="glass-card stat-card"><div class="stat-icon">💸</div><div class="stat-value">₹${totalSpent}</div><div class="stat-label">Total Paid</div></div>
          <div class="glass-card stat-card"><div class="stat-icon">🔒</div><div class="stat-value">₹0</div><div class="stat-label">In Escrow</div></div>
          <div class="glass-card stat-card"><div class="stat-icon">📋</div><div class="stat-value">${submissions.filter(s=>s.status==='approved').length}</div><div class="stat-label">Completed Payments</div></div>
        </div>
        <h2 style="font-size:1.3rem;margin-bottom:16px;">Payment History</h2>
        <div class="transaction-list">
          ${submissions.filter(s=>s.status==='approved').length ? submissions.filter(s=>s.status==='approved').map(s => `
            <div class="transaction-item">
              <div class="tx-info"><h4>${s.taskTitle}</h4><p>Paid to ${s.student}</p></div>
              <span class="tx-amount debit">-₹${s.payment || 0}</span>
            </div>
          `).join('') : '<div class="empty-state"><div class="empty-icon">💳</div><h3>No payments yet</h3><p>Payments will appear here after approving submissions</p></div>'}
        </div>
      `;
      break;
  }
}

function handlePostTask(e) {
  e.preventDefault();
  const task = {
    id: allTasks.length + 1,
    title: document.getElementById('taskTitle').value,
    category: document.getElementById('taskCategory').value,
    desc: document.getElementById('taskDesc').value,
    budget: document.getElementById('taskBudget').value,
    deadline: document.getElementById('taskDeadline').value,
    skills: document.getElementById('taskSkills').value.split(',').map(s => s.trim()).filter(Boolean),
    difficulty: document.getElementById('taskDifficulty').value,
    business: currentUser?.businessName || currentUser?.name || 'Business',
    status: 'open'
  };
  allTasks.push(task);
  saveState();
  showBusinessTab('mytasks');
}

function approveSubmission(id) {
  const sub = submissions.find(s => s.id === id);
  if (sub) {
    sub.status = 'approved';
    sub.payment = parseInt(sub.budget) || 300;
    if (currentUser) {
      // Add earnings to student (simulated)
    }
    saveState();
    showBusinessTab('submissions');
  }
}

function rejectSubmission(id) {
  const sub = submissions.find(s => s.id === id);
  if (sub) { sub.status = 'rejected'; saveState(); showBusinessTab('submissions'); }
}

// ===== TASK BROWSING & DETAIL =====
function renderPublicTasks(cat) {
  const grid = document.getElementById('publicTaskGrid');
  const filtered = cat === 'all' ? allTasks.filter(t=>t.status==='open') : allTasks.filter(t => t.category === cat && t.status === 'open');
  grid.innerHTML = filtered.length ? renderTaskCards(filtered) : '<div class="empty-state" style="grid-column:1/-1;"><div class="empty-icon">🔍</div><h3>No tasks found</h3><p>Try a different category</p></div>';
}

function filterTasks(cat) {
  document.querySelectorAll('#taskFilters .filter-chip').forEach(c => c.classList.remove('active'));
  document.querySelector(`#taskFilters .filter-chip[data-cat="${cat}"]`).classList.add('active');
  renderPublicTasks(cat);
}

function filterDashTasks(cat, btn) {
  const grid = document.getElementById('dashTaskGrid');
  const filtered = cat === 'all' ? allTasks.filter(t=>t.status==='open') : allTasks.filter(t => t.category === cat && t.status === 'open');
  grid.innerHTML = filtered.length ? renderTaskCards(filtered) : '<div class="empty-state" style="grid-column:1/-1;"><div class="empty-icon">🔍</div><h3>No tasks in this category</h3></div>';
  btn.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
}

function openTaskModal(id) {
  const task = allTasks.find(t => t.id === id);
  if (!task) return;
  document.getElementById('modalTaskTitle').textContent = task.title;
  document.getElementById('modalTaskBody').innerHTML = `
    <div class="flex gap-2" style="margin-bottom:16px;flex-wrap:wrap;">
      <span class="badge badge-${task.difficulty==='Easy'?'green':task.difficulty==='Medium'?'amber':'purple'}">${task.difficulty}</span>
      <span class="badge badge-blue">${task.category}</span>
    </div>
    <p style="color:var(--text-secondary);margin-bottom:20px;">${task.desc}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
      <div class="glass-card" style="padding:16px;"><p style="color:var(--text-muted);font-size:0.8rem;">Budget</p><p style="font-weight:700;color:var(--green-light);">${task.budget}</p></div>
      <div class="glass-card" style="padding:16px;"><p style="color:var(--text-muted);font-size:0.8rem;">Deadline</p><p style="font-weight:700;">⏰ ${task.deadline}</p></div>
    </div>
    <p style="margin-bottom:8px;font-weight:600;">Required Skills</p>
    <div class="flex gap-1" style="flex-wrap:wrap;margin-bottom:20px;">
      ${task.skills.map(s => `<span class="badge badge-purple">${s}</span>`).join('')}
    </div>
    <p style="margin-bottom:16px;color:var(--text-secondary);font-size:0.9rem;">📍 Posted by: <strong>${task.business}</strong></p>
    ${currentUser && currentUser.role === 'student' ? `<button class="btn btn-primary btn-block btn-lg" onclick="acceptTask(${task.id})">🚀 Accept This Task</button>` : currentUser ? '' : `<a href="#/signup" class="btn btn-primary btn-block btn-lg" onclick="closeModal()">Sign Up to Accept Tasks</a>`}
  `;
  document.getElementById('taskModal').classList.remove('hidden');
}

function closeModal() { document.getElementById('taskModal').classList.add('hidden'); }

function acceptTask(id) {
  const task = allTasks.find(t => t.id === id);
  if (!task) return;
  const alreadyAccepted = userTasks.find(t => t.id === id);
  if (alreadyAccepted) { closeModal(); navigateTo('/student'); return; }
  const myTask = { ...task, status: 'in-progress', acceptedDate: new Date().toISOString() };
  userTasks.push(myTask);
  task.status = 'assigned';
  saveState();
  closeModal();
  navigateTo('/student');
}

function submitTask(id) {
  const task = userTasks.find(t => t.id === id);
  if (!task) return;
  task.status = 'completed';
  const payment = parseInt(task.budget?.replace(/[^0-9]/g,'')) || 300;
  if (currentUser) { currentUser.balance = (currentUser.balance || 0) + payment; currentUser.tasksCompleted = (currentUser.tasksCompleted || 0) + 1; localStorage.setItem('skillearn_user', JSON.stringify(currentUser)); }
  transactions.push({ id: transactions.length+1, type:'credit', amount: payment, desc: task.title, date: new Date().toISOString() });
  submissions.push({ id: submissions.length+1, taskId: id, taskTitle: task.title, student: currentUser?.name || 'Student', notes:'Work completed as requested.', status:'pending', budget: task.budget, payment });
  saveState();
  currentRatingTaskId = id;
  document.getElementById('ratingModal').classList.remove('hidden');
}

// ===== WALLET =====
function renderWallet(content) {
  const balance = currentUser ? currentUser.balance || 0 : 0;
  const pending = transactions.filter(t => t.type === 'pending').reduce((a,t) => a + t.amount, 0);
  content.innerHTML = `
    <div class="dash-header"><h1>My Wallet 💰</h1><p>Track your earnings and request payouts</p></div>
    <div class="glass-card wallet-balance">
      <h3>Available Balance</h3>
      <div class="balance-amount">₹${balance}</div>
      <div class="balance-sub">${pending ? `₹${pending} pending` : 'All earnings available'}</div>
      <button class="btn btn-amber" style="margin-top:20px;" onclick="requestPayout()">💸 Request Payout</button>
    </div>
    <h2 style="font-size:1.3rem;margin-bottom:16px;">Transaction History</h2>
    <div class="transaction-list">
      ${transactions.length ? transactions.map(t => `
        <div class="transaction-item">
          <div class="tx-info"><h4>${t.desc}</h4><p>${new Date(t.date).toLocaleDateString()}</p></div>
          <span class="tx-amount ${t.type==='credit'?'credit':'debit'}">${t.type==='credit'?'+':'-'}₹${t.amount}</span>
        </div>
      `).join('') : '<div class="empty-state"><div class="empty-icon">💰</div><h3>No transactions yet</h3><p>Complete tasks to start earning</p></div>'}
    </div>
  `;
}

function requestPayout() {
  if (!currentUser || currentUser.balance <= 0) { alert('No balance available for payout.'); return; }
  alert(`Payout of ₹${currentUser.balance} requested! You'll receive it within 2-3 business days via UPI/Bank transfer.`);
  transactions.push({ id: transactions.length+1, type:'debit', amount: currentUser.balance, desc:'Payout requested', date: new Date().toISOString() });
  currentUser.balance = 0;
  localStorage.setItem('skillearn_user', JSON.stringify(currentUser));
  saveState();
  showStudentTab('wallet');
}

// ===== AI MENTOR =====
function renderAIMentor(content) {
  content.innerHTML = `
    <div class="dash-header"><h1>AI Mentor 🤖</h1><p>Your personal guide for tasks and skills</p></div>
    <div class="chat-container">
      <div class="chat-messages" id="chatMessages">
        <div class="chat-bubble ai">
          <div class="ai-label">🤖 AI Mentor</div>
          Hey ${currentUser?.name || 'there'}! 👋 I'm your AI Mentor. I can help you with:
          <br><br>
          🎯 Task guidance & tips<br>
          📚 Skill recommendations<br>
          💡 How to improve your work<br>
          🔍 Finding the right tasks for you<br>
          <br>
          What would you like help with today?
        </div>
      </div>
      <div class="chat-input-area">
        <input type="text" id="chatInput" placeholder="Ask your AI Mentor anything..." onkeypress="if(event.key==='Enter')sendChat()">
        <button class="btn btn-primary" onclick="sendChat()">➤</button>
      </div>
    </div>
  `;
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  const messages = document.getElementById('chatMessages');
  messages.innerHTML += `<div class="chat-bubble user">${msg}</div>`;
  input.value = '';
  messages.innerHTML += `<div class="chat-bubble ai" id="typingBubble"><div class="ai-label">🤖 AI Mentor</div><div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const response = getAIResponse(msg);
    const typing = document.getElementById('typingBubble');
    if (typing) typing.outerHTML = `<div class="chat-bubble ai"><div class="ai-label">🤖 AI Mentor</div>${response}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 1000 + Math.random() * 1500);
}

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('design') || lower.includes('poster') || lower.includes('canva'))
    return "For design tasks, I recommend:<br><br>🎨 Use <strong>Canva</strong> (free) for quick designs<br>📐 Keep your layouts clean and aligned<br>🎯 Use max 2-3 fonts<br>🖼️ Use high-quality images from Unsplash/Pexels<br>🌈 Stick to a consistent color palette<br><br>Would you like specific tips for any task?";
  if (lower.includes('web') || lower.includes('html') || lower.includes('css') || lower.includes('code'))
    return "For web development tasks:<br><br>💻 Start with HTML structure first<br>🎨 Add CSS styling and make it responsive<br>⚡ Use VS Code with Live Server extension<br>📱 Always test on mobile viewport<br>🔍 Check your code in Chrome DevTools<br><br>Pro tip: Use Flexbox and Grid for layouts!";
  if (lower.includes('earn') || lower.includes('money') || lower.includes('payment'))
    return "Here's how to maximize your earnings:<br><br>1️⃣ Start with Easy tasks to build ratings<br>2️⃣ Complete tasks on time (earns bonus trust)<br>3️⃣ Build a strong portfolio<br>4️⃣ Move to Medium tasks for higher pay<br>5️⃣ Take consistent tasks weekly<br><br>Top earners make ₹5,000-₹15,000/month! 💰";
  if (lower.includes('help') || lower.includes('how') || lower.includes('start'))
    return "Here's how to get started:<br><br>1️⃣ Browse tasks in your skill area<br>2️⃣ Start with <strong>Easy</strong> difficulty tasks<br>3️⃣ Read the task description carefully<br>4️⃣ Accept and complete within the deadline<br>5️⃣ Submit your work and get paid!<br><br>I'll guide you step-by-step on any task. Just ask! 🚀";
  if (lower.includes('skill') || lower.includes('learn'))
    return "Popular skill paths right now:<br><br>🎨 <strong>Graphic Design</strong> — Fastest to earn (7 days)<br>🌐 <strong>Web Development</strong> — Highest pay tasks<br>✍️ <strong>Content Writing</strong> — Most tasks available<br>🎬 <strong>Video Editing</strong> — Growing demand<br>🐍 <strong>Python</strong> — Best for data tasks<br><br>I recommend starting with Design or Content — quickest path to earning! 💡";
  return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
}

// ===== RATING =====
let currentRating = 0;
function setRating(v) {
  currentRating = v;
  document.querySelectorAll('#starRating .star').forEach((s, i) => { s.classList.toggle('active', i < v); });
}

function submitRating() {
  if (currentRating === 0) { alert('Please select a rating'); return; }
  if (currentUser) { currentUser.rating = ((currentUser.rating || 0) * 0.7 + currentRating * 0.3).toFixed(1); localStorage.setItem('skillearn_user', JSON.stringify(currentUser)); }
  document.getElementById('ratingModal').classList.add('hidden');
  currentRating = 0;
  showStudentTab('overview');
}

function closeRatingModal() { document.getElementById('ratingModal').classList.add('hidden'); }

// ===== HELPERS =====
function getCategoryIcon(cat) {
  const icons = { design:'🎨', webdev:'🌐', content:'✍️', video:'🎬', data:'📊', python:'🐍', java:'☕', ai:'🧠' };
  return icons[cat] || '📋';
}

function toggleMobileMenu() {
  const links = document.getElementById('navLinks');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
}

// Close modals on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeModal(); closeRatingModal(); }
});

// Close modal on overlay click
document.getElementById('taskModal').addEventListener('click', (e) => { if (e.target.classList.contains('modal-overlay')) closeModal(); });
document.getElementById('ratingModal').addEventListener('click', (e) => { if (e.target.classList.contains('modal-overlay')) closeRatingModal(); });
