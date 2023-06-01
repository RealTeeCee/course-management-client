export const ADMIN_ROLE = "ADMIN";
export const USER_ROLE = "USER";

export const permissions = {
    admin: {
      CREATE: "CREATE",
      READ: "READ",
      UPDATE: "UPDATE",
      DELETE: "DELETE",
      ROLE: ADMIN_ROLE,
    },
    user: {
      CREATE: "CREATE",
      ROLE: USER_ROLE,
    },
    course: {
      CREATE: "CREATE",
      UPDATE: "UPDATE",
      DELETE: "DELETE",
    },
  };
