import { useState } from "react";
import { Download, Search as SearchIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/shared/PageHeader";

const customerData = [
  { name: "星巴克（中国）", opportunities: 3, points: 12, devices: 10, revenue: "¥185,000" },
  { name: "瑞幸咖啡", opportunities: 5, points: 28, devices: 24, revenue: "¥320,000" },
  { name: "万达广场", opportunities: 8, points: 45, devices: 40, revenue: "¥580,000" },
  { name: "全家便利店", opportunities: 2, points: 8, devices: 6, revenue: "¥68,000" },
  { name: "海底捞火锅", opportunities: 1, points: 0, devices: 0, revenue: "¥0" },
];

const bdData = [
  { name: "李明", role: "BD", opportunities: 15, visits: 128, contracts: 8, rate: "53%" },
  { name: "赵静", role: "BD", opportunities: 22, visits: 156, contracts: 14, rate: "64%" },
  { name: "周伟", role: "BD", opportunities: 10, visits: 95, contracts: 5, rate: "50%" },
  { name: "王总监", role: "BDM", opportunities: 45, visits: 62, contracts: 28, rate: "62%" },
  { name: "张总", role: "BDM", opportunities: 38, visits: 48, contracts: 20, rate: "53%" },
];

const pointData = [
  { name: "国贸商城B1", customer: "星巴克", city: "北京", devices: 2, revenue: "¥45,000", status: "运营中" },
  { name: "望京SOHO A座", customer: "瑞幸咖啡", city: "北京", devices: 4, revenue: "¥88,000", status: "运营中" },
  { name: "西溪天堂商业街", customer: "万达广场", city: "杭州", devices: 6, revenue: "¥120,000", status: "运营中" },
  { name: "浦东新区陆家嘴", customer: "全家便利店", city: "上海", devices: 3, revenue: "¥35,000", status: "待激活" },
];

const sceneData = [
  { scene: "商场/购物中心", points: 86, devices: 142, revenue: "¥680,000", avgRevenue: "¥4,789" },
  { scene: "写字楼/办公区", points: 64, devices: 98, revenue: "¥420,000", avgRevenue: "¥4,286" },
  { scene: "便利店", points: 45, devices: 52, revenue: "¥180,000", avgRevenue: "¥3,462" },
  { scene: "餐饮门店", points: 32, devices: 38, revenue: "¥95,000", avgRevenue: "¥2,500" },
];

const learningData = [
  { name: "李明", role: "BD", coursesCompleted: 12, totalCourses: 15, examScore: 92, status: "合格" },
  { name: "赵静", role: "BD", coursesCompleted: 15, totalCourses: 15, examScore: 98, status: "优秀" },
  { name: "周伟", role: "BD", coursesCompleted: 8, totalCourses: 15, examScore: 65, status: "不合格" },
];

const oceanData = [
  { opportunity: "某品牌-望京店", originalBd: "张晓", daysSinceFollow: 32, reason: "超30天未跟进", action: "已转入公海" },
  { opportunity: "某餐饮-国贸店", originalBd: "陈磊", daysSinceFollow: 18, reason: "超15天未跟进", action: "预警中" },
  { opportunity: "某便利-浦东店", originalBd: "周伟", daysSinceFollow: 45, reason: "超30天未跟进", action: "已转入公海" },
];

const ReportsDashboard = () => {
  const [tab, setTab] = useState("customer");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader
        title="报表查询"
        description="多维度数据分析与报表导出"
        actions={<Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />导出Excel</Button>}
      />

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索客户 / 点位 / BD" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[120px]"><SelectValue placeholder="时间范围" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2026-04">2026年4月</SelectItem>
            <SelectItem value="2026-03">2026年3月</SelectItem>
            <SelectItem value="2026-q1">2026年Q1</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[100px]"><SelectValue placeholder="城市" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="bj">北京</SelectItem>
            <SelectItem value="sh">上海</SelectItem>
            <SelectItem value="hz">杭州</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="customer">客户维度</TabsTrigger>
          <TabsTrigger value="point">点位维度</TabsTrigger>
          <TabsTrigger value="bd">BD/BDM维度</TabsTrigger>
          <TabsTrigger value="scene">场景维度</TabsTrigger>
          <TabsTrigger value="learning">学习情况</TabsTrigger>
          <TabsTrigger value="ocean">公海商机分析</TabsTrigger>
        </TabsList>

        <TabsContent value="customer">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户名称</TableHead>
                  <TableHead className="text-right">商机数</TableHead>
                  <TableHead className="text-right">点位数</TableHead>
                  <TableHead className="text-right">设备数</TableHead>
                  <TableHead className="text-right">营业额</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerData.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-right">{r.opportunities}</TableCell>
                    <TableCell className="text-right">{r.points}</TableCell>
                    <TableCell className="text-right">{r.devices}</TableCell>
                    <TableCell className="text-right font-medium">{r.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter count={customerData.length} />
          </div>
        </TabsContent>

        <TabsContent value="point">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>点位名称</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>城市</TableHead>
                  <TableHead className="text-right">设备数</TableHead>
                  <TableHead className="text-right">营业额</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pointData.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.customer}</TableCell>
                    <TableCell>{r.city}</TableCell>
                    <TableCell className="text-right">{r.devices}</TableCell>
                    <TableCell className="text-right font-medium">{r.revenue}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${r.status === "运营中" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                        {r.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter count={pointData.length} />
          </div>
        </TabsContent>

        <TabsContent value="bd">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BD名称</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead className="text-right">商机数</TableHead>
                  <TableHead className="text-right">拜访数</TableHead>
                  <TableHead className="text-right">签约数</TableHead>
                  <TableHead className="text-right">转化率</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bdData.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell><span className={r.role === "BDM" ? "text-primary font-medium" : ""}>{r.role}</span></TableCell>
                    <TableCell className="text-right">{r.opportunities}</TableCell>
                    <TableCell className="text-right">{r.visits}</TableCell>
                    <TableCell className="text-right">{r.contracts}</TableCell>
                    <TableCell className="text-right font-medium">{r.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter count={bdData.length} />
          </div>
        </TabsContent>

        <TabsContent value="scene">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>场景类型</TableHead>
                  <TableHead className="text-right">点位数</TableHead>
                  <TableHead className="text-right">设备数</TableHead>
                  <TableHead className="text-right">营业额</TableHead>
                  <TableHead className="text-right">平均单点营业额</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sceneData.map((r) => (
                  <TableRow key={r.scene}>
                    <TableCell className="font-medium">{r.scene}</TableCell>
                    <TableCell className="text-right">{r.points}</TableCell>
                    <TableCell className="text-right">{r.devices}</TableCell>
                    <TableCell className="text-right font-medium">{r.revenue}</TableCell>
                    <TableCell className="text-right">{r.avgRevenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter count={sceneData.length} />
          </div>
        </TabsContent>

        <TabsContent value="learning">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>人员</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead className="text-right">已完成课程</TableHead>
                  <TableHead className="text-right">总课程数</TableHead>
                  <TableHead className="text-right">考试成绩</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {learningData.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.role}</TableCell>
                    <TableCell className="text-right">{r.coursesCompleted}</TableCell>
                    <TableCell className="text-right">{r.totalCourses}</TableCell>
                    <TableCell className="text-right font-medium">{r.examScore}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                        r.status === "优秀" ? "bg-success/10 text-success" : r.status === "合格" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                      }`}>
                        {r.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter count={learningData.length} />
          </div>
        </TabsContent>

        <TabsContent value="ocean">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商机名称</TableHead>
                  <TableHead>原BD</TableHead>
                  <TableHead className="text-right">未跟进天数</TableHead>
                  <TableHead>原因</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {oceanData.map((r) => (
                  <TableRow key={r.opportunity}>
                    <TableCell className="font-medium">{r.opportunity}</TableCell>
                    <TableCell>{r.originalBd}</TableCell>
                    <TableCell className="text-right">
                      <span className={r.daysSinceFollow >= 30 ? "text-destructive font-medium" : "text-warning font-medium"}>
                        {r.daysSinceFollow}天
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r.reason}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                        r.action === "已转入公海" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                      }`}>
                        {r.action}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter count={oceanData.length} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const TableFooter = ({ count }: { count: number }) => (
  <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
    <span>共 {count} 条记录</span>
    <span>第 1 / 1 页</span>
  </div>
);

export default ReportsDashboard;
