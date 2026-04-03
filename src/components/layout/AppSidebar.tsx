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
];

const assessmentChildren = [
  { title: "绩效目标管理", url: "/assessment/goals", icon: Target },
  { title: "指标结果查询", url: "/assessment/results", icon: BarChart3 },
  { title: "抽检管理", url: "/assessment/audit", icon: ShieldCheck },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isAssessmentActive = assessmentChildren.some((c) =>
    location.pathname.startsWith(c.url)
  );

  const [assessmentOpen, setAssessmentOpen] = useState(isAssessmentActive);

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
          <span className="text-sm font-semibold text-foreground truncate">
            点位拓展管理
          </span>
        )}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={linkClass}
                      activeClassName={activeClass}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* 考核管理 - collapsible group */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={collapsed ? "考核管理" : undefined}
                  isActive={isAssessmentActive}
                  onClick={() => setAssessmentOpen((o) => !o)}
                  className={cn(
                    linkClass,
                    "cursor-pointer justify-between",
                    isAssessmentActive && activeClass
                  )}
                >
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>考核管理</span>}
                  </div>
                  {!collapsed && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-muted-foreground transition-transform",
                        assessmentOpen && "rotate-180"
                      )}
                    />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Sub items */}
              {(assessmentOpen || collapsed) &&
                assessmentChildren.map((child) => (
                  <SidebarMenuItem key={child.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(child.url)}
                      tooltip={collapsed ? child.title : undefined}
                    >
                      <NavLink
                        to={child.url}
                        className={cn(linkClass, !collapsed && "pl-9")}
                        activeClassName={activeClass}
                      >
                        <child.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{child.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
