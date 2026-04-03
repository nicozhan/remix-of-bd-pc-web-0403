import { useState } from "react";
import { Plus, Settings, Info, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/shared/PageHeader";

interface Goal {
  id: string;
  name: string;
  role: string;
  team: string;
  visitTarget: number;
  validVisitTarget: number;
  reportTarget: number;
  created: string;
}

const mockGoals: Goal[] = [
  { id: "G001", name: "李明", role: "BD", team: "北京一组", visitTarget: 30, validVisitTarget: 20, reportTarget: 22, created: "2026-04-01" },
  { id: "G002", name: "赵静", role: "BD", team: "北京一组", visitTarget: 30, validVisitTarget: 20, reportTarget: 22, created: "2026-04-01" },
  { id: "G003", name: "周伟", role: "BD", team: "上海一组", visitTarget: 25, validVisitTarget: 18, reportTarget: 20, created: "2026-04-01" },
  { id: "G004", name: "王总监", role: "BDM", team: "北京大区", visitTarget: 50, validVisitTarget: 35, reportTarget: 40, created: "2026-04-01" },
  { id: "G005", name: "张总", role: "BDM", team: "上海大区", visitTarget: 40, validVisitTarget: 28, reportTarget: 30, created: "2026-04-01" },
];

const emptyForm = { mode: "person" as "person" | "role", name: "", role: "BD", visitTarget: "", validVisitTarget: "", reportTarget: "" };

const PerformanceGoals = () => {
  const [goals] = useState<Goal[]>(mockGoals);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setErrors({});
    setDialogOpen(true);
  };

  const openEdit = (g: Goal) => {
    setEditId(g.id);
    setForm({
      mode: "person",
      name: g.name,
      role: g.role,
      visitTarget: String(g.visitTarget),
      validVisitTarget: String(g.validVisitTarget),
      reportTarget: String(g.reportTarget),
    });
    setErrors({});
    setDialogOpen(true);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.visitTarget || Number(form.visitTarget) <= 0) e.visitTarget = "请输入有效数值";
    if (!form.validVisitTarget || Number(form.validVisitTarget) <= 0) e.validVisitTarget = "请输入有效数值";
    if (!form.reportTarget || Number(form.reportTarget) <= 0) e.reportTarget = "请输入有效数值";
    if (Number(form.validVisitTarget) > Number(form.visitTarget)) e.validVisitTarget = "有效拜访数不可大于拜访数";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      setDialogOpen(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader
        title="绩效目标管理"
        description="配置和管理人员绩效考核目标"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />批量配置
            </Button>
            <Button size="sm" onClick={openCreate}>
              <Plus className="h-4 w-4 mr-1" />新建目标
            </Button>
          </div>
        }
      />

      {/* Rule tip */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex gap-3 mb-4">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">规则提示：</span>BD指标之和不可小于BDM指标。配置目标时请确保团队指标分配合理。
        </p>
      </div>

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
            <SelectItem value="2026-q1">2026年Q1</SelectItem>
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
              <TableHead>所属团队</TableHead>
              <TableHead className="text-right">拜访数（目标）</TableHead>
              <TableHead className="text-right">有效拜访数（目标）</TableHead>
              <TableHead className="text-right">日报数（目标）</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.map((g) => (
              <TableRow key={g.id}>
                <TableCell className="font-medium">{g.name}</TableCell>
                <TableCell>
                  <span className={g.role === "BDM" ? "text-primary font-medium" : ""}>{g.role}</span>
                </TableCell>
                <TableCell>{g.team}</TableCell>
                <TableCell className="text-right">{g.visitTarget}</TableCell>
                <TableCell className="text-right">{g.validVisitTarget}</TableCell>
                <TableCell className="text-right">{g.reportTarget}</TableCell>
                <TableCell className="text-muted-foreground">{g.created}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => openEdit(g)}>编辑</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">删除</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
          <span>共 {goals.length} 条记录</span>
          <span>第 1 / 1 页</span>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editId ? "编辑目标" : "新建目标"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm">配置方式</Label>
              <Select value={form.mode} onValueChange={(v) => updateField("mode", v)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="person">按人员</SelectItem>
                  <SelectItem value="role">按角色</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.mode === "person" && (
              <div>
                <Label className="text-sm">人员名称</Label>
                <Input className="mt-1" placeholder="请输入人员名称" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
              </div>
            )}
            <div>
              <Label className="text-sm">角色</Label>
              <Select value={form.role} onValueChange={(v) => updateField("role", v)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BD">BD</SelectItem>
                  <SelectItem value="BDM">BDM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">拜访数目标</Label>
              <Input
                type="number"
                className={`mt-1 ${errors.visitTarget ? "border-destructive ring-destructive" : ""}`}
                placeholder="请输入"
                value={form.visitTarget}
                onChange={(e) => updateField("visitTarget", e.target.value)}
              />
              {errors.visitTarget && <p className="text-xs text-destructive mt-1">{errors.visitTarget}</p>}
            </div>
            <div>
              <Label className="text-sm">有效拜访数目标</Label>
              <Input
                type="number"
                className={`mt-1 ${errors.validVisitTarget ? "border-destructive ring-destructive" : ""}`}
                placeholder="请输入"
                value={form.validVisitTarget}
                onChange={(e) => updateField("validVisitTarget", e.target.value)}
              />
              {errors.validVisitTarget && <p className="text-xs text-destructive mt-1">{errors.validVisitTarget}</p>}
            </div>
            <div>
              <Label className="text-sm">日报数目标</Label>
              <Input
                type="number"
                className={`mt-1 ${errors.reportTarget ? "border-destructive ring-destructive" : ""}`}
                placeholder="请输入"
                value={form.reportTarget}
                onChange={(e) => updateField("reportTarget", e.target.value)}
              />
              {errors.reportTarget && <p className="text-xs text-destructive mt-1">{errors.reportTarget}</p>}
            </div>

            {/* Rule reminder inside dialog */}
            <div className="rounded-md bg-warning/10 p-3 text-xs text-warning flex gap-2">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              BD指标之和不可小于BDM指标，请确认配置合理。
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceGoals;
