# TaskFlow — Modern Task Management Application

A modern, responsive, and feature-rich Task Management application built exclusively with **React**, **Tailwind CSS**, and **local state**.

---

## ✨ Features

- 📊 **Dashboard & Statistics**: Real-time KPI metric cards (Total, In Progress, To Do, Completed, Urgent & High, Overdue) with completion rate velocity and priority distribution bars.
- 📋 **Board & List Views**:
  - **Kanban Board**: Drag/move tasks across pipeline columns (*To Do*, *In Progress*, *In Review*, *Completed*).
  - **List Table View**: Structured rows with one-click completion checkboxes, status dropdowns, priority badges, and quick actions.
- 🎯 **Priority Levels**: Color-coded badges for **Urgent**, **High**, **Medium**, and **Low** priorities.
- 🔍 **Search & Multi-Dimensional Filters**:
  - Instant real-time search across task titles, descriptions, categories, and assignees.
  - Filter pills for statuses with live counts.
  - Department / Category filtering (*Frontend*, *Backend*, *Design*, *DevOps*, *Marketing*, *Product*).
  - Multi-criteria sorting (Due date, Priority level, Creation date, Title A-Z).
- ✍️ **Add & Edit Task Modal**:
  - Form validation with error alerts.
  - Title, description, status, priority, department, and team member assignee selector.
  - Due date picker with quick presets (*Today*, *Tomorrow*, *In 1 Week*).
  - Interactive **Checklist / Subtasks** manager (add, toggle, remove subtasks).
- 👁️ **Task Details Modal**: Click any task to inspect details, check off subtasks, switch status, or edit.
- 🔔 **Toast Notifications & Confirmation Modals**: Non-intrusive feedback toasts for task creations, updates, completions, and deletions.
- 🌓 **Dark Mode**: Seamless toggle between sleek light and dark SaaS themes.
- 📱 **Responsive & Mobile-Ready**: Collapsible sidebar with slide-over mobile drawer and touch-friendly controls.
- 💾 **Local State**: Pure React state management with zero external backend or database dependencies, plus demo data reset functionality.

---

## 🚀 Getting Started

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open your browser at the URL shown in the terminal (usually `http://localhost:5173`).

---

## 🏗️ Architecture & Component Structure

```
frontend/src/
├── components/
│   ├── common/
│   │   ├── Avatar.jsx        # User avatars & groups with initials & colors
│   │   ├── Badge.jsx         # Status, Priority, & Category badges
│   │   ├── Button.jsx        # Reusable button variants (primary, subtle, danger, ghost)
│   │   ├── EmptyState.jsx    # Clean zero-data placeholder with actions
│   │   ├── Modal.jsx         # Accessible modal backdrop & dialog wrapper
│   │   └── Toast.jsx         # Floating action alerts
│   ├── dashboard/
│   │   ├── AnalyticsOverview.jsx # Velocity progress bar & priority charts
│   │   └── StatCards.jsx     # Interactive KPI summary cards
│   ├── icons/
│   │   └── Icons.jsx         # Self-contained SVG icon library
│   ├── layout/
│   │   ├── MobileNav.jsx     # Slide-over mobile drawer
│   │   ├── Navbar.jsx        # Sticky top header with actions & dark mode
│   │   └── Sidebar.jsx       # Pipeline navigation & department categories
│   └── tasks/
│       ├── ConfirmModal.jsx      # Confirmation dialog for deletes/resets
│       ├── TaskBoard.jsx         # Kanban columns view
│       ├── TaskCard.jsx          # Interactive card for Kanban board
│       ├── TaskDetailsModal.jsx  # Task inspection & checklist drawer
│       ├── TaskFilterBar.jsx     # Search, filter pills, sorting, view switch
│       ├── TaskFormModal.jsx     # Add / Edit task form with subtasks
│       └── TaskList.jsx          # Structured table / list rows
├── data/
│   └── mockTasks.js          # Realistic mock dataset (categories, users, tasks)
├── hooks/
│   └── useTaskManager.js     # Central state management hook (CRUD, filtering, stats)
├── utils/
│   └── constants.js          # Status & priority definitions, date helpers
├── App.jsx                   # Main application layout & integration
└── index.css                 # Tailwind CSS v4 styling & theme configuration
```
