import { Download, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";

interface KpiRow {
  id: string;
  name: string;
  role: string;
  visitActual: number;
  visitTarget: number;
  validVisitActual: number;
  validVisitTarget: number;
  reportActual: number;
  reportTarget: number;
}

const data: KpiRow[] = [
  { id: "1", name: "李明", role: "BD", visitActual: 28, visitTarget: 30, validVisitActual: 22, validVisitTarget: 20, reportActual: 20, reportTarget: 22 },
  { id: "2", name: "赵静", role: "BD", visitActual: 32, visitTarget: 30, validVisitActual: 25, validVisitTarget: 20, reportActual: 22, reportTarget: 22 },
  { id: "3", name: "周伟", role: "BD", visitActual: 15, visitTarget: 25, validVisitActual: 10, validVisitTarget: 18, reportActual: 12, reportTarget: 20 },
  { id: "4", name: "王总监", role: "BDM", visitActual: 48, visitTarget: 50, validVisitActual: 36, validVisitTarget: 35, reportActual: 40, reportTarget: 40 },
  { id: "5", name: "张总", role: "BDM", visitActual: 30, visitTarget: 40, validVisitActual: 20, validVisitTarget: 28, reportActual: 25, reportTarget: 30 },
];

const completionRate = (actual: number, target: number) => {
  if (target === 0) return 0;
  return Math.round((actual / target) * 100);
};

const overallRate = (row: KpiRow) => {
  const r1 = completionRate(row.visitActual, row.visitTarget);
  const r2 = completionRate(row.validVisitActual, row.validVisitTarget);
  const r3 = completionRate(row.reportActual, row.reportTarget);
  return Math.round((r1 + r2 + r3) / 3);
};

const RatioCell = ({ actual, target }: { actual: number; target: number }) => {
  const rate = completionRate(actual, target);
  const met = rate >= 100;
  return (
    <span className={met ? "text-success" : rate >= 80 ? "" : "text-destructive font-medium"}>
      {actual}/{target}
    </span>
  );
};

const KpiResults = () => {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader
        title="指标结果查询"
        description="查看人员绩效指标完成情况"
        actions={<Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />导出</Button>}
      />

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索人员名称" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[120px]"><SelectValue placeholder="时间周期" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2026-04">2026年4月</SelectItem>
            <SelectItem value="2026-03">2026年3月</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[100px]"><SelectValue placeholder="角色" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="bd">BD</SelectItem>
            <SelectItem value="bdm">BDM</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[120px]"><SelectValue placeholder="组织" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="bj">北京大区</SelectItem>
            <SelectItem value="sh">上海大区</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>人员名称</TableHead>
              <TableHead>角色</TableHead>
              <TableHead className="text-right">拜访数（实际/目标）</TableHead>
              <TableHead className="text-right">有效拜访数（实际/目标）</TableHead>
              <TableHead className="text-right">日报数（实际/目标）</TableHead>
              <TableHead className="text-right">完成率</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const rate = overallRate(row);
              const met = rate >= 100;
              return (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>
                    <span className={row.role === "BDM" ? "text-primary font-medium" : ""}>{row.role}</span>
                  </TableCell>
                  <TableCell className="text-right"><RatioCell actual={row.visitActual} target={row.visitTarget} /></TableCell>
                  <TableCell className="text-right"><RatioCell actual={row.validVisitActual} target={row.validVisitTarget} /></TableCell>
                  <TableCell className="text-right"><RatioCell actual={row.reportActual} target={row.reportTarget} /></TableCell>
                  <TableCell className="text-right">
                    <span className={met ? "text-success font-medium" : rate >= 80 ? "" : "text-destructive font-medium"}>
                      {rate}%
                    </span>
                  </TableCell>
                  <TableCell>
                    {met ? (
                      <StatusBadge status="达标" type="success" />
                    ) : (
                      <StatusBadge status="未达标" type="danger" />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
          <span>共 {data.length} 条记录</span>
          <span>第 1 / 1 页</span>
        </div>
      </div>
    </div>
  );
};

export default KpiResults;
