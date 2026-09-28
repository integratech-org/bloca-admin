import {
  ChartNoAxesColumnIncreasing,
  Activity,
  MapPin,
  Grid2x2Check,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  id: string
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getMenuList(_pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          id: "overview",
          href: "/",
          label: "Overview",
          icon: ChartNoAxesColumnIncreasing,
          submenus: [],
        },
        {
          id: "system-health",
          href: "/system-health",
          label: "System Health",
          icon: Activity,
          submenus: [],
        },
        {
          id: "deployment",
          href: "/deployment",
          label: "Deployment",
          icon: MapPin,
          submenus: [],
        },
        {
          id: "ml-auditing",
          href: "/ml-auditing",
          label: "ML Auditing",
          icon: Grid2x2Check,
          submenus: [],
        },
        {
          id: "user-management",
          href: "/user-management",
          label: "User Management",
          icon: UsersRound,
          submenus: [],
        },
      ],
    },
    // {
    //   groupLabel: "Contents",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Posts",
    //       icon: SquarePen,
    //       submenus: [
    //         {
    //           href: "/posts",
    //           label: "All Posts",
    //         },
    //         {
    //           href: "/posts/new",
    //           label: "New Post",
    //         },
    //       ],
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       icon: Bookmark,
    //     },
    //     {
    //       href: "/tags",
    //       label: "Tags",
    //       icon: Tag,
    //     },
    //   ],
    // },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       icon: Users,
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       icon: Settings,
    //     },
    //   ],
    // },
  ]
}
