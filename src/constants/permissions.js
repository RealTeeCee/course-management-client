export const ALL_ROLES = [
  {
    id: 1,
    value: "ADMIN",
    label: "Admin",
  },
  {
    id: 2,
    value: "MANAGER",
    label: "Manager",
  },
  {
    id: 3,
    value: "EMPLOYEE",
    label: "Employee",
  },
  {
    id: 4,
    value: "USER",
    label: "User",
  },
];

export const ADMIN_ROLE = ALL_ROLES[0].value;
export const MANAGER_ROLE = ALL_ROLES[1].value;
export const EMPLOYEE_ROLE = ALL_ROLES[2].value;
export const USER_ROLE = ALL_ROLES[3].value;

export const permissions = {
  admin: {
    USER: ["CREATE", "READ", "UPDATE", "DELETE"],
    COURSE: ["CREATE", "READ", "UPDATE", "DELETE"],
    BLOG: ["CREATE", "READ", "UPDATE", "DELETE"],
    ROLE: ADMIN_ROLE,
  },
  manager: {
    USER: ["CREATE", "READ", "UPDATE", "DELETE"],
    COURSE: ["CREATE", "READ", "UPDATE", "DELETE"],
    BLOG: ["CREATE", "READ", "UPDATE", "DELETE"],
    ROLE: MANAGER_ROLE,
  },
  employeeBlog: {
    USER: null,
    COURSE: null,
    BLOG: ["CREATE", "READ", "UPDATE", "DELETE"],
    ROLE: EMPLOYEE_ROLE,
  },
  employeeCourse: {
    USER: null,
    COURSE: ["CREATE", "READ", "UPDATE", "DELETE"],
    BLOG: null,
    ROLE: EMPLOYEE_ROLE,
  },
  user: {
    USER: null,
    COURSE: null,
    BLOG: ["CREATE", "READ", "UPDATE", "DELETE"],
    ROLE: USER_ROLE,
  },
};

export const ALLOWED_ROLES = [ADMIN_ROLE, MANAGER_ROLE, EMPLOYEE_ROLE];
