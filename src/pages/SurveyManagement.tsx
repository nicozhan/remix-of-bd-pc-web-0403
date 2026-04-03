import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";

const surveys = [
  { id: "S001", opportunity: "星巴克-国贸店设备入驻", customer: "星巴克（中国）", applicant: "李明", node: "区域经理审核", status: "待审核", submitted: "2026-04-02 10:30" },
  { id: "S002", opportunity: "瑞幸-望京SOHO批量部署", customer: "瑞幸咖啡", applicant: "赵静", node: "运营总监审核", status: "待审核", submitted: "2026-04-01 15:00" },
  { id: "S003", opportunity: "全家-浦东新区5店", customer: "全家便利店", applicant: "李明", node: "—", status: "已通过", submitted: "2026-03-28 09:00" },
  { id: "S004", opportunity: "海底捞-朝阳大悦城店", customer: "海底捞火锅", applicant: "周伟", node: "—", status: "已驳回", submitted: "2026-03-25 14:00" },
];

const SurveyManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader title="勘察管理" description="查看和审批勘察申请" />

      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索商机 / 客户名称" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[120px]"><SelectValue placeholder="状态" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="pending">待审核</SelectItem>
            <SelectItem value="approved">已通过</SelectItem>
            <SelectItem value="rejected">已驳回</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>商机名称</TableHead>
              <TableHead>客户名称</TableHead>
              <TableHead>申请人（BD）</TableHead>
              <TableHead>当前节点</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>提交时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveys.map((s) => (
              <TableRow key={s.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/surveys/${s.id}`)}>
                <TableCell className="font-medium text-primary">{s.opportunity}</TableCell>
                <TableCell>{s.customer}</TableCell>
                <TableCell>{s.applicant}</TableCell>
                <TableCell>{s.node}</TableCell>
                <TableCell><StatusBadge status={s.status} /></TableCell>
                <TableCell className="text-muted-foreground">{s.submitted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
          <span>共 {surveys.length} 条记录</span>
          <span>第 1 / 1 页</span>
        </div>
      </div>
    </div>
  );
};

export default SurveyManagement;
