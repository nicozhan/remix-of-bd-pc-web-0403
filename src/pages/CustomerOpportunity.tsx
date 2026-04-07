import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Download, Search as SearchIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";

const customers = [
  { id: "C001", name: "星巴克（中国）", contact: "张经理", phone: "138****1234", bd: "李明", type: "连锁品牌", opportunities: 3, contracts: 1, points: 12, revenue: "45,000", updated: "2026-04-02" },
  { id: "C002", name: "瑞幸咖啡", contact: "王总", phone: "139****5678", bd: "赵静", type: "连锁品牌", opportunities: 5, contracts: 2, points: 28, revenue: "120,000", updated: "2026-04-01" },
  { id: "C003", name: "全家便利店", contact: "陈店长", phone: "137****9012", bd: "李明", type: "便利店", opportunities: 2, contracts: 1, points: 8, revenue: "18,000", updated: "2026-03-30" },
  { id: "C004", name: "海底捞火锅", contact: "刘经理", phone: "136****3456", bd: "周伟", type: "餐饮", opportunities: 1, contracts: 0, points: 0, revenue: "0", updated: "2026-03-28" },
  { id: "C005", name: "万达广场", contact: "孙总", phone: "135****7890", bd: "赵静", type: "商业综合体", opportunities: 8, contracts: 3, points: 45, revenue: "280,000", updated: "2026-04-03" },
];

const opportunities = [
  { id: "O001", name: "星巴克-国贸店设备入驻", customer: "星巴克（中国）", status: "跟进中", bd: "李明", city: "北京", ocean: false, lastFollow: "2026-04-02", created: "2026-03-15" },
  { id: "O002", name: "瑞幸-望京SOHO批量部署", customer: "瑞幸咖啡", status: "勘察中", bd: "赵静", city: "北京", ocean: false, lastFollow: "2026-04-01", created: "2026-03-10" },
  { id: "O003", name: "全家-浦东新区5店", customer: "全家便利店", status: "签约中", bd: "李明", city: "上海", ocean: false, lastFollow: "2026-03-30", created: "2026-02-20" },
  { id: "O004", name: "海底捞-朝阳大悦城店", customer: "海底捞火锅", status: "跟进中", bd: "周伟", city: "北京", ocean: true, lastFollow: "2026-03-15", created: "2026-01-10" },
  { id: "O005", name: "万达-杭州西溪店", customer: "万达广场", status: "已签约", bd: "赵静", city: "杭州", ocean: false, lastFollow: "2026-04-03", created: "2026-03-01" },
  { id: "O006", name: "瑞幸-中关村店", customer: "瑞幸咖啡", status: "失败", bd: "赵静", city: "北京", ocean: false, lastFollow: "2026-02-28", created: "2026-01-05" },
];

const CustomerOpportunity = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader title="客户与商机管理" />

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">客户列表</TabsTrigger>
          <TabsTrigger value="opportunities">商机列表</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索名称 / 联系人 / 电话" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="城市" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="beijing">北京</SelectItem>
                <SelectItem value="shanghai">上海</SelectItem>
                <SelectItem value="hangzhou">杭州</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="所属BD" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="lm">李明</SelectItem>
                <SelectItem value="zj">赵静</SelectItem>
                <SelectItem value="zw">周伟</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />导出</Button>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" />新建客户</Button>
          </div>

          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户名称</TableHead>
                  <TableHead>联系人</TableHead>
                  <TableHead>电话</TableHead>
                  <TableHead>所属BD</TableHead>
                  <TableHead>客户类型</TableHead>
                  <TableHead className="text-right">商机数</TableHead>
                  <TableHead className="text-right">合同数</TableHead>
                  <TableHead className="text-right">点位数</TableHead>
                  <TableHead className="text-right">营业额</TableHead>
                  <TableHead>更新时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((c) => (
                  <TableRow key={c.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/customers/${c.id}`)}>
                    <TableCell className="font-medium text-primary">{c.name}</TableCell>
                    <TableCell>{c.contact}</TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.bd}</TableCell>
                    <TableCell><StatusBadge status={c.type} type="default" /></TableCell>
                    <TableCell className="text-right">{c.opportunities}</TableCell>
                    <TableCell className="text-right">{c.contracts}</TableCell>
                    <TableCell className="text-right">{c.points}</TableCell>
                    <TableCell className="text-right">¥{c.revenue}</TableCell>
                    <TableCell className="text-muted-foreground">{c.updated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
              <span>共 {customers.length} 条记录</span>
              <span>第 1 / 1 页</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索商机名称 / 客户名称" className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="状态" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="follow">跟进中</SelectItem>
                <SelectItem value="survey">勘察中</SelectItem>
                <SelectItem value="sign">签约中</SelectItem>
                <SelectItem value="done">已签约</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />导出</Button>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" />新建商机</Button>
          </div>

          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商机名称</TableHead>
                  <TableHead>客户名称</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>所属BD</TableHead>
                  <TableHead>城市</TableHead>
                  <TableHead>公海提醒</TableHead>
                  <TableHead>最后跟进</TableHead>
                  <TableHead>创建时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map((o) => (
                  <TableRow key={o.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/opportunities/${o.id}`)}>
                    <TableCell className="font-medium text-primary">{o.name}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell><StatusBadge status={o.status} /></TableCell>
                    <TableCell>{o.bd}</TableCell>
                    <TableCell>{o.city}</TableCell>
                    <TableCell>{o.ocean ? <StatusBadge status="即将转公海" type="warning" /> : "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{o.lastFollow}</TableCell>
                    <TableCell className="text-muted-foreground">{o.created}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
              <span>共 {opportunities.length} 条记录</span>
              <span>第 1 / 1 页</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerOpportunity;
