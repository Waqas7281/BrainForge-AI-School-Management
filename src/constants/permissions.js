// src/constants/permissions.js

export const PERMISSIONS = {
  // Student Management
  VIEW_STUDENTS: "view_students",
  CREATE_STUDENT: "create_student",
  EDIT_STUDENT: "edit_student",
  DELETE_STUDENT: "delete_student",
  ADMIT_STUDENT: "admit_student",
  PROMOTE_STUDENT: "promote_student",

  // Teacher Management
  VIEW_TEACHERS: "view_teachers",
  CREATE_TEACHER: "create_teacher",
  EDIT_TEACHER: "edit_teacher",
  DELETE_TEACHER: "delete_teacher",

  // Staff Management
  VIEW_STAFF: "view_staff",
  CREATE_STAFF: "create_staff",
  EDIT_STAFF: "edit_staff",
  DELETE_STAFF: "delete_staff",

  // Fees Management
  VIEW_FEES: "view_fees",
  COLLECT_FEES: "collect_fees",
  EDIT_FEES: "edit_fees",
  VIEW_FEES_REPORT: "view_fees_report",

  // Attendance
  MARK_ATTENDANCE: "mark_attendance",
  VIEW_ATTENDANCE: "view_attendance",
  VIEW_ATTENDANCE_REPORT: "view_attendance_report",

  // Exams
  VIEW_EXAMS: "view_exams",
  CREATE_EXAM: "create_exam",
  ENTER_MARKS: "enter_marks",
  PUBLISH_RESULTS: "publish_results",
  VIEW_RESULTS: "view_results",

  // Accounts
  VIEW_INCOME: "view_income",
  CREATE_INCOME: "create_income",
  VIEW_EXPENSE: "view_expense",
  CREATE_EXPENSE: "create_expense",
  VIEW_LEDGER: "view_ledger",

  // Payroll
  VIEW_SALARY: "view_salary",
  ASSIGN_SALARY: "assign_salary",
  PROCESS_PAYMENT: "process_payment",

  // Communication
  VIEW_NOTICES: "view_notices",
  CREATE_NOTICE: "create_notice",
  SEND_EMAIL: "send_email",
  SEND_SMS: "send_sms",

  // Reports
  VIEW_REPORTS: "view_reports",
  EXPORT_REPORTS: "export_reports",

  // Settings
  VIEW_SETTINGS: "view_settings",
  EDIT_SETTINGS: "edit_settings",

  // System (Super Admin only)
  SYSTEM_MANAGE_SCHOOLS: "system_manage_schools",
  SYSTEM_MANAGE_SUBSCRIPTIONS: "system_manage_subscriptions",
  SYSTEM_MANAGE_ROLES: "system_manage_roles",
  SYSTEM_MANAGE_MODULES: "system_manage_modules",
  SYSTEM_MANAGE_BACKUP: "system_manage_backup",
};

export const ROLE_PERMISSIONS = {
  super_admin: Object.values(PERMISSIONS),

  school_admin: [
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.CREATE_STUDENT,
    PERMISSIONS.EDIT_STUDENT,
    PERMISSIONS.DELETE_STUDENT,
    PERMISSIONS.ADMIT_STUDENT,
    PERMISSIONS.PROMOTE_STUDENT,
    PERMISSIONS.VIEW_TEACHERS,
    PERMISSIONS.CREATE_TEACHER,
    PERMISSIONS.EDIT_TEACHER,
    PERMISSIONS.DELETE_TEACHER,
    PERMISSIONS.VIEW_STAFF,
    PERMISSIONS.CREATE_STAFF,
    PERMISSIONS.EDIT_STAFF,
    PERMISSIONS.DELETE_STAFF,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.COLLECT_FEES,
    PERMISSIONS.EDIT_FEES,
    PERMISSIONS.VIEW_FEES_REPORT,
    PERMISSIONS.MARK_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE_REPORT,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.CREATE_EXAM,
    PERMISSIONS.ENTER_MARKS,
    PERMISSIONS.PUBLISH_RESULTS,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.VIEW_INCOME,
    PERMISSIONS.CREATE_INCOME,
    PERMISSIONS.VIEW_EXPENSE,
    PERMISSIONS.CREATE_EXPENSE,
    PERMISSIONS.VIEW_LEDGER,
    PERMISSIONS.VIEW_SALARY,
    PERMISSIONS.ASSIGN_SALARY,
    PERMISSIONS.PROCESS_PAYMENT,
    PERMISSIONS.VIEW_NOTICES,
    PERMISSIONS.CREATE_NOTICE,
    PERMISSIONS.SEND_EMAIL,
    PERMISSIONS.SEND_SMS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_SETTINGS,
  ],

  teacher: [
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.MARK_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.ENTER_MARKS,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.VIEW_NOTICES,
  ],

  parent: [
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.VIEW_NOTICES,
  ],

  accountant: [
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.COLLECT_FEES,
    PERMISSIONS.VIEW_FEES_REPORT,
    PERMISSIONS.VIEW_INCOME,
    PERMISSIONS.CREATE_INCOME,
    PERMISSIONS.VIEW_EXPENSE,
    PERMISSIONS.CREATE_EXPENSE,
    PERMISSIONS.VIEW_LEDGER,
    PERMISSIONS.VIEW_SALARY,
    PERMISSIONS.PROCESS_PAYMENT,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
  ],

  staff: [
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_SALARY,
    PERMISSIONS.VIEW_NOTICES,
  ],
};
