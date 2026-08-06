import {
  Home,
  PlusCircle,
  FileQuestion,
  Bell,
  User,
  ClipboardList,
  MessageSquare,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";

export const menus = {
  student: [
    {
      label: "Home",
      icon: Home,
      path: "/student/dashboard",
    },

    {
      label: "Ask Question",
      icon: PlusCircle,
      path: "/student/ask-question",
    },

    {
      label: "My Questions",
      icon: FileQuestion,
      path: "/student/my-questions",
    },

    {
      label: "Notifications",
      icon: Bell,
      path: "/student/notifications",
    },

    {
      label: "Profile",
      icon: User,
      path: "/student/profile",
    },
  ],

  teacher: [
    {
      label: "Dashboard",
      icon: Home,
      path: "/teacher/dashboard",
    },

    {
      label: "Questions",
      icon: ClipboardList,
      path: "/teacher/questions",
    },

    {
      label: "Profile",
      icon: User,
      path: "/teacher/profile",
    },
  ],

  admin: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },

    {
      label: "Students",
      icon: GraduationCap,
      path: "/admin/students",
    },

    {
      label: "Teachers",
      icon: User,
      path: "/admin/teachers",
    },

    {
      label: "Questions",
      icon: MessageSquare,
      path: "/admin/questions",
    },
  ],
};
