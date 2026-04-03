import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2, Plus, Info, ChevronDown, ChevronRight, Shield } from "lucide-react";

const roles = [
  { id: "1", name: "超级管理员", desc: "系统最高权限，可管理所有功能和数据", created: "2024-01-01" },
  { id: "2", name: "大区管理员", desc: "管理大区及下属城市的数据和人员", created: "2024-01-05" },
  { id: "3", name: "BDM", desc: "管理城市级业务团队和BD人员", created: "2024-01-10" },
  { id: "4", name: "BD", desc: "负责点位拓展、客户管理和拜访工作", created: "2024-01-10" },
  { id: "5", name: "运营人员", desc: "查看运营数据和报表", created: "2024-02-01" },
];

interface MenuNode {
  id: string;
  label: string;
  buttons?: string[];
  children?: MenuNode[];
}

const menuTree: MenuNode[] = [
  { id: "m1", label: "工作台", buttons: ["查看"] },
  {
    id: "m2", label: "客户与商机管理", buttons: ["查看", "新建", "编辑", "删除", "导出"],
    children: [
      { id: "m2-1", label: "客户列表", buttons: ["查看", "新建", "编辑", "删除"] },
      { id: "m2-2", label: "商机列表", buttons: ["查看", "新建", "编辑"] },
    ],
  },
  { id: "m3", label: "勘察管理", buttons: ["查看", "审批", "编辑"] },
  { id: "m4", label: "签约管理", buttons: ["查看", "审批", "编辑", "派工"] },
  { id: "m5", label: "拜访与日报管理", buttons: ["查看", "导出"] },
  {
    id: "m6", label: "考核管理",
    children: [
      { id: "m6-1", label: "绩效目标管理", buttons: ["查看", "新建", "编辑", "导出"] },
      { id: "m6-2", label: "指标结果查询", buttons: ["查看", "导出"] },
      { id: "m6-3", label: "抽检管理", buttons: ["查看", "标记"] },
    ],
  },
  {
    id: "m7", label: "数据分析",
    children: [
      { id: "m7-1", label: "运营看板", buttons: ["查看"] },
      { id: "m7-2", label: "监控看板", buttons: ["查看"] },
      { id: "m7-3", label: "报表查询", buttons: ["查看", "导出"] },
    ],
  },
  {
    id: "m8", label: "人员培训",
    children: [
      { id: "m8-1", label: "课程配置", buttons: ["查看", "新建", "编辑", "删除"] },
      { id: "m8-2", label: "培训学习", buttons: ["查看", "评分"] },
    ],
  },
  { id: "m9", label: "公告管理", buttons: ["查看", "新建", "编辑", "发布", "下线"] },
  {
    id: "m10", label: "系统管理",
    children: [
      { id: "m10-1", label: "组织机构与用户管理", buttons: ["查看", "新建", "编辑", "删除"] },
      { id: "m10-2", label: "角色管理", buttons: ["查看", "新建", "编辑", "删除"] },
      { id: "m10-3", label: "字典管理", buttons: ["查看", "编辑"] },
    ],
  },
];

function MenuTreeNode({ node, level = 0, checked, onToggle }: {
  node: MenuNode; level?: number; checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div className="flex items-center gap-2 py-1.5" style={{ paddingLeft: `${level * 20 + 4}px` }}>
        {hasChildren ? (
          <button onClick={() => setOpen(!open)} className="p-0.5">
            {open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
          </button>
        ) : <span className="w-4" />}
        <Checkbox checked={!!checked[node.id]} onCheckedChange={() => onToggle(node.id)} />
        <span className="text-sm">{node.label}</span>
        {node.buttons && checked[node.id] && (
          <div className="flex gap-1.5 ml-2">
            {node.buttons.map((btn) => (
              <label key={btn} className="flex items-center gap-1 text-xs text-muted-foreground">
                <Checkbox className="h-3 w-3" defaultChecked /> {btn}
              </label>
            ))}
          </div>
        )}
      </div>
      {open && hasChildren && node.children!.map((child) => (
        <MenuTreeNode key={child.id} node={child} level={level + 1} checked={checked} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default function RoleManagement() {
  const [showDialog, setShowDialog] = useState(false);
  const [menuChecked, setMenuChecked] = useState<Record<string, boolean>>({
    m1: true, m2: true, "m2-1": true, "m2-2": true, m5: true,
  });

  const toggleMenu = (id: string) => {
    setMenuChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="角色管理" description="管理系统角色与权限配置" />

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-3 px-4">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• 权限控制覆盖 PC 端和小程序，菜单与按钮权限独立配置</p>
              <p>• 数据权限基于组织结构自动生效，支持本人 / 本部门及下属 / 全部数据三种范围</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" /> 角色列表
            </CardTitle>
            <Button size="sm" className="h-8" onClick={() => setShowDialog(true)}>
              <Plus className="h-3.5 w-3.5 mr-1" /> 新建角色
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>角色名称</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{role.desc}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{role.created}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowDialog(true)}>
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑角色</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="basic">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="basic">基础信息</TabsTrigger>
              <TabsTrigger value="menu">功能权限</TabsTrigger>
              <TabsTrigger value="data">数据权限</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>角色名称</Label>
                <Input defaultValue="BD" />
              </div>
              <div className="space-y-2">
                <Label>描述</Label>
                <Textarea defaultValue="负责点位拓展、客户管理和拜访工作" rows={3} />
              </div>
            </TabsContent>

            <TabsContent value="menu" className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">勾选菜单和按钮权限：</p>
              <div className="border rounded-md p-3 max-h-96 overflow-y-auto">
                {menuTree.map((node) => (
                  <MenuTreeNode key={node.id} node={node} checked={menuChecked} onToggle={toggleMenu} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>数据范围</Label>
                <Select defaultValue="self">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">本人数据</SelectItem>
                    <SelectItem value="dept">本部门及下属部门</SelectItem>
                    <SelectItem value="all">全部数据</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-amber-600 mt-0.5" />
                    <p className="text-sm text-amber-700">数据权限将根据用户所在组织结构自动生效，请谨慎配置"全部数据"范围。</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>取消</Button>
            <Button onClick={() => setShowDialog(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
