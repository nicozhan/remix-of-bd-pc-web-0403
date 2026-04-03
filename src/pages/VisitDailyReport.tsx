import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";

const visits = [
  { id: "V001", bd: "李明", opportunity: "星巴克-国贸店", time: "2026-04-02 14:00", abnormal: false, companion: "无" },
  { id: "V002", bd: "赵静", opportunity: "瑞幸-望京SOHO", time: "2026-04-02 10:30", abnormal: false, companion: "王总监" },
  { id: "V003", bd: "周伟", opportunity: "海底捞-朝阳大悦城", time: "2026-04-01 16:00", abnormal: true, companion: "无" },
  { id: "V004", bd: "李明", opportunity: "全家-浦东新区", time: "2026-04-01 09:00", abnormal: false, companion: "张经理" },
  { id: "V005", bd: "赵静", opportunity: "万达-杭州西溪", time: "2026-03-31 14:30", abnormal: true, companion: "无" },
];

const dailyReports = [
  { id: "D001", bd: "李明", date: "2026-04-02", submitted: true, summary: "完成3次拜访，提交1份勘察报告，跟进国贸店签约进度。" },
  { id: "D002", bd: "赵静", date: "2026-04-02", submitted: true, summary: "完成2次拜访，推进瑞幸望京SOHO项目勘察流程。" },
  { id: "D003", bd: "周伟", date: "2026-04-02", submitted: false, summary: "" },
  { id: "D004", bd: "李明", date: "2026-04-01", submitted: true, summary: "全天外出拜访浦东新区全家门店，与区域负责人对接合同细节。" },
  { id: "D005", bd: "赵静", date: "2026-04-01", submitted: true, summary: "参加杭州万达项目签约仪式，完成合同递交。" },
];

const VisitDailyReport = () => {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader
        title="拜访与日报管理"
        actions={<Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />导出</Button>}
      />

      <Tabs defaultValue="visits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visits">拜访记录</TabsTrigger>
          <TabsTrigger value="reports">日报列表</TabsTrigger>
        </TabsList>

        <TabsContent value="visits">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BD</TableHead>
                  <TableHead>商机</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead>是否异常</TableHead>
                  <TableHead>陪访情况</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visits.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.bd}</TableCell>
                    <TableCell>{v.opportunity}</TableCell>
                    <TableCell className="text-muted-foreground">{v.time}</TableCell>
                    <TableCell>
                      {v.abnormal ? <StatusBadge status="异常" type="danger" /> : <StatusBadge status="正常" type="default" />}
                    </TableCell>
                    <TableCell>{v.companion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
              <span>共 {visits.length} 条记录</span>
              <span>第 1 / 1 页</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BD</TableHead>
                  <TableHead>日期</TableHead>
                  <TableHead>是否提交</TableHead>
                  <TableHead>内容摘要</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyReports.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.bd}</TableCell>
                    <TableCell className="text-muted-foreground">{d.date}</TableCell>
                    <TableCell>
                      {d.submitted ? <StatusBadge status="已提交" type="success" /> : <StatusBadge status="未提交" type="danger" />}
                    </TableCell>
                    <TableCell className="max-w-md truncate text-muted-foreground">{d.summary || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
              <span>共 {dailyReports.length} 条记录</span>
              <span>第 1 / 1 页</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisitDailyReport;
