import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";

const contracts = [
  { id: "CT001", opportunity: "全家-浦东新区5店", customer: "全家便利店", bd: "李明", status: "审批中", node: "法务审核", created: "2026-03-29" },
  { id: "CT002", opportunity: "万达-杭州西溪店", customer: "万达广场", bd: "赵静", status: "已签约", node: "—", created: "2026-03-20" },
  { id: "CT003", opportunity: "瑞幸-望京SOHO批量部署", customer: "瑞幸咖啡", bd: "赵静", status: "审批中", node: "运营总监审核", created: "2026-04-01" },
  { id: "CT004", opportunity: "海底捞-朝阳大悦城店", customer: "海底捞火锅", bd: "周伟", status: "已驳回", node: "—", created: "2026-03-22" },
];

const ContractManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader title="签约管理" description="管理签约审批和合同" />

      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索商机 / 客户名称" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[120px]"><SelectValue placeholder="状态" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="pending">审批中</SelectItem>
            <SelectItem value="signed">已签约</SelectItem>
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
              <TableHead>BD</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>当前节点</TableHead>
              <TableHead>创建时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((c) => (
              <TableRow key={c.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/contracts/${c.id}`)}>
                <TableCell className="font-medium text-primary">{c.opportunity}</TableCell>
                <TableCell>{c.customer}</TableCell>
                <TableCell>{c.bd}</TableCell>
                <TableCell><StatusBadge status={c.status} /></TableCell>
                <TableCell>{c.node}</TableCell>
                <TableCell className="text-muted-foreground">{c.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
          <span>共 {contracts.length} 条记录</span>
          <span>第 1 / 1 页</span>
        </div>
      </div>
    </div>
  );
};

export default ContractManagement;
