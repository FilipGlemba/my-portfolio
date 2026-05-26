const STORAGE_KEY = 'task-studio-tasks';
const THEME_KEY = 'task-studio-theme';
const LANG_KEY = 'task-studio-lang';

/*
  Translation dictionary.
  Every static label, button, placeholder, and status message is stored here so
  language switching can update the interface without duplicating markup.
*/
const translations = {
  sk: {
    htmlLang: 'sk',
    portfolio: 'Portfolio',
    language: 'EN',
    heroEyebrow: 'Osobná produktivita',
    heroTitle: 'Naplánuj každý deň s fokusom.',
    heroCopy: 'Prepracovaný správca úloh pre priority, termíny, poznámky a rýchle denné plánovanie.',
    total: 'Spolu',
    open: 'Otvorené',
    done: 'Hotovo',
    composerKicker: 'Nová úloha',
    composerTitle: 'Zachyť, čo je dôležité',
    saved: 'Uložené lokálne',
    titleLabel: 'Názov úlohy',
    titlePlaceholder: 'Navrhnúť case study projektu',
    dueLabel: 'Termín',
    priorityLabel: 'Priorita',
    notesLabel: 'Poznámky',
    notesPlaceholder: 'Pridaj kontext, linky alebo kritériá dokončenia',
    addTask: 'Pridať úlohu',
    updateTask: 'Uložiť zmeny',
    cancelEdit: 'Zrušiť úpravu',
    searchPlaceholder: 'Hľadať úlohy...',
    filterAll: 'Všetky',
    filterOpen: 'Otvorené',
    filterToday: 'Dnes',
    filterDone: 'Hotovo',
    export: 'Export',
    import: 'Import',
    clearDone: 'Vymazať hotové',
    boardKicker: 'Prehľad úloh',
    boardTitle: 'Dnes a najbližšie',
    sortManual: 'Vlastné poradie',
    sortSmart: 'Inteligentne',
    sortDue: 'Termín',
    sortPriority: 'Priorita',
    sortCreated: 'Najnovšie',
    progress: 'Progres',
    progressText: '{done} z {total} hotové',
    emptyTitle: 'Žiadne úlohy',
    emptyCopy: 'Pridaj úlohu alebo zmeň filter.',
    footer: 'Postavené na HTML, CSS a JavaScripte.',
    high: 'Vysoká',
    medium: 'Stredná',
    low: 'Nízka',
    noDue: 'Bez termínu',
    dueToday: 'Dnes',
    overdue: 'Po termíne',
    duePrefix: 'Termín',
    createdPrefix: 'Vytvorené',
    edit: 'Upraviť úlohu',
    delete: 'Vymazať úlohu',
    complete: 'Označiť ako hotové',
    reopen: 'Znovu otvoriť úlohu',
    imported: 'Import hotový',
    importError: 'Neplatný JSON súbor',
    cleared: 'Hotové úlohy vymazané',
    drag: 'Presunúť úlohu',
    reordered: 'Poradie uložené',
    confirmKicker: 'Potvrdenie',
    confirmDeleteTitle: 'Vymazať túto úlohu?',
    confirmDeleteCopy: 'Táto akcia sa nedá vrátiť späť. Úloha sa odstráni z lokálneho zoznamu.',
    confirmClearTitle: 'Vymazať hotové úlohy?',
    confirmClearCopy: 'Všetky dokončené úlohy sa odstránia z lokálneho zoznamu.',
    confirmCancel: 'Zrušiť',
    confirmDelete: 'Vymazať'
  },
  en: {
    htmlLang: 'en',
    portfolio: 'Portfolio',
    language: 'SK',
    heroEyebrow: 'Personal productivity',
    heroTitle: 'Plan the day with focus.',
    heroCopy: 'A polished task manager for daily priorities, deadlines, notes, and quick planning.',
    total: 'Total',
    open: 'Open',
    done: 'Done',
    composerKicker: 'New task',
    composerTitle: 'Capture what matters',
    saved: 'Saved locally',
    titleLabel: 'Task title',
    titlePlaceholder: 'Design project case study',
    dueLabel: 'Due date',
    priorityLabel: 'Priority',
    notesLabel: 'Notes',
    notesPlaceholder: 'Add context, links, or acceptance criteria',
    addTask: 'Add task',
    updateTask: 'Save changes',
    cancelEdit: 'Cancel edit',
    searchPlaceholder: 'Search tasks...',
    filterAll: 'All',
    filterOpen: 'Open',
    filterToday: 'Today',
    filterDone: 'Done',
    export: 'Export',
    import: 'Import',
    clearDone: 'Clear done',
    boardKicker: 'Task board',
    boardTitle: 'Today and next',
    sortManual: 'Custom order',
    sortSmart: 'Smart sort',
    sortDue: 'Due date',
    sortPriority: 'Priority',
    sortCreated: 'Newest',
    progress: 'Progress',
    progressText: '{done} of {total} complete',
    emptyTitle: 'No tasks here',
    emptyCopy: 'Add a task or change the filter to see more.',
    footer: 'Built with HTML, CSS and JavaScript.',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    noDue: 'No due date',
    dueToday: 'Today',
    overdue: 'Overdue',
    duePrefix: 'Due',
    createdPrefix: 'Created',
    edit: 'Edit task',
    delete: 'Delete task',
    complete: 'Mark as complete',
    reopen: 'Reopen task',
    imported: 'Import complete',
    importError: 'Invalid JSON file',
    cleared: 'Completed tasks cleared',
    drag: 'Drag task',
    reordered: 'Order saved',
    confirmKicker: 'Confirm action',
    confirmDeleteTitle: 'Delete this task?',
    confirmDeleteCopy: 'This action cannot be undone. The task will be removed from your local list.',
    confirmClearTitle: 'Clear completed tasks?',
    confirmClearCopy: 'All completed tasks will be removed from your local list.',
    confirmCancel: 'Cancel',
    confirmDelete: 'Delete'
  }
};

/*
  Cached DOM references.
  Querying once at startup keeps the rest of the code readable and avoids
  repeatedly searching the document during render or event handlers.
*/
const els = {
  languageBtn: document.getElementById('languageBtn'),
  themeBtn: document.getElementById('themeBtn'),
  portfolioLink: document.getElementById('portfolioLink'),
  heroEyebrow: document.getElementById('heroEyebrow'),
  heroTitle: document.getElementById('heroTitle'),
  heroCopy: document.getElementById('heroCopy'),
  metricTotal: document.getElementById('metricTotal'),
  metricOpen: document.getElementById('metricOpen'),
  metricDone: document.getElementById('metricDone'),
  metricTotalLabel: document.getElementById('metricTotalLabel'),
  metricOpenLabel: document.getElementById('metricOpenLabel'),
  metricDoneLabel: document.getElementById('metricDoneLabel'),
  composerKicker: document.getElementById('composerKicker'),
  composerTitle: document.getElementById('composerTitle'),
  saveState: document.getElementById('saveState'),
  taskForm: document.getElementById('taskForm'),
  taskTitle: document.getElementById('taskTitle'),
  taskDue: document.getElementById('taskDue'),
  taskPriority: document.getElementById('taskPriority'),
  taskNotes: document.getElementById('taskNotes'),
  titleLabel: document.getElementById('titleLabel'),
  dueLabel: document.getElementById('dueLabel'),
  priorityLabel: document.getElementById('priorityLabel'),
  notesLabel: document.getElementById('notesLabel'),
  submitBtn: document.getElementById('submitBtn'),
  cancelEditBtn: document.getElementById('cancelEditBtn'),
  searchInput: document.getElementById('searchInput'),
  filterTabs: document.querySelectorAll('.filter-tab'),
  filterAll: document.getElementById('filterAll'),
  filterOpen: document.getElementById('filterOpen'),
  filterToday: document.getElementById('filterToday'),
  filterDone: document.getElementById('filterDone'),
  exportBtn: document.getElementById('exportBtn'),
  importBtn: document.getElementById('importBtn'),
  importInput: document.getElementById('importInput'),
  clearDoneBtn: document.getElementById('clearDoneBtn'),
  boardKicker: document.getElementById('boardKicker'),
  boardTitle: document.getElementById('boardTitle'),
  sortSelect: document.getElementById('sortSelect'),
  progressLabel: document.getElementById('progressLabel'),
  progressText: document.getElementById('progressText'),
  progressBar: document.getElementById('progressBar'),
  taskList: document.getElementById('taskList'),
  emptyState: document.getElementById('emptyState'),
  emptyTitle: document.getElementById('emptyTitle'),
  emptyCopy: document.getElementById('emptyCopy'),
  footerText: document.getElementById('footerText'),
  confirmModal: document.getElementById('confirmModal'),
  confirmKicker: document.getElementById('confirmKicker'),
  confirmTitle: document.getElementById('confirmTitle'),
  confirmCopy: document.getElementById('confirmCopy'),
  confirmCancelBtn: document.getElementById('confirmCancelBtn'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
  template: document.getElementById('taskTemplate')
};

let tasks = loadTasks();
let filter = 'all';
let editingId = null;
let lang = localStorage.getItem(LANG_KEY) || 'sk';
let draggedTaskId = null;
let pendingConfirmAction = null;

/*
  Older saved tasks may not have an order value because drag-and-drop was added
  later. Normalizing once on startup keeps existing LocalStorage data compatible.
*/
normalizeTaskOrder();

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// Dates are stored as YYYY-MM-DD strings so due-date comparison stays simple.
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// Reads saved tasks safely; broken or missing LocalStorage data falls back to [].
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function normalizeTaskOrder() {
  let changed = false;
  tasks = tasks.map((task, index) => {
    if (Number.isFinite(task.order)) return task;
    changed = true;
    return { ...task, order: index };
  });
  if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/*
  Persists all task changes.
  The app keeps a single tasks array as source of truth, then serializes it to
  LocalStorage whenever a task is added, edited, deleted, reordered, or imported.
*/
function saveTasks(message) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  if (message) flashSaveState(message);
}

function flashSaveState(message) {
  els.saveState.textContent = message;
  clearTimeout(flashSaveState.timer);
  flashSaveState.timer = setTimeout(() => {
    els.saveState.textContent = translations[lang].saved;
  }, 1500);
}

// Used by the Today filter and by the due-date badge styling.
function isToday(value) {
  return value === todayISO();
}

// Overdue only applies to unfinished tasks, so completed old tasks stay calm.
function isOverdue(value, done) {
  return value && value < todayISO() && !done;
}

// Lower number means higher sorting priority.
function priorityWeight(priority) {
  return { high: 0, medium: 1, low: 2 }[priority] ?? 1;
}

/*
  Sort pipeline.
  Manual order is controlled by drag-and-drop. Smart sort keeps unfinished tasks
  first, then groups them by due date and priority.
*/
function sortTasks(items) {
  return [...items].sort((a, b) => {
    if (els.sortSelect.value === 'manual') return a.order - b.order;
    if (els.sortSelect.value === 'priority') return priorityWeight(a.priority) - priorityWeight(b.priority);
    if (els.sortSelect.value === 'created') return b.createdAt - a.createdAt;
    if (els.sortSelect.value === 'due') return (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31');
    if (a.done !== b.done) return Number(a.done) - Number(b.done);
    const dueCompare = (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31');
    if (dueCompare !== 0) return dueCompare;
    return priorityWeight(a.priority) - priorityWeight(b.priority);
  });
}

/*
  Filtering pipeline.
  Search checks both title and notes, then the active filter decides which tasks
  are visible. Filtering is applied after sorting so order remains predictable.
*/
function getVisibleTasks() {
  const query = els.searchInput.value.trim().toLowerCase();
  return sortTasks(tasks).filter(task => {
    const matchesQuery = !query || `${task.title} ${task.notes}`.toLowerCase().includes(query);
    const matchesFilter =
      filter === 'all' ||
      (filter === 'open' && !task.done) ||
      (filter === 'today' && isToday(task.due)) ||
      (filter === 'done' && task.done);
    return matchesQuery && matchesFilter;
  });
}

// Converts stored ISO dates into compact locale-aware labels.
function formatDate(value) {
  if (!value) return translations[lang].noDue;
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat(lang === 'sk' ? 'sk-SK' : 'en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date);
}

/*
  Main render function.
  It recalculates stats, updates progress, clears the old task list, and clones a
  fresh task card for every visible task. This keeps DOM state synchronized with
  the tasks array after every action.
*/
function render() {
  const t = translations[lang];
  const visibleTasks = getVisibleTasks();
  const completed = tasks.filter(task => task.done).length;
  const open = tasks.length - completed;
  const donePercent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  els.metricTotal.textContent = tasks.length;
  els.metricOpen.textContent = open;
  els.metricDone.textContent = `${donePercent}%`;
  els.progressText.textContent = t.progressText.replace('{done}', completed).replace('{total}', tasks.length);
  els.progressBar.style.width = `${donePercent}%`;

  els.taskList.innerHTML = '';
  els.emptyState.hidden = visibleTasks.length > 0;

  // Each cloned template gets task-specific text, state classes, aria labels, and event handlers.
  visibleTasks.forEach(task => {
    const node = els.template.content.firstElementChild.cloneNode(true);
    node.dataset.id = task.id;
    node.draggable = true;
    node.classList.toggle('done', task.done);

    const dragHandle = node.querySelector('.drag-handle');
    const completeBtn = node.querySelector('.complete-btn');
    const title = node.querySelector('.task-title');
    const notes = node.querySelector('.task-notes');
    const priority = node.querySelector('.priority-pill');
    const due = node.querySelector('.due-pill');
    const created = node.querySelector('.created-pill');
    const editBtn = node.querySelector('.edit-task');
    const deleteBtn = node.querySelector('.delete-task');

    title.textContent = task.title;
    notes.textContent = task.notes || '';
    priority.textContent = t[task.priority];
    priority.classList.add(`priority-${task.priority}`);
    due.textContent = task.due ? `${t.duePrefix}: ${formatDate(task.due)}` : t.noDue;
    due.classList.toggle('today', isToday(task.due));
    due.classList.toggle('overdue', isOverdue(task.due, task.done));
    if (isToday(task.due)) due.textContent = t.dueToday;
    if (isOverdue(task.due, task.done)) due.textContent = `${t.overdue}: ${formatDate(task.due)}`;
    created.textContent = `${t.createdPrefix}: ${formatDate(new Date(task.createdAt).toISOString().slice(0, 10))}`;
    dragHandle.setAttribute('aria-label', t.drag);
    completeBtn.setAttribute('aria-label', task.done ? t.reopen : t.complete);
    editBtn.setAttribute('aria-label', t.edit);
    deleteBtn.setAttribute('aria-label', t.delete);

    completeBtn.addEventListener('click', () => toggleTask(task.id));
    editBtn.addEventListener('click', () => startEdit(task.id));
    deleteBtn.addEventListener('click', () => requestDeleteTask(task.id));
    node.addEventListener('dragstart', handleDragStart);
    node.addEventListener('dragover', handleDragOver);
    node.addEventListener('dragleave', handleDragLeave);
    node.addEventListener('drop', handleDrop);
    node.addEventListener('dragend', handleDragEnd);

    els.taskList.appendChild(node);
  });
}

/*
  Applies the selected language to the UI.
  Static elements are updated directly, while dynamic task cards are refreshed by
  render() so priority labels and due-date text also switch language.
*/
function applyLanguage() {
  const t = translations[lang];
  document.documentElement.lang = t.htmlLang;
  els.portfolioLink.textContent = t.portfolio;
  els.languageBtn.textContent = t.language;
  els.heroEyebrow.textContent = t.heroEyebrow;
  els.heroTitle.textContent = t.heroTitle;
  els.heroCopy.textContent = t.heroCopy;
  els.metricTotalLabel.textContent = t.total;
  els.metricOpenLabel.textContent = t.open;
  els.metricDoneLabel.textContent = t.done;
  els.composerKicker.textContent = t.composerKicker;
  els.composerTitle.textContent = t.composerTitle;
  els.saveState.textContent = t.saved;
  els.titleLabel.textContent = t.titleLabel;
  els.taskTitle.placeholder = t.titlePlaceholder;
  els.dueLabel.textContent = t.dueLabel;
  els.priorityLabel.textContent = t.priorityLabel;
  els.notesLabel.textContent = t.notesLabel;
  els.taskNotes.placeholder = t.notesPlaceholder;
  els.submitBtn.textContent = editingId ? t.updateTask : t.addTask;
  els.cancelEditBtn.textContent = t.cancelEdit;
  els.searchInput.placeholder = t.searchPlaceholder;
  els.filterAll.textContent = t.filterAll;
  els.filterOpen.textContent = t.filterOpen;
  els.filterToday.textContent = t.filterToday;
  els.filterDone.textContent = t.filterDone;
  els.exportBtn.textContent = t.export;
  els.importBtn.textContent = t.import;
  els.clearDoneBtn.textContent = t.clearDone;
  els.boardKicker.textContent = t.boardKicker;
  els.boardTitle.textContent = t.boardTitle;
  els.sortSelect.options[0].textContent = t.sortManual;
  els.sortSelect.options[1].textContent = t.sortSmart;
  els.sortSelect.options[2].textContent = t.sortDue;
  els.sortSelect.options[3].textContent = t.sortPriority;
  els.sortSelect.options[4].textContent = t.sortCreated;
  els.progressLabel.textContent = t.progress;
  els.emptyTitle.textContent = t.emptyTitle;
  els.emptyCopy.textContent = t.emptyCopy;
  els.footerText.textContent = t.footer;
  els.confirmKicker.textContent = t.confirmKicker;
  els.confirmCancelBtn.textContent = t.confirmCancel;
  els.confirmDeleteBtn.textContent = t.confirmDelete;
  localStorage.setItem(LANG_KEY, lang);
  render();
}

// Restores the composer to create mode after saving or cancelling an edit.
function resetForm() {
  editingId = null;
  els.taskForm.reset();
  els.taskPriority.value = 'medium';
  els.submitBtn.textContent = translations[lang].addTask;
  els.cancelEditBtn.hidden = true;
}

// New tasks receive an order smaller than the current minimum, so they appear first.
function getTopOrder() {
  if (!tasks.length) return 0;
  return Math.min(...tasks.map(task => task.order)) - 1;
}

/*
  Form submit handler.
  When editingId is set, the existing task is patched. Otherwise a new task is
  created with default metadata and inserted at the top of the manual order.
*/
function upsertTask(event) {
  event.preventDefault();
  const title = els.taskTitle.value.trim();
  if (!title) return;

  const payload = {
    title,
    due: els.taskDue.value,
    priority: els.taskPriority.value,
    notes: els.taskNotes.value.trim()
  };

  if (editingId) {
    tasks = tasks.map(task => task.id === editingId ? { ...task, ...payload, updatedAt: Date.now() } : task);
  } else {
    tasks.unshift({
      id: uid(),
      ...payload,
      order: getTopOrder(),
      done: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  saveTasks(translations[lang].saved);
  resetForm();
  render();
}

// Toggles completion without removing the task from the current data set.
function toggleTask(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, done: !task.done, updatedAt: Date.now() } : task);
  saveTasks(translations[lang].saved);
  render();
}

// Removes one task and cancels edit mode if that exact task was being edited.
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(translations[lang].saved);
  if (editingId === id) resetForm();
  render();
}

// Opens the shared confirm modal before running the destructive delete action.
function requestDeleteTask(id) {
  openConfirm({
    title: translations[lang].confirmDeleteTitle,
    copy: translations[lang].confirmDeleteCopy,
    action: () => deleteTask(id)
  });
}

// Loads a selected task into the composer and switches the submit button to save mode.
function startEdit(id) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;
  editingId = id;
  els.taskTitle.value = task.title;
  els.taskDue.value = task.due || '';
  els.taskPriority.value = task.priority;
  els.taskNotes.value = task.notes || '';
  els.submitBtn.textContent = translations[lang].updateTask;
  els.cancelEditBtn.hidden = false;
  els.taskTitle.focus();
}

// Updates active filter button styling and refreshes the visible list.
function setFilter(nextFilter) {
  filter = nextFilter;
  els.filterTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.filter === filter));
  render();
}

/*
  Drag and drop handlers.
  Native HTML drag events store the dragged task id, highlight possible targets,
  and call reorderTasks() with before/after placement based on pointer position.
*/
function handleDragStart(event) {
  draggedTaskId = event.currentTarget.dataset.id;
  event.currentTarget.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', draggedTaskId);
}

function handleDragOver(event) {
  event.preventDefault();
  if (event.currentTarget.dataset.id !== draggedTaskId) {
    event.currentTarget.classList.add('drag-over');
  }
}

function handleDragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

function handleDrop(event) {
  event.preventDefault();
  const targetId = event.currentTarget.dataset.id;
  event.currentTarget.classList.remove('drag-over');
  if (!draggedTaskId || draggedTaskId === targetId) return;

  const targetBox = event.currentTarget.getBoundingClientRect();
  const placeAfter = event.clientY > targetBox.top + targetBox.height / 2;
  reorderTasks(draggedTaskId, targetId, placeAfter);
}

function handleDragEnd() {
  draggedTaskId = null;
  document.querySelectorAll('.task-card').forEach(card => {
    card.classList.remove('dragging', 'drag-over');
  });
}

// Rebuilds order values from the manually sorted id list and switches sort to Custom order.
function reorderTasks(sourceId, targetId, placeAfter) {
  const manualOrder = [...tasks].sort((a, b) => a.order - b.order).map(task => task.id);
  const sourceIndex = manualOrder.indexOf(sourceId);
  const targetIndex = manualOrder.indexOf(targetId);
  if (sourceIndex === -1 || targetIndex === -1) return;

  manualOrder.splice(sourceIndex, 1);
  const adjustedTargetIndex = manualOrder.indexOf(targetId);
  manualOrder.splice(adjustedTargetIndex + (placeAfter ? 1 : 0), 0, sourceId);

  const orderById = new Map(manualOrder.map((id, index) => [id, index]));
  tasks = tasks.map(task => ({ ...task, order: orderById.get(task.id) ?? task.order }));
  els.sortSelect.value = 'manual';
  saveTasks(translations[lang].reordered);
  render();
}

/*
  Export keeps the same schema used in LocalStorage.
  The downloaded JSON includes tasks plus an exportedAt timestamp for context.
*/
function exportTasks() {
  const blob = new Blob([JSON.stringify({ tasks, exportedAt: new Date().toISOString() }, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'task-studio-export.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/*
  Import accepts either a raw task array or the app's exported { tasks } object.
  Incoming values are sanitized and trimmed so malformed files cannot inject
  unexpected task shapes into the app state.
*/
function importTasks(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const incoming = Array.isArray(parsed) ? parsed : parsed.tasks;
      if (!Array.isArray(incoming)) throw new Error('Invalid import');
      tasks = incoming
        .filter(item => item && item.title)
        .map((item, index) => ({
          id: item.id || uid(),
          title: String(item.title).slice(0, 90),
          notes: String(item.notes || '').slice(0, 220),
          due: item.due || '',
          priority: ['high', 'medium', 'low'].includes(item.priority) ? item.priority : 'medium',
          order: Number.isFinite(item.order) ? item.order : index,
          done: Boolean(item.done),
          createdAt: Number(item.createdAt) || Date.now(),
          updatedAt: Date.now()
        }));
      normalizeTaskOrder();
      saveTasks(translations[lang].imported);
      resetForm();
      render();
    } catch {
      flashSaveState(translations[lang].importError);
    } finally {
      els.importInput.value = '';
    }
  };
  reader.readAsText(file);
}

// Deletes all completed tasks after the user confirms the action.
function clearCompleted() {
  tasks = tasks.filter(task => !task.done);
  normalizeTaskOrder();
  saveTasks(translations[lang].cleared);
  render();
}

// Avoids opening the modal if there are no completed tasks to clear.
function requestClearCompleted() {
  if (!tasks.some(task => task.done)) return;
  openConfirm({
    title: translations[lang].confirmClearTitle,
    copy: translations[lang].confirmClearCopy,
    action: clearCompleted
  });
}

/*
  Confirm modal helpers.
  The modal stores the pending callback in pendingConfirmAction, then runs it only
  if the user clicks the destructive confirmation button.
*/
function openConfirm({ title, copy, action }) {
  pendingConfirmAction = action;
  els.confirmTitle.textContent = title;
  els.confirmCopy.textContent = copy;
  els.confirmModal.hidden = false;
  els.confirmCancelBtn.focus();
}

function closeConfirm() {
  pendingConfirmAction = null;
  els.confirmModal.hidden = true;
}

function runConfirmAction() {
  const action = pendingConfirmAction;
  closeConfirm();
  if (action) action();
}

function seedTasks() {
  // Seed is disabled so the app starts clean.
}

// Theme preference is read once on startup; the toggle updates it later.
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

/*
  Event wiring.
  Listeners are attached once after helpers are defined. Task-card listeners are
  attached inside render() because those nodes are recreated from the template.
*/
els.taskForm.addEventListener('submit', upsertTask);
els.cancelEditBtn.addEventListener('click', resetForm);
els.searchInput.addEventListener('input', render);
els.sortSelect.addEventListener('change', render);
els.filterTabs.forEach(tab => tab.addEventListener('click', () => setFilter(tab.dataset.filter)));
els.exportBtn.addEventListener('click', exportTasks);
els.importInput.addEventListener('change', event => importTasks(event.target.files[0]));
els.clearDoneBtn.addEventListener('click', requestClearCompleted);
els.confirmCancelBtn.addEventListener('click', closeConfirm);
els.confirmDeleteBtn.addEventListener('click', runConfirmAction);
els.confirmModal.addEventListener('click', event => {
  if (event.target === els.confirmModal) closeConfirm();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !els.confirmModal.hidden) closeConfirm();
});

els.languageBtn.addEventListener('click', () => {
  lang = lang === 'sk' ? 'en' : 'sk';
  applyLanguage();
});

els.themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
});

initTheme();
seedTasks();
applyLanguage();
