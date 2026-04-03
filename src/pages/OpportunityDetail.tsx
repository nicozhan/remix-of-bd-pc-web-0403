import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Search, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/shared/StatusBadge";
import ActivityTimeline from "@/components/shared/ActivityTimeline";

const opp = {
  id: "O001",
  name: "星巴克-国贸店设备入驻",
  customer: "星巴克（中国）",
  status: "跟进中",
  bd: "李明",
  city: "北京",
  address: "北京市朝阳区建国路88号 国贸商城B1",
  scene: "商场/写字楼",
  created: "2026-03-15",
};

const activities = [
  { id: "1", user: "李明", action: "添加了跟进记录", time: "2026-04-02 14:30", content: "确认设备摆放位置，客户同意试点方案" },
  { id: "2", user: "李明", action: "完成了现场拜访", time: "2026-03-28 10:00", content: "勘察店面环境，适合放置2台设备" },
  { id: "3", user: "李明", action: "创建了商机", time: "2026-03-15 09:00" },
];

const compete = [
  { name: "友宝", detail: "已部署3台售货机，月租3000元/台" },
  { name: "魔便利", detail: "曾接洽但未合作" },
];

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
          </div>
          <p className="text-sm text-muted-foreground mt-1">客户：{opp.customer} · {opp.city}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Search className="h-4 w-4 mr-1" />发起勘察</Button>
          <Button size="sm"><FileSignature className="h-4 w-4 mr-1" />发起签约</Button>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">基础信息</TabsTrigger>
          <TabsTrigger value="follow">跟进动态</TabsTrigger>
          <TabsTrigger value="compete">竞对介绍</TabsTrigger>
          <TabsTrigger value="contracts">合同信息</TabsTrigger>
          <TabsTrigger value="points">点位信息</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="rounded-lg border border-border bg-card p-5">
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div><span className="text-muted-foreground">商机名称</span><p className="mt-0.5 font-medium">{opp.name}</p></div>
            <div><span className="text-muted-foreground">客户名称</span><p className="mt-0.5 font-medium">{opp.customer}</p></div>
            <div><span className="text-muted-foreground">所属BD</span><p className="mt-0.5 font-medium">{opp.bd}</p></div>
            <div><span className="text-muted-foreground">城市</span><p className="mt-0.5 font-medium">{opp.city}</p></div>
            <div><span className="text-muted-foreground">场景类型</span><p className="mt-0.5 font-medium">{opp.scene}</p></div>
            <div><span className="text-muted-foreground">详细地址</span><p className="mt-0.5 font-medium">{opp.address}</p></div>
            <div><span className="text-muted-foreground">创建时间</span><p className="mt-0.5 font-medium">{opp.created}</p></div>
          </div>
        </TabsContent>

        <TabsContent value="follow" className="rounded-lg border border-border bg-card p-5">
          <ActivityTimeline activities={activities} />
        </TabsContent>

        <TabsContent value="compete" className="rounded-lg border border-border bg-card p-5 space-y-3">
          {compete.map((c) => (
            <div key={c.name} className="p-3 rounded-md bg-accent/30">
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.detail}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="contracts" className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
          暂无合同信息
        </TabsContent>

        <TabsContent value="points" className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
          暂无点位信息
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OpportunityDetail;
