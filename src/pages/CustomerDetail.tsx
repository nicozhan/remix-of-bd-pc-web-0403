import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin, FileText, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";
import ActivityTimeline from "@/components/shared/ActivityTimeline";

const SourceTag = ({ source }: { source: "昆仑智服" | "人人取" }) => (
  <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${source === "昆仑智服" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>
    {source}
  </span>
);

const customer = {
  id: "C001",
  name: "星巴克（中国）",
  code: "KH-20251201-001",
  contact: "张经理",
  phone: "138****1234",
  email: "zhang@starbucks.cn",
  address: "北京市朝阳区建国路88号",
  bd: "李明",
  level: "A级",
  industry: "餐饮",
  source: "BD拓展",
  created: "2025-12-01",
  activeDevices: 8,
  pendingActivation: 2,
  pendingInstall: 2,
};

const contacts = [
  { name: "张经理", role: "区域负责人", phone: "138****1234", email: "zhang@starbucks.cn" },
  { name: "李助理", role: "行政对接", phone: "139****5678", email: "li@starbucks.cn" },
];

const activities = [
  { id: "1", user: "李明", action: "添加了跟进记录", time: "2026-04-02 14:30", content: "电话沟通设备入驻方案，客户有意向在国贸店试点", type: "拜访" as const },
  { id: "2", user: "李明", action: "完成了现场勘察", time: "2026-03-28 10:00", content: "实地勘察国贸店，门店面积120㎡，可放置2台设备", type: "勘察" as const },
  { id: "3", user: "张伟", action: "设备安装完成", time: "2026-03-20 15:00", content: "望京SOHO店2台设备安装调试完毕", type: "安装" as const },
  { id: "4", user: "赵静", action: "新建商机", time: "2026-03-15 09:30", content: "星巴克-三里屯店设备入驻商机", type: "商机" as const },
  { id: "5", user: "赵静", action: "创建了客户", time: "2025-12-01 09:00", type: "拜访" as const },
];

const opportunities = [
  { id: "O001", name: "星巴克-国贸店设备入驻", status: "跟进中", bd: "李明", created: "2026-03-15" },
  { id: "O002", name: "星巴克-三里屯店设备入驻", status: "勘察中", bd: "李明", created: "2026-03-20" },
  { id: "O003", name: "星巴克-西单大悦城店", status: "签约中", bd: "赵静", created: "2026-03-25" },
];

const pointsData = [
  { installTime: "2026-03-10", activateTime: "2026-03-12", name: "国贸店-1号机", code: "PW-001", address: "北京市朝阳区建国路88号1层", status: "运营中", revenue: "3,200", dailyRevenue: "120", totalRevenue: "15,600" },
  { installTime: "2026-03-10", activateTime: "2026-03-13", name: "国贸店-2号机", code: "PW-002", address: "北京市朝阳区建国路88号2层", status: "运营中", revenue: "2,800", dailyRevenue: "95", totalRevenue: "12,400" },
  { installTime: "2026-03-18", activateTime: "—", name: "望京SOHO-1号机", code: "PW-003", address: "北京市朝阳区望京SOHO T1", status: "待激活", revenue: "0", dailyRevenue: "0", totalRevenue: "0" },
];

const competitors = [
  { company: "友宝", intro: "国内领先的自动售货机运营商", projectIntro: "已在国贸店部署3台售货机，租金方案为月租3000元，合同期2年。", proscons: "优势：品牌知名度高、网点多；劣势：设备老旧、品类单一" },
];

const contracts = [
  { id: "HT-001", name: "星巴克-望京SOHO设备入驻合同", status: "已签约", signDate: "2026-03-05", amount: "¥36,000/年" },
];

const typeIcons: Record<string, string> = { "拜访": "🚶", "商机": "💼", "勘察": "🔍", "安装": "🔧" };

const CustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate("/customers")}>
        <ArrowLeft className="h-4 w-4 mr-1" />返回列表
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Info card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">{customer.name}</h2>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">{customer.code}</p>
              <StatusBadge status={customer.level} type="warning" className="mt-1" />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />{customer.phone}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" />{customer.email}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" />{customer.address}</div>
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">所属BD</span><span>{customer.bd}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">行业</span><span>{customer.industry}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">来源</span><span>{customer.source}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">创建时间</span><span>{customer.created}</span></div>
            </div>
          </div>

          {/* 设备概览 */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">设备概览</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 rounded-md bg-success/10">
                <p className="text-lg font-bold text-success">{customer.activeDevices}</p>
                <p className="text-[11px] text-muted-foreground">已激活</p>
              </div>
              <div className="text-center p-2 rounded-md bg-warning/10">
                <p className="text-lg font-bold text-warning">{customer.pendingActivation}</p>
                <p className="text-[11px] text-muted-foreground">待激活</p>
              </div>
              <div className="text-center p-2 rounded-md bg-primary/10">
                <p className="text-lg font-bold text-primary">{customer.pendingInstall}</p>
                <p className="text-[11px] text-muted-foreground">待安装</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="follow" className="space-y-4">
            <TabsList className="flex-wrap">
              <TabsTrigger value="follow">跟进动态</TabsTrigger>
              <TabsTrigger value="contacts">联系人</TabsTrigger>
              <TabsTrigger value="opportunities">商机</TabsTrigger>
              <TabsTrigger value="points">点位信息</TabsTrigger>
              <TabsTrigger value="compete">竞对信息</TabsTrigger>
              <TabsTrigger value="contracts">合同</TabsTrigger>
            </TabsList>

            {/* 跟进动态 - enhanced timeline */}
            <TabsContent value="follow" className="rounded-lg border border-border bg-card p-5">
              <div className="space-y-0">
                {activities.map((act, i) => (
                  <div key={act.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs">
                        {typeIcons[act.type] || "📋"}
                      </div>
                      {i < activities.length - 1 && <div className="w-0.5 flex-1 min-h-[16px] bg-border" />}
                    </div>
                    <div className="pb-5 pt-0.5">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{act.user}</span>{" "}
                          <span className="text-muted-foreground">{act.action}</span>
                        </p>
                        <StatusBadge status={act.type} type="default" />
                      </div>
                      <p className="text-xs text-muted-foreground">{act.time}</p>
                      {act.content && (
                        <p className="text-sm text-muted-foreground mt-1 bg-muted rounded px-2 py-1">{act.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* 联系人 */}
            <TabsContent value="contacts" className="rounded-lg border border-border bg-card p-5">
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.name} className="flex items-center justify-between p-3 rounded-md bg-accent/30">
                    <div>
                      <p className="text-sm font-medium">{c.name} <span className="text-xs text-muted-foreground ml-1">{c.role}</span></p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.phone} · {c.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* 商机 */}
            <TabsContent value="opportunities" className="rounded-lg border border-border bg-card p-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商机名称</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>BD</TableHead>
                    <TableHead>创建时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((o) => (
                    <TableRow key={o.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/opportunities/${o.id}`)}>
                      <TableCell className="font-medium text-primary">{o.name}</TableCell>
                      <TableCell><StatusBadge status={o.status} /></TableCell>
                      <TableCell>{o.bd}</TableCell>
                      <TableCell className="text-muted-foreground">{o.created}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* 点位信息 - with source tags */}
            <TabsContent value="points" className="rounded-lg border border-border bg-card p-5">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>安装时间 <SourceTag source="昆仑智服" /></TableHead>
                      <TableHead>激活时间 <SourceTag source="人人取" /></TableHead>
                      <TableHead>点位名称 <SourceTag source="人人取" /></TableHead>
                      <TableHead>点位编码 <SourceTag source="人人取" /></TableHead>
                      <TableHead>点位地址 <SourceTag source="人人取" /></TableHead>
                      <TableHead>状态 <SourceTag source="人人取" /></TableHead>
                      <TableHead className="text-right">营业额 <SourceTag source="人人取" /></TableHead>
                      <TableHead className="text-right">日均 <SourceTag source="人人取" /></TableHead>
                      <TableHead className="text-right">汇总 <SourceTag source="人人取" /></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pointsData.map((p, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-muted-foreground">{p.installTime}</TableCell>
                        <TableCell className="text-muted-foreground">{p.activateTime}</TableCell>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground">{p.code}</TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[140px] truncate">{p.address}</TableCell>
                        <TableCell><StatusBadge status={p.status} type={p.status === "运营中" ? "success" : "warning"} /></TableCell>
                        <TableCell className="text-right">¥{p.revenue}</TableCell>
                        <TableCell className="text-right">¥{p.dailyRevenue}</TableCell>
                        <TableCell className="text-right font-semibold text-primary">¥{p.totalRevenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* 竞对信息 */}
            <TabsContent value="compete" className="rounded-lg border border-border bg-card p-5">
              <div className="space-y-3">
                {competitors.map((c, i) => (
                  <div key={i} className="p-4 rounded-md bg-accent/30 space-y-2">
                    <p className="text-sm font-semibold">{c.company}</p>
                    <p className="text-xs text-muted-foreground">{c.intro}</p>
                    <div className="border-t border-border pt-2 space-y-1">
                      <p className="text-xs"><span className="text-muted-foreground">项目：</span>{c.projectIntro}</p>
                      <p className="text-xs"><span className="text-muted-foreground">优劣势：</span>{c.proscons}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* 合同 */}
            <TabsContent value="contracts" className="rounded-lg border border-border bg-card p-5">
              <div className="space-y-3">
                {contracts.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-md bg-accent/30">
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">签约日期：{c.signDate} · 金额：{c.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={c.status} />
                      <Button variant="outline" size="sm"><Eye className="h-3.5 w-3.5 mr-1" />查看合同</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
