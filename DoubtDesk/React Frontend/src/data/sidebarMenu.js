import {
  Home,
  PlusCircle,
  FileQuestion,
  Bookmark,
  Users,
  BookOpen,
  Settings,
  Bell,
  User,
  Shield,
  ClipboardList,
  BarChart3,
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
      label: "Bookmarks",
      icon: Bookmark,
      path: "/student/bookmarks",
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

    {
      label: "Settings",
      icon: Settings,
      path: "/student/settings",
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
      label: "Analytics",
      icon: BarChart3,
      path: "/teacher/analytics",
    },

    {
      label: "Profile",
      icon: User,
      path: "/teacher/profile",
    },

    {
      label: "Settings",
      icon: Settings,
      path: "/teacher/settings",
    },
  ],

  admin: [
    {
      label: "Dashboard",
      icon: Home,
      path: "/admin/dashboard",
    },

    {
      label: "Users",
      icon: Users,
      path: "/admin/users",
    },

    {
      label: "Reports",
      icon: Shield,
      path: "/admin/reports",
    },

    {
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ],
};
