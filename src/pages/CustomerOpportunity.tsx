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
  { id: "C001", name: "星巴克（中国）", code: "KH-20251201-001", location: "北京市朝阳区建国路88号", contact: "张经理", phone: "138****1234", bd: "李明", level: "A级", opportunities: 3, points: 12, activeDevices: 8, pendingActivation: 2, pendingInstall: 2, revenue: "45,000", updated: "2026-04-02" },
  { id: "C002", name: "瑞幸咖啡", code: "KH-20251115-002", location: "北京市海淀区中关村大街1号", contact: "王总", phone: "139****5678", bd: "赵静", level: "S级", opportunities: 5, points: 28, activeDevices: 22, pendingActivation: 3, pendingInstall: 3, revenue: "120,000", updated: "2026-04-01" },
  { id: "C003", name: "全家便利店", code: "KH-20260101-003", location: "上海市浦东新区陆家嘴环路100号", contact: "陈店长", phone: "137****9012", bd: "李明", level: "B级", opportunities: 2, points: 8, activeDevices: 6, pendingActivation: 1, pendingInstall: 1, revenue: "18,000", updated: "2026-03-30" },
  { id: "C004", name: "海底捞火锅", code: "KH-20260210-004", location: "北京市朝阳区大悦城", contact: "刘经理", phone: "136****3456", bd: "周伟", level: "B级", opportunities: 1, points: 0, activeDevices: 0, pendingActivation: 0, pendingInstall: 0, revenue: "0", updated: "2026-03-28" },
  { id: "C005", name: "万达广场", code: "KH-20251020-005", location: "杭州市西湖区文三路500号", contact: "孙总", phone: "135****7890", bd: "赵静", level: "S级", opportunities: 8, points: 45, activeDevices: 38, pendingActivation: 4, pendingInstall: 3, revenue: "280,000", updated: "2026-04-03" },
];

const opportunities = [
  { id: "O001", name: "星巴克-国贸店设备入驻", code: "SJ-20260315-001", customer: "星巴克（中国）", ocean: "私海", contact: "张经理", contactPhone: "138****1234", sceneType: "一般商业场景", level: "B", segment: "商业类-景区", status: "跟进中", bd: "李明", lastFollow: "2026-04-02", created: "2026-03-15" },
  { id: "O002", name: "瑞幸-望京SOHO批量部署", code: "SJ-20260310-002", customer: "瑞幸咖啡", ocean: "私海", contact: "王总", contactPhone: "139****5678", sceneType: "一般商业场景", level: "A", segment: "商业类-厂企", status: "勘察中", bd: "赵静", lastFollow: "2026-04-01", created: "2026-03-10" },
  { id: "O003", name: "全家-浦东新区5店", code: "SJ-20260220-003", customer: "全家便利店", ocean: "私海", contact: "陈店长", contactPhone: "137****9012", sceneType: "一般商业场景", level: "B", segment: "其他", status: "签约中", bd: "李明", lastFollow: "2026-03-30", created: "2026-02-20" },
  { id: "O004", name: "海底捞-朝阳大悦城店", code: "SJ-20260110-004", customer: "海底捞火锅", ocean: "公海", contact: "刘经理", contactPhone: "136****3456", sceneType: "一般商业场景", level: "C", segment: "商业类-景区", status: "跟进中", bd: "周伟", lastFollow: "2026-03-15", created: "2026-01-10" },
  { id: "O005", name: "万达-杭州西溪店", code: "SJ-20260301-005", customer: "万达广场", ocean: "私海", contact: "孙总", contactPhone: "135****7890", sceneType: "项目类", level: "A", segment: "公共类-城投平台", status: "已签约", bd: "赵静", lastFollow: "2026-04-03", created: "2026-03-01" },
  { id: "O006", name: "瑞幸-中关村店", code: "SJ-20260105-006", customer: "瑞幸咖啡", ocean: "私海", contact: "王总", contactPhone: "139****5678", sceneType: "一般商业场景", level: "C", segment: "商业类-厂企", status: "失败", bd: "赵静", lastFollow: "2026-02-28", created: "2026-01-05" },
];

const CustomerOpportunity = () => {
  const [search, setSearch] = useState("");
  const [oppSearch, setOppSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader title="客户与商机管理" />

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">客户列表</TabsTrigger>
          <TabsTrigger value="opportunities">商机列表</TabsTrigger>
        </TabsList>

        {/* 客户列表 */}
        <TabsContent value="customers" className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索名称 / 联系人 / 电话" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="客户等级" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="s">S级</SelectItem>
                <SelectItem value="a">A级</SelectItem>
                <SelectItem value="b">B级</SelectItem>
                <SelectItem value="c">C级</SelectItem>
              </SelectContent>
            </Select>
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
            <Button size="sm" onClick={() => navigate("/customers/new")}><Plus className="h-4 w-4 mr-1" />新建客户</Button>
          </div>
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户名称</TableHead>
                  <TableHead>客户编码</TableHead>
                  <TableHead>客户位置</TableHead>
                  <TableHead>联系人</TableHead>
                  <TableHead>客户等级</TableHead>
                  <TableHead className="text-right">商机数</TableHead>
                  <TableHead className="text-right">点位数</TableHead>
                  <TableHead className="text-right">已激活</TableHead>
                  <TableHead className="text-right">待激活</TableHead>
                  <TableHead className="text-right">待安装</TableHead>
                  <TableHead className="text-right">汇总营业额</TableHead>
                  <TableHead>更新时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((c) => (
                  <TableRow key={c.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/customers/${c.id}`)}>
                    <TableCell className="font-medium text-primary">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono">{c.code}</TableCell>
                    <TableCell className="max-w-[160px] truncate text-xs text-muted-foreground">{c.location}</TableCell>
                    <TableCell>{c.contact}</TableCell>
                    <TableCell><StatusBadge status={c.level} type={c.level === "S级" ? "danger" : c.level === "A级" ? "warning" : "default"} /></TableCell>
                    <TableCell className="text-right">{c.opportunities}</TableCell>
                    <TableCell className="text-right">{c.points}</TableCell>
                    <TableCell className="text-right font-medium">{c.activeDevices}</TableCell>
                    <TableCell className="text-right">{c.pendingActivation}</TableCell>
                    <TableCell className="text-right">{c.pendingInstall}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">¥{c.revenue}</TableCell>
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

        {/* 商机列表 - enhanced */}
        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索商机名称 / 客户名称 / 联系人电话" className="pl-9" value={oppSearch} onChange={(e) => setOppSearch(e.target.value)} />
            </div>
            <Select>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="客户海域" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="public">公海</SelectItem>
                <SelectItem value="private">私海</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="商机等级" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="a">A级</SelectItem>
                <SelectItem value="b">B级</SelectItem>
                <SelectItem value="c">C级</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[130px]"><SelectValue placeholder="场景类型" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="general">一般商业场景</SelectItem>
                <SelectItem value="project">项目类</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="细分市场" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="gov">公共类-政府部门</SelectItem>
                <SelectItem value="city">公共类-城投平台</SelectItem>
                <SelectItem value="school">商业类-高校</SelectItem>
                <SelectItem value="factory">商业类-厂企</SelectItem>
                <SelectItem value="scenic">商业类-景区</SelectItem>
                <SelectItem value="hospital">商业类-医院</SelectItem>
                <SelectItem value="other">其他</SelectItem>
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
            <Select>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="状态" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="follow">跟进中</SelectItem>
                <SelectItem value="survey">勘察中</SelectItem>
                <SelectItem value="sign">签约中</SelectItem>
                <SelectItem value="done">已签约</SelectItem>
                <SelectItem value="fail">已失败</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />导出</Button>
            <Button size="sm" onClick={() => navigate("/opportunities/new")}><Plus className="h-4 w-4 mr-1" />新建商机</Button>
          </div>

          <div className="rounded-lg border border-border bg-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商机名称</TableHead>
                    <TableHead>商机编号</TableHead>
                    <TableHead>客户名称</TableHead>
                    <TableHead>客户海域</TableHead>
                    <TableHead>联系人</TableHead>
                    <TableHead>联系电话</TableHead>
                    <TableHead>场景类型</TableHead>
                    <TableHead>商机等级</TableHead>
                    <TableHead>细分市场</TableHead>
                    <TableHead>所属BD</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>最后跟进</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((o) => (
                    <TableRow key={o.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/opportunities/${o.id}`)}>
                      <TableCell className="font-medium text-primary whitespace-nowrap">{o.name}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{o.code}</TableCell>
                      <TableCell>{o.customer}</TableCell>
                      <TableCell>
                        <StatusBadge status={o.ocean} type={o.ocean === "公海" ? "warning" : "primary"} />
                      </TableCell>
                      <TableCell>{o.contact}</TableCell>
                      <TableCell className="text-muted-foreground">{o.contactPhone}</TableCell>
                      <TableCell className="text-xs">{o.sceneType}</TableCell>
                      <TableCell>
                        <StatusBadge status={`${o.level}级`} type={o.level === "A" ? "danger" : o.level === "B" ? "warning" : "default"} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{o.segment}</TableCell>
                      <TableCell>{o.bd}</TableCell>
                      <TableCell><StatusBadge status={o.status} /></TableCell>
                      <TableCell className="text-muted-foreground">{o.lastFollow}</TableCell>
                      <TableCell className="text-muted-foreground">{o.created}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {o.ocean === "公海" && (
                          <Button variant="outline" size="sm" className="h-7 text-xs">转私海</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
