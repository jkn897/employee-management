import { create } from 'zustand';
import { persist } from 'zustand/middleware';
let empAppStore = (set) => ({
    project_id: '',
    employee_id: '',
    task_name: '',
    functionality_status:'',
    dopen: true,
    zusIsLoggedIn: false,
    updateZusIsLoggedIn: (zusIsLoggedIn) => set((state) => ({ zusIsLoggedIn: zusIsLoggedIn })),
    updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
    updateProjectId: (project_id) => set((state) => ({ project_id: project_id })),
    updateEmployeeId: (employee_id) => set((state) => ({ employee_id: employee_id })),
    updateTaskName: (task_name) => set((state) => ({ task_name: task_name })),
    updateFunctionalityStatus: (functionality_status) => set((state) => ({ functionality_status: functionality_status })),
});

empAppStore = persist(empAppStore, { name: "emp_app" });
export const useAppStore = create(empAppStore);