import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/shared/StatusBadge";
import ActivityTimeline from "@/components/shared/ActivityTimeline";

const customer = {
  id: "C001",
  name: "星巴克（中国）",
  contact: "张经理",
  phone: "138****1234",
  email: "zhang@starbucks.cn",
  address: "北京市朝阳区建国路88号",
  bd: "李明",
  type: "连锁品牌",
  industry: "餐饮",
  source: "BD拓展",
  created: "2025-12-01",
};

const contacts = [
  { name: "张经理", role: "区域负责人", phone: "138****1234", email: "zhang@starbucks.cn" },
  { name: "李助理", role: "行政对接", phone: "139****5678", email: "li@starbucks.cn" },
];

const activities = [
  { id: "1", user: "李明", action: "添加了跟进记录", time: "2026-04-02 14:30", content: "电话沟通设备入驻方案，客户有意向在国贸店试点" },
  { id: "2", user: "李明", action: "完成了现场拜访", time: "2026-03-28 10:00", content: "实地勘察国贸店，门店面积120㎡，可放置2台设备" },
  { id: "3", user: "赵静", action: "创建了客户", time: "2025-12-01 09:00" },
];

const opportunities = [
  { id: "O001", name: "星巴克-国贸店设备入驻", status: "跟进中", created: "2026-03-15" },
  { id: "O002", name: "星巴克-三里屯店设备入驻", status: "勘察中", created: "2026-03-20" },
  { id: "O003", name: "星巴克-西单大悦城店", status: "签约中", created: "2026-03-25" },
];

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
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card p-5 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">{customer.name}</h2>
              <StatusBadge status={customer.type} type="default" className="mt-1" />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />{customer.phone}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />{customer.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />{customer.address}
              </div>
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">所属BD</span><span>{customer.bd}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">行业</span><span>{customer.industry}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">来源</span><span>{customer.source}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">创建时间</span><span>{customer.created}</span></div>
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
              <TabsTrigger value="compete">竞对信息</TabsTrigger>
              <TabsTrigger value="contracts">合同</TabsTrigger>
              <TabsTrigger value="points">点位信息</TabsTrigger>
            </TabsList>

            <TabsContent value="follow" className="rounded-lg border border-border bg-card p-5">
              <ActivityTimeline activities={activities} />
            </TabsContent>

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

            <TabsContent value="opportunities" className="rounded-lg border border-border bg-card p-5">
              <div className="space-y-3">
                {opportunities.map((o) => (
                  <div key={o.id} className="flex items-center justify-between p-3 rounded-md bg-accent/30 cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/opportunities/${o.id}`)}>
                    <div>
                      <p className="text-sm font-medium text-primary">{o.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">创建于 {o.created}</p>
                    </div>
                    <StatusBadge status={o.status} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compete" className="rounded-lg border border-border bg-card p-5">
              <div className="p-3 rounded-md bg-accent/30">
                <p className="text-sm font-medium">友宝</p>
                <p className="text-xs text-muted-foreground mt-1">已在国贸店部署3台售货机，租金方案为月租3000元，合同期2年。</p>
              </div>
            </TabsContent>

            <TabsContent value="contracts" className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
              暂无合同记录
            </TabsContent>

            <TabsContent value="points" className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
              暂无点位信息
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
