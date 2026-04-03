import {
  Users, Lightbulb, UserPlus, Footprints,
  AlertTriangle, UserX, FileX, Search,
  FileSignature, Wrench, Zap, Clock, Handshake,
  MapPin,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: typeof Users;
  variant?: "default" | "danger" | "warning";
}

const vStyles = {
  default: { text: "text-foreground", iconBg: "bg-primary/10", iconColor: "text-primary", border: "" },
  danger: { text: "text-destructive", iconBg: "bg-destructive/10", iconColor: "text-destructive", border: "border-l-4 border-l-destructive" },
  warning: { text: "text-warning", iconBg: "bg-warning/10", iconColor: "text-warning", border: "border-l-4 border-l-warning" },
};

const MetricCard = ({ title, value, icon: Icon, variant = "default" }: MetricCardProps) => {
  const s = vStyles[variant];
  return (
    <div className={`rounded-lg border border-border bg-card p-5 ${s.border}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${s.iconBg}`}>
          <Icon className={`h-5 w-5 ${s.iconColor}`} />
        </div>
        <div>
          <p className={`text-2xl font-bold ${s.text}`}>{value}</p>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
};

const MonitoringDashboard = () => {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
      <PageHeader title="监控看板" description="实时运营监控与异常预警" />

      {/* Real-time metrics */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">实时指标</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="BD人数" value={42} icon={Users} />
          <MetricCard title="今日新增商机" value={15} icon={Lightbulb} />
          <MetricCard title="今日新增客户" value={8} icon={UserPlus} />
          <MetricCard title="今日拜访数" value={67} icon={Footprints} />
        </div>
      </section>

      {/* Anomaly monitoring */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">行为异常监控</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="今日未拜访BD" value={5} icon={UserX} variant="danger" />
          <MetricCard title="昨日未拜访BD" value={3} icon={UserX} variant="danger" />
          <MetricCard title="昨日未填写日报BD" value={7} icon={FileX} variant="danger" />
          <MetricCard title="异常拜访数" value={4} icon={AlertTriangle} variant="danger" />
        </div>
      </section>

      {/* Business risk */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">业务风险指标</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="待勘察数" value={18} icon={Search} variant="warning" />
          <MetricCard title="待签约数" value={12} icon={FileSignature} variant="warning" />
          <MetricCard title="待安装数" value={8} icon={Wrench} variant="warning" />
          <MetricCard title="待激活数" value={15} icon={Zap} variant="warning" />
        </div>
      </section>

      {/* Long-cycle risk */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">长周期风险指标</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="7天未拜访客户数" value={23} icon={Clock} variant="danger" />
          <MetricCard title="15天未签约商机数" value={9} icon={FileSignature} variant="danger" />
          <MetricCard title="已安装未签约商机" value={4} icon={AlertTriangle} variant="danger" />
          <MetricCard title="签约次月未对账商机" value={6} icon={AlertTriangle} variant="warning" />
        </div>
      </section>

      {/* Special business data */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">特殊业务数据</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="居间人落地商机数" value={11} icon={Handshake} />
          <MetricCard title="居间人落地点位数" value={28} icon={MapPin} />
        </div>
      </section>
    </div>
  );
};

export default MonitoringDashboard;
