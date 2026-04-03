import { useState } from "react";
import {
  Users, MapPin, Monitor, DollarSign,
  Search, FileSignature, Wrench, Zap, CheckCircle,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import PageHeader from "@/components/shared/PageHeader";

const kpis = [
  { title: "客户数", value: "1,286", unit: "个", icon: Users },
  { title: "点位数", value: "3,452", unit: "个", icon: MapPin },
  { title: "运营设备数", value: "2,890", unit: "台", icon: Monitor },
  { title: "总营业额", value: "¥1,285,600", unit: "元", icon: DollarSign },
];

const bdRanking = [
  { name: "赵静", value: 68 },
  { name: "李明", value: 62 },
  { name: "周伟", value: 55 },
  { name: "陈磊", value: 48 },
  { name: "张晓", value: 42 },
];

const teamRanking = [
  { name: "北京一组", value: 85 },
  { name: "上海一组", value: 78 },
  { name: "杭州一组", value: 72 },
  { name: "深圳一组", value: 65 },
];

const cityRanking = [
  { name: "北京", value: 92 },
  { name: "上海", value: 85 },
  { name: "杭州", value: 68 },
  { name: "深圳", value: 60 },
  { name: "广州", value: 52 },
];

const revenueRanking = [
  { name: "万达-杭州西溪", value: 280000 },
  { name: "瑞幸-望京SOHO", value: 220000 },
  { name: "星巴克-国贸店", value: 185000 },
  { name: "全家-浦东新区", value: 120000 },
  { name: "海底捞-朝阳店", value: 95000 },
];

const statusCards = [
  { title: "待勘察数", value: 18, variant: "warning" as const, icon: Search },
  { title: "待签约数", value: 12, variant: "warning" as const, icon: FileSignature },
  { title: "待安装数", value: 8, variant: "warning" as const, icon: Wrench },
  { title: "待激活数", value: 15, variant: "warning" as const, icon: Zap },
  { title: "已激活数", value: 142, variant: "success" as const, icon: CheckCircle },
];

const variantBorder = { warning: "border-l-warning", success: "border-l-success" };
const variantText = { warning: "text-warning", success: "text-success" };
const variantIconBg = { warning: "bg-warning/10", success: "bg-success/10" };

const RankingChart = ({ data, title, color = "hsl(211, 100%, 36%)" }: { data: { name: string; value: number }[]; title: string; color?: string }) => (
  <div className="rounded-lg border border-border bg-card p-5">
    <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical" margin={{ left: 60, right: 20, top: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(220, 13%, 91%)" />
        <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" width={56} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
        <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} barSize={16} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const TopList = ({ data, title, prefix = "¥" }: { data: { name: string; value: number }[]; title: string; prefix?: string }) => (
  <div className="rounded-lg border border-border bg-card p-5">
    <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={item.name} className="flex items-center gap-3">
          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i < 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {i + 1}
          </span>
          <span className="flex-1 text-sm truncate">{item.name}</span>
          <span className="text-sm font-medium tabular-nums">{prefix}{item.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  </div>
);

const OperationsDashboard = () => {
  const [period, setPeriod] = useState("month");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="运营看板" description="核心业务数据概览" />
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="today">本日</SelectItem>
            <SelectItem value="week">本周</SelectItem>
            <SelectItem value="month">本月</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{kpi.title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[28px] font-bold leading-none text-foreground">{kpi.value}</span>
                  <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                </div>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion & Revenue Rankings */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-4">转化率排行</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RankingChart data={bdRanking} title="BD转化率排行（%）" />
          <RankingChart data={teamRanking} title="团队转化率排行（%）" />
          <RankingChart data={cityRanking} title="城市转化率排行（%）" />
          <TopList data={revenueRanking} title="点位营业额排行（Top 5）" />
        </div>
      </div>

      {/* Status Cards */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-4">业务状态</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statusCards.map((card) => (
            <div key={card.title} className={`rounded-lg border border-border bg-card p-5 border-l-4 ${variantBorder[card.variant]}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${variantIconBg[card.variant]}`}>
                  <card.icon className={`h-5 w-5 ${variantText[card.variant]}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${variantText[card.variant]}`}>{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OperationsDashboard;
