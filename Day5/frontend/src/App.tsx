
import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import type { Student, StudentFormData } from "./types";

const API_URL = "http://localhost:5000/api/students";
const emptyForm: StudentFormData = { name: "", email: "", course: "" };
const avatarColors = ["bg-[#E8E5D9] text-[#4D5A46]", "bg-[#E9DFD1] text-[#775D42]", "bg-[#DFE7DD] text-[#465D48]", "bg-[#E8E0E9] text-[#66516E]", "bg-[#DDE5E8] text-[#45616A]"];
const PAGE_SIZE = 8;

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<StudentFormData>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All courses");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");

  const closeDrawer = useCallback((): void => {
    setDrawerOpen(false);
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  }, []);

  useEffect(() => {
    let cancelled = false;
    axios.get<Student[]>(API_URL)
      .then((res) => { if (!cancelled) setStudents(res.data); })
      .catch(() => { if (!cancelled) setError("Could not connect to the server."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [drawerOpen, closeDrawer]);

  const fetchStudents = async (): Promise<void> => {
    try {
      const res = await axios.get<Student[]>(API_URL);
      setStudents(res.data);
      setError("");
    } catch {
      setError("Failed to refresh student records.");
    }
  };

  const showToast = (message: string): void => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddDrawer = (): void => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setDrawerOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.course.trim()) {
      setError("Please complete all fields.");
      return;
    }
    try {
      setSaving(true);
      setError("");
      if (editingId !== null) {
        await axios.put(`${API_URL}/${editingId}`, form);
        showToast("Student details updated successfully.");
      } else {
        await axios.post(API_URL, form);
        showToast("New student added successfully.");
      }
      setForm(emptyForm);
      setEditingId(null);
      setDrawerOpen(false);
      setPage(1);
      await fetchStudents();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (student: Student): void => {
    setForm({ name: student.name, email: student.email, course: student.course });
    setEditingId(student.id);
    setError("");
    setDrawerOpen(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      showToast("Student removed successfully.");
      await fetchStudents();
    } catch {
      showToast("Failed to delete student.");
    }
  };

  const courses = Array.from(new Set(students.map((s) => s.course)));

  const filteredStudents = students.filter((student) => {
    const query = debouncedSearch.toLowerCase().trim();
    const matchesSearch =
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query);
    const matchesCourse = courseFilter === "All courses" || student.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + PAGE_SIZE);

  const getInitials = (name: string): string =>
    name.trim().split(" ").filter(Boolean).slice(0, 2).map((word) => word[0].toUpperCase()).join("");

  const goTo = (section: string): void => {
    setActiveNav(section);
    const target = section === "Courses" ? "stats" : section === "Students" ? "directory" : "top";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const resetPage = (): void => setPage(1);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#F5F3ED] font-sans text-[#26312B]">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {toast && (
        <div className="toast-pop fixed right-6 top-6 z-[100] flex items-center gap-3 rounded-xl bg-[#26312B] px-5 py-4 text-sm text-white shadow-2xl">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A6B49A] text-[#26312B]">✓</span>
          {toast}
        </div>
      )}

      <div className="min-h-screen lg:flex">
        {/* Sidebar */}
        <aside className="sidebar flex w-full flex-col bg-[#202B26] text-[#F5F3ED] lg:fixed lg:inset-y-0 lg:left-0 lg:w-[250px]">
          <div className="flex h-[82px] items-center border-b border-white/10 px-7">
            <div className="logo-mark flex h-9 w-9 items-center justify-center rounded-lg bg-[#A6B49A] text-sm font-bold text-[#202B26]">S</div>
            <div className="ml-3">
              <h1 className="text-[17px] font-semibold tracking-[0.04em]">STUDEXA</h1>
              <p className="text-[10px] tracking-[0.18em] text-[#A5ADA5]">STUDENT WORKSPACE</p>
            </div>
          </div>

          <div className="px-6 pt-9">
            <p className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-[#869187]">WORKSPACE</p>
            <nav className="space-y-1">
              {[{ name: "Overview", icon: "◈" }, { name: "Students", icon: "▤" }, { name: "Courses", icon: "▧" }].map((item) => (
                <button key={item.name} onClick={() => goTo(item.name)} className={`nav-item flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm ${activeNav === item.name ? "nav-active" : "text-[#A7B0A7"}`}>
                  <span className="text-[#A6B49A]">{item.icon}</span>
                  {item.name}
                  <span className="nav-arrow ml-auto opacity-0">↗</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto hidden px-6 pb-7 lg:block">
            <div className="sidebar-note rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-medium text-[#DCE4D8]">Academic workspace</p>
              <p className="mt-2 text-xs leading-5 text-[#929C93]">A calmer way to manage student information.</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-[#A6B49A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A6B49A]" /> SYSTEM OPERATIONAL
              </div>
            </div>
            <p className="mt-5 text-[10px] tracking-[0.12em] text-[#78837A]">STUDEXA · VERSION 1.0</p>
          </div>
        </aside>

        {/* Main */}
        <main className="main-content w-full px-5 pb-12 pt-8 sm:px-8 lg:ml-[250px] lg:px-12">
          <div className="topbar flex items-center justify-between border-b border-[#E4E0D7] pb-5">
            <div>
              <p className="text-xs text-[#81867B]">Workspace / Overview</p>
              <p className="mt-1 text-[10px] text-[#A0A196]">Your academic space</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium text-[#344038]">Admin workspace</p>
                <p className="mt-1 text-[10px] text-[#858A80]">Student management</p>
              </div>
              <div className="avatar-admin flex h-9 w-9 items-center justify-center rounded-full bg-[#D9DFD1] text-xs font-semibold text-[#43513F]">A</div>
            </div>
          </div>

          {/* Page heading */}
          <section className="hero-section mb-8 mt-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#7C8A71]">STUDENT RECORDS</p>
              <h2 className="hero-title mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#26312B] sm:text-[38px]">People, not just records.</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#81867B]">Your student community, organized thoughtfully in one place.</p>
            </div>
            <button onClick={openAddDrawer} className="primary-btn inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#26312B] px-5 py-3 text-sm font-medium text-white sm:self-auto">
              <span className="text-lg leading-none">+</span>Add student
            </button>
          </section>

          {/* Stats */}
          <section id="stats" className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="stat-card rounded-xl border border-[#E7E3DA] bg-white p-5">
              <div className="flex items-start justify-between">
                <p className="text-xs text-[#81867B]">Total students</p>
                <span className="stat-icon">♧</span>
              </div>
              <h3 className="stat-number mt-3 text-3xl font-semibold tracking-tight">{String(students.length).padStart(2, "0")}</h3>
              <p className="mt-2 text-xs text-[#9A9C93]">All student records</p>
            </div>

            <div className="stat-card rounded-xl border border-[#E7E3DA] bg-white p-5">
              <div className="flex items-start justify-between">
                <p className="text-xs text-[#81867B]">Active courses</p>
                <span className="stat-icon">⌘</span>
              </div>
              <h3 className="stat-number mt-3 text-3xl font-semibold tracking-tight">{String(courses.length).padStart(2, "0")}</h3>
              <p className="mt-2 text-xs text-[#9A9C93]">Courses represented</p>
            </div>

            <div className="stat-card stat-green rounded-xl border border-[#D9DFD1] bg-[#E8EBE2] p-5">
              <div className="flex items-start justify-between">
                <p className="text-xs text-[#697462]">Workspace status</p>
                <span className="status-dot" />
              </div>
              <h3 className="stat-number mt-3 text-3xl font-semibold tracking-tight text-[#3F4C3C]">{error ? "Offline" : "Ready"}</h3>
              <p className="mt-2 text-xs text-[#788273]">Student database connection</p>
            </div>
          </section>

          {/* Student directory */}
          <section id="directory" className="directory-card overflow-hidden rounded-xl border border-[#E7E3DA] bg-white">
            <div className="flex flex-col justify-between gap-4 border-b border-[#ECE9E2] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
              <div>
                <h3 className="text-base font-semibold tracking-tight">Student directory</h3>
                <p className="mt-1 text-xs text-[#85897F]">Browse and manage enrolled students</p>
              </div>

              {/* Search + Course filter only */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="search-box flex items-center gap-2 rounded-lg border border-[#E6E2DA] bg-[#FBFAF7] px-3">
                  <span className="text-[#94978D]">⌕</span>
                  <input
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); resetPage(); }}
                    placeholder="Search students..."
                    aria-label="Search students"
                    className="w-full bg-transparent py-2.5 text-xs outline-none sm:w-[180px]"
                  />
                  {search && (
                    <button onClick={() => { setSearch(""); resetPage(); }} aria-label="Clear search" className="text-xs text-[#92958B] hover:text-[#26312B]">×</button>
                  )}
                </div>

                <select
                  value={courseFilter}
                  onChange={(e) => { setCourseFilter(e.target.value); resetPage(); }}
                  aria-label="Filter by course"
                  className="rounded-lg border border-[#E6E2DA] bg-[#FBFAF7] px-3 py-2.5 text-xs text-[#525B50] outline-none transition focus:border-[#8A9A7D] sm:min-w-[200px]"
                >
                  <option>All courses</option>
                  {courses.map((course) => <option key={course} value={course}>{course}</option>)}
                </select>
              </div>
            </div>

            {/* Table heading */}
            <div className="hidden grid-cols-[1.5fr_1.5fr_1fr_180px] border-b border-[#ECE9E2] bg-[#F9F8F4] px-7 py-3 sm:grid">
              {["STUDENT", "EMAIL ADDRESS", "COURSE", "ACTIONS"].map((label) => (
                <p key={label} className={`text-[10px] font-semibold tracking-[0.14em] text-[#85897F] ${label === "ACTIONS" ? "text-right" : ""}`}>{label}</p>
              ))}
            </div>

            {loading && <div className="space-y-3 p-6">{[1, 2, 3].map((n) => <div key={n} className="loading-row" />)}</div>}

            {!loading && error && <div className="mx-5 my-5 rounded-lg border border-[#E8D8D0] bg-[#FAF1EC] px-4 py-3 text-sm text-[#9D6451]">{error}</div>}

            {!loading && !error && filteredStudents.length === 0 && (
              <div className="empty-state px-6 py-16 text-center">
                <div className="empty-icon mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E9EDE4] text-xl text-[#65765B]">+</div>
                <h4 className="mt-4 text-sm font-semibold">{search || courseFilter !== "All courses" ? "No matching students" : "Your directory is ready"}</h4>
                <p className="mt-2 text-xs text-[#8A8D84]">{search || courseFilter !== "All courses" ? "Try adjusting your search or course filter." : "Add your first student to get started."}</p>
                {!search && courseFilter === "All courses" && <button onClick={openAddDrawer} className="mt-5 text-xs font-medium text-[#617257] transition hover:text-[#26312B]">+ Add your first student</button>}
              </div>
            )}

            {!loading && !error && paginatedStudents.map((student, index) => (
              <div key={student.id} style={{ animationDelay: `${index * 60}ms` }} className="student-row grid grid-cols-1 gap-3 border-b border-[#F0EEE8] px-5 py-4 sm:grid-cols-[1.5fr_1.5fr_1fr_180px] sm:items-center sm:px-7">
                <div className="flex items-center gap-3">
                  <div className={`student-avatar flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColors[(startIndex + index) % avatarColors.length]}`}>{getInitials(student.name)}</div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#303A32]">{student.name}</p>
                    <p className="mt-1 text-[10px] text-[#999B92]">STU-{String(student.id).padStart(3, "0")}</p>
                  </div>
                </div>
                <p className="break-all text-xs text-[#7F847B]"><span className="sm:hidden text-[10px] font-semibold text-[#A0A197">EMAIL · </span>{student.email}</p>
                <div><span className="course-badge inline-flex rounded-md bg-[#EEF0E9] px-2.5 py-1.5 text-[11px] font-medium text-[#586650]">{student.course}</span></div>
                <div className="flex justify-start gap-2 sm:justify-end">
                  <button onClick={() => handleEdit(student)} aria-label={`Edit ${student.name}`} className="action-btn rounded-md px-3 py-2 text-xs text-[#68765E] transition hover:bg-[#E8EBE2]">✎ <span>Edit</span></button>
                  <button onClick={() => handleDelete(student.id)} aria-label={`Delete ${student.name}`} className="action-btn rounded-md px-3 py-2 text-xs text-[#A16B65] transition hover:bg-[#F7ECE9]">⌑ <span>Delete</span></button>
                </div>
              </div>
            ))}

            {!loading && !error && filteredStudents.length > 0 && (
              <div className="flex flex-col gap-3 bg-[#FAF9F6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <p className="text-xs text-[#898D83]">Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filteredStudents.length)} of {filteredStudents.length} students</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="page-btn rounded-md border border-[#E1DDD5] px-3 py-2 text-xs transition hover:bg-[#E8EBE2] disabled:cursor-not-allowed disabled:opacity-40">← Previous</button>
                  <span className="min-w-[70px] text-center text-xs text-[#687164]">Page {currentPage} / {totalPages}</span>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="page-btn rounded-md border border-[#E1DDD5] px-3 py-2 text-xs transition hover:bg-[#E8EBE2] disabled:cursor-not-allowed disabled:opacity-40">Next →</button>
                </div>
                <p className="hidden text-[10px] tracking-[0.08em] text-[#A0A196] sm:block">STUDEXA DIRECTORY</p>
              </div>
            )}
          </section>

          <footer className="mt-7 flex flex-col justify-between gap-2 text-[11px] text-[#92958B] sm:flex-row">
            <p>© 2026 Studexa Workspace</p>
            <p>Thoughtfully organized · Student management system</p>
          </footer>
        </main>
      </div>

      {/* Add / Edit Drawer */}
      {drawerOpen && (
        <div className="drawer-root fixed inset-0 z-50 flex justify-end">
          <button type="button" aria-label="Close form" onClick={closeDrawer} className="drawer-overlay absolute inset-0 bg-[#202B26]/40 backdrop-blur-[3px]" />
          <section className="drawer-panel relative z-10 flex h-full w-full max-w-[440px] flex-col bg-[#FBFAF7] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] px-7 py-6">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7B8970]">STUDEXA · DIRECTORY</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{editingId !== null ? "Edit student" : "New student"}</h3>
              </div>
              <button type="button" onClick={closeDrawer} aria-label="Close drawer" className="close-btn flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E1D8] text-[#73796F] transition hover:bg-[#EFEEE8]">×</button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-7">
              <div className="form-info mb-7 rounded-xl bg-[#E9EDE4] p-4">
                <p className="text-sm font-medium text-[#475442]">Student information</p>
                <p className="mt-1 text-xs leading-5 text-[#76816F]">Add the details below to keep your student directory up to date.</p>
              </div>

              <form id="student-form" onSubmit={handleSubmit} className="space-y-5">
                {[{ label: "Full name", name: "name", placeholder: "e.g. Amina Rahman", type: "text" }, { label: "Email address", name: "email", placeholder: "name@example.com", type: "email" }, { label: "Course", name: "course", placeholder: "e.g. React Development", type: "text" }].map((field) => (
                  <div key={field.name} className="form-field">
                    <label htmlFor={field.name} className="mb-2 block text-xs font-semibold text-[#50594E]">{field.label}</label>
                    <input id={field.name} name={field.name} type={field.type} value={form[field.name as keyof StudentFormData]} onChange={handleChange} placeholder={field.placeholder} className="form-input w-full rounded-lg border border-[#DFDCD3] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A9A7D] focus:ring-2 focus:ring-[#8A9A7D]/10" />
                  </div>
                ))}
                {error && <p className="form-error rounded-lg border border-[#E8D8D0] bg-[#FAF1EC] px-4 py-3 text-xs text-[#9D6451]">{error}</p>}
              </form>
            </div>

            <div className="border-t border-[#E5E1D8] bg-white px-7 py-5">
              <div className="flex gap-3">
                <button type="button" onClick={closeDrawer} className="secondary-btn flex-1 rounded-lg border border-[#E1DDD5] px-4 py-3 text-sm font-medium text-[#62695F] transition hover:bg-[#F5F3ED]">Cancel</button>
                <button form="student-form" type="submit" disabled={saving} className="primary-btn flex-1 rounded-lg bg-[#26312B] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#39473D] disabled:opacity-60">{saving ? "Saving..." : editingId !== null ? "Save changes" : "Create student"}</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
