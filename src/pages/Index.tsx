import {
  ClipboardCheck,
  FileSignature,
  Wrench,
  PenLine,
  Zap,
  Lightbulb,
  Footprints,
  Search,
  AlertTriangle,
  Package,
  Power,
} from "lucide-react";
import TodoCard from "@/components/dashboard/TodoCard";
import KpiCard from "@/components/dashboard/KpiCard";
import AnnouncementSection from "@/components/dashboard/AnnouncementSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold text-card-foreground">点位拓展管理系统</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              管
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
        {/* Section 1: Todos */}
        <section>
          <h2 className="text-base font-semibold text-card-foreground mb-4">个人待办</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <TodoCard title="待审核勘察" count={12} icon={ClipboardCheck} variant="warning" />
            <TodoCard title="待审核签约" count={5} icon={FileSignature} variant="warning" />
            <TodoCard title="待派工" count={8} icon={Wrench} variant="primary" />
          </div>
        </section>

        {/* Section 2: KPIs */}
        <section>
          <h2 className="text-base font-semibold text-card-foreground mb-4">今日数据概览</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard title="今日签约数" value={23} unit="个" icon={PenLine} trend={{ value: 12, direction: "up" }} />
            <KpiCard title="今日激活数" value={18} unit="个" icon={Power} trend={{ value: 5, direction: "up" }} />
            <KpiCard title="今日新增商机" value={45} unit="个" icon={Lightbulb} trend={{ value: 8, direction: "up" }} />
            <KpiCard title="今日拜访数" value={67} unit="次" icon={Footprints} trend={{ value: 3, direction: "down" }} />
            <KpiCard title="今日勘察数" value={15} unit="次" icon={Search} />
            <KpiCard title="异常拜访数" value={4} unit="次" icon={AlertTriangle} variant="danger" />
            <KpiCard title="待签约设备数" value={32} unit="个" icon={Package} variant="warning" />
            <KpiCard title="待激活设备数" value={19} unit="个" icon={Zap} variant="warning" />
          </div>
        </section>

        {/* Section 3: Announcements */}
        <section>
          <AnnouncementSection />
        </section>
      </main>
    </div>
  );
};

export default Index;
