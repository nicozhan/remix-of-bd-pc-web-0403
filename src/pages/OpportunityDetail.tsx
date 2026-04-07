import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Search, FileSignature, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";

const SourceTag = ({ source }: { source: "昆仑智服" | "人人取" }) => (
  <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${source === "昆仑智服" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>
    {source}
  </span>
);

const opp = {
  id: "O001",
  name: "星巴克-国贸店设备入驻",
  code: "SJ-20260315-001",
  customer: "星巴克（中国）",
  customerId: "C001",
  ocean: "私海",
  contact: "张经理",
  contactPhone: "138****1234",
  contactPosition: "区域负责人",
  level: "B",
  sceneType: "一般商业场景",
  segment: "商业类-景区",
  description: "星巴克国贸店计划入驻2台智能售货设备，位于B1层和1层入口处。客户对设备品类有特殊要求，需要提供咖啡周边和轻食品类。",
  status: "跟进中",
  bd: "李明",
  city: "北京",
  created: "2026-03-15",
};

const activities = [
  { id: "1", user: "李明", action: "添加了跟进记录", time: "2026-04-02 14:30", content: "确认设备摆放位置，客户同意试点方案", type: "拜访" },
  { id: "2", user: "李明", action: "完成了现场勘察", time: "2026-03-28 10:00", content: "勘察店面环境，适合放置2台设备", type: "勘察" },
  { id: "3", user: "赵静", action: "更新商机状态", time: "2026-03-20 11:00", content: "客户意向确认，进入方案设计阶段", type: "商机" },
  { id: "4", user: "李明", action: "创建了商机", time: "2026-03-15 09:00", type: "商机" },
];

const competitors = [
  { company: "友宝", intro: "国内领先的自动售货机运营商", projectIntro: "已在国贸店部署3台售货机，月租3000元/台，合同期2年", proscons: "优势：品牌知名度高、网点多；劣势：设备老旧、品类单一" },
  { company: "魔便利", intro: "智能零售解决方案提供商", projectIntro: "曾接洽但未达成合作，主要因价格问题", proscons: "优势：设备新、智能化程度高；劣势：售后响应慢" },
];

const contracts = [
  { id: "HT-001", name: "星巴克-望京SOHO设备入驻合同", status: "已签约", signDate: "2026-03-05", amount: "¥36,000/年" },
];

const pointsData = [
  { installTime: "2026-03-10", activateTime: "2026-03-12", name: "国贸店-1号机", code: "PW-001", address: "北京市朝阳区建国路88号1层", status: "运营中", revenue: "3,200", dailyRevenue: "120", totalRevenue: "15,600" },
  { installTime: "2026-03-10", activateTime: "2026-03-13", name: "国贸店-2号机", code: "PW-002", address: "北京市朝阳区建国路88号2层", status: "运营中", revenue: "2,800", dailyRevenue: "95", totalRevenue: "12,400" },
];

const typeIcons: Record<string, string> = { "拜访": "🚶", "商机": "💼", "勘察": "🔍", "签约": "📝" };

const OpportunityDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate("/customers")}>
        <ArrowLeft className="h-4 w-4 mr-1" />返回列表
      </Button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-foreground">{opp.name}</h1>
            <StatusBadge status={opp.status} />
            <StatusBadge status={opp.ocean} type={opp.ocean === "公海" ? "warning" : "primary"} />
            <StatusBadge status={`${opp.level}级`} type={opp.level === "A" ? "danger" : opp.level === "B" ? "warning" : "default"} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            客户：
            <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate(`/customers/${opp.customerId}`)}>
              {opp.customer}
            </span>
            {" "}· {opp.city} · {opp.code}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Search className="h-4 w-4 mr-1" />发起勘察</Button>
          <Button size="sm"><FileSignature className="h-4 w-4 mr-1" />发起签约</Button>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="info">基础信息</TabsTrigger>
          <TabsTrigger value="follow">跟进动态</TabsTrigger>
          <TabsTrigger value="compete">竞对信息</TabsTrigger>
          <TabsTrigger value="contracts">合同</TabsTrigger>
          <TabsTrigger value="points">点位信息</TabsTrigger>
        </TabsList>

        {/* 基础信息 */}
        <TabsContent value="info" className="rounded-lg border border-border bg-card p-5">
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div><span className="text-muted-foreground">商机名称</span><p className="mt-0.5 font-medium">{opp.name}</p></div>
            <div><span className="text-muted-foreground">商机编号</span><p className="mt-0.5 font-medium font-mono text-xs">{opp.code}</p></div>
            <div>
              <span className="text-muted-foreground">客户名称</span>
              <p className="mt-0.5 font-medium text-primary cursor-pointer hover:underline flex items-center gap-1" onClick={() => navigate(`/customers/${opp.customerId}`)}>
                {opp.customer}<ExternalLink className="h-3 w-3" />
              </p>
            </div>
            <div><span className="text-muted-foreground">客户海域</span><p className="mt-0.5"><StatusBadge status={opp.ocean} type={opp.ocean === "公海" ? "warning" : "primary"} /></p></div>
            <div><span className="text-muted-foreground">联系人</span><p className="mt-0.5 font-medium">{opp.contact}（{opp.contactPosition}）</p></div>
            <div><span className="text-muted-foreground">联系电话</span><p className="mt-0.5 font-medium">{opp.contactPhone}</p></div>
            <div><span className="text-muted-foreground">商机等级</span><p className="mt-0.5"><StatusBadge status={`${opp.level}级`} type={opp.level === "A" ? "danger" : opp.level === "B" ? "warning" : "default"} /></p></div>
            <div><span className="text-muted-foreground">点位场景类型</span><p className="mt-0.5 font-medium">{opp.sceneType}</p></div>
            <div><span className="text-muted-foreground">细分市场</span><p className="mt-0.5 font-medium">{opp.segment}</p></div>
            <div><span className="text-muted-foreground">所属BD</span><p className="mt-0.5 font-medium">{opp.bd}</p></div>
            <div><span className="text-muted-foreground">创建时间</span><p className="mt-0.5 font-medium">{opp.created}</p></div>
          </div>
          {opp.description && (
            <div className="mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">商机描述</span>
              <p className="mt-1 text-sm bg-muted rounded px-3 py-2">{opp.description}</p>
            </div>
          )}
        </TabsContent>

        {/* 跟进动态 */}
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

        {/* 竞对信息 */}
        <TabsContent value="compete" className="rounded-lg border border-border bg-card p-5 space-y-3">
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
        </TabsContent>

        {/* 合同 */}
        <TabsContent value="contracts" className="rounded-lg border border-border bg-card p-5">
          {contracts.length > 0 ? (
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
          ) : (
            <p className="text-sm text-muted-foreground">暂无合同信息</p>
          )}
        </TabsContent>

        {/* 点位信息 */}
        <TabsContent value="points" className="rounded-lg border border-border bg-card p-5">
          {pointsData.length > 0 ? (
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
          ) : (
            <p className="text-sm text-muted-foreground">暂无点位信息</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OpportunityDetail;
