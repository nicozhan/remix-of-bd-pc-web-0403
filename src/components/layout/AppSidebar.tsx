import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Search,
  FileSignature,
  Footprints,
  ClipboardCheck,
  Target,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  TrendingUp,
  Activity,
  FileBarChart,
  GraduationCap,
  BookOpen,
  Notebook,
  Megaphone,
  Settings,
  Building2,
  UserCog,
  BookMarked,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const topMenuItems = [
  { title: "工作台", url: "/", icon: LayoutDashboard },
  { title: "客户与商机管理", url: "/customers", icon: Users },
  { title: "勘察管理", url: "/surveys", icon: Search },
  { title: "签约管理", url: "/contracts", icon: FileSignature },
  { title: "拜访与日报管理", url: "/visits", icon: Footprints },
  { title: "公告管理", url: "/announcements", icon: Megaphone },
];

interface MenuGroup {
  title: string;
  icon: typeof LayoutDashboard;
  prefix: string;
  children: { title: string; url: string; icon: typeof LayoutDashboard }[];
}

const menuGroups: MenuGroup[] = [
  {
    title: "考核管理",
    icon: ClipboardCheck,
    prefix: "/assessment",
    children: [
      { title: "绩效目标管理", url: "/assessment/goals", icon: Target },
      { title: "指标结果查询", url: "/assessment/results", icon: BarChart3 },
      { title: "抽检管理", url: "/assessment/audit", icon: ShieldCheck },
    ],
  },
  {
    title: "数据分析",
    icon: TrendingUp,
    prefix: "/analytics",
    children: [
      { title: "运营看板", url: "/analytics/operations", icon: BarChart3 },
      { title: "监控看板", url: "/analytics/monitoring", icon: Activity },
      { title: "报表查询", url: "/analytics/reports", icon: FileBarChart },
    ],
  },
  {
    title: "人员培训",
    icon: GraduationCap,
    prefix: "/training",
    children: [
      { title: "课程配置", url: "/training/courses", icon: BookOpen },
      { title: "培训学习", url: "/training/learning", icon: Notebook },
    ],
  },
  {
    title: "系统管理",
    icon: Settings,
    prefix: "/system",
    children: [
      { title: "组织机构与用户管理", url: "/system/organization", icon: Building2 },
      { title: "角色管理", url: "/system/roles", icon: UserCog },
      { title: "字典管理", url: "/system/dictionary", icon: BookMarked },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const initOpen: Record<string, boolean> = {};
  menuGroups.forEach((g) => {
    initOpen[g.prefix] = g.children.some((c) => location.pathname.startsWith(c.url));
  });
  const [openGroups, setOpenGroups] = useState(initOpen);

  const toggle = (prefix: string) => setOpenGroups((o) => ({ ...o, [prefix]: !o[prefix] }));

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  const linkClass =
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors";
  const activeClass = "bg-primary/10 text-primary font-medium";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-foreground truncate">点位拓展管理</span>
        )}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={collapsed ? item.title : undefined}>
                    <NavLink to={item.url} end={item.url === "/"} className={linkClass} activeClassName={activeClass}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {menuGroups.map((group) => {
                const groupActive = group.children.some((c) => location.pathname.startsWith(c.url));
                const isOpen = openGroups[group.prefix];
                return (
                  <div key={group.prefix}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip={collapsed ? group.title : undefined}
                        isActive={groupActive}
                        onClick={() => toggle(group.prefix)}
                        className={cn(linkClass, "cursor-pointer justify-between", groupActive && activeClass)}
                      >
                        <div className="flex items-center gap-2">
                          <group.icon className="h-4 w-4 shrink-0" />
                          {!collapsed && <span>{group.title}</span>}
                        </div>
                        {!collapsed && (
                          <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    {(isOpen || collapsed) &&
                      group.children.map((child) => (
                        <SidebarMenuItem key={child.url}>
                          <SidebarMenuButton asChild isActive={isActive(child.url)} tooltip={collapsed ? child.title : undefined}>
                            <NavLink to={child.url} className={cn(linkClass, !collapsed && "pl-9")} activeClassName={activeClass}>
                              <child.icon className="h-4 w-4 shrink-0" />
                              {!collapsed && <span>{child.title}</span>}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
