import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building2, ChevronDown, ChevronRight, Plus, Edit2, Trash2, Users,
  Search, Info, FolderTree,
} from "lucide-react";

interface OrgNode {
  id: string;
  name: string;
  type: "department" | "region" | "city" | "team";
  children?: OrgNode[];
}

const orgTree: OrgNode[] = [
  {
    id: "1", name: "总部", type: "department",
    children: [
      {
        id: "1-1", name: "华东大区", type: "region",
        children: [
          {
            id: "1-1-1", name: "上海", type: "city",
            children: [
              { id: "1-1-1-1", name: "浦东团队", type: "team" },
              { id: "1-1-1-2", name: "浦西团队", type: "team" },
            ],
          },
          {
            id: "1-1-2", name: "杭州", type: "city",
            children: [
              { id: "1-1-2-1", name: "西湖团队", type: "team" },
            ],
          },
        ],
      },
      {
        id: "1-2", name: "华南大区", type: "region",
        children: [
          {
            id: "1-2-1", name: "深圳", type: "city",
            children: [
              { id: "1-2-1-1", name: "南山团队", type: "team" },
              { id: "1-2-1-2", name: "福田团队", type: "team" },
            ],
          },
        ],
      },
    ],
  },
];

const users = [
  { id: "1", name: "张三", role: "BD", org: "华东大区/上海/浦东团队", cities: "上海", status: "启用", created: "2024-01-10" },
  { id: "2", name: "李四", role: "BDM", org: "华东大区/上海", cities: "上海, 杭州", status: "启用", created: "2024-01-08" },
  { id: "3", name: "王五", role: "BD", org: "华南大区/深圳/南山团队", cities: "深圳", status: "禁用", created: "2024-02-15" },
  { id: "4", name: "赵六", role: "管理", org: "总部", cities: "全国", status: "启用", created: "2024-01-01" },
  { id: "5", name: "钱七", role: "BD", org: "华东大区/杭州/西湖团队", cities: "杭州", status: "启用", created: "2024-03-20" },
];

const typeLabels: Record<string, string> = {
  department: "部门", region: "大区", city: "城市", team: "团队",
};

function TreeNode({ node, level = 0, selected, onSelect }: {
  node: OrgNode; level?: number; selected: string; onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selected === node.id;

  return (
    <div>
      <div
        className={`flex items-center gap-1 py-1.5 px-2 rounded-md cursor-pointer text-sm transition-colors ${
          isSelected ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-accent"
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(node.id)}
      >
        {hasChildren ? (
          <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }} className="p-0.5">
            {open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
          </button>
        ) : <span className="w-4" />}
        <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="truncate">{node.name}</span>
        <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0">{typeLabels[node.type]}</Badge>
      </div>
      {open && hasChildren && node.children!.map((child) => (
        <TreeNode key={child.id} node={child} level={level + 1} selected={selected} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default function OrganizationManagement() {
  const [selectedOrg, setSelectedOrg] = useState("1");
  const [searchUser, setSearchUser] = useState("");
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showOrgDialog, setShowOrgDialog] = useState(false);

  const filteredUsers = users.filter((u) =>
    u.name.includes(searchUser) || u.role.includes(searchUser)
  );

  return (
    <div className="space-y-6">
      <PageHeader title="组织机构与用户管理" description="管理组织架构和人员信息" />

      {/* Rule tips */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-3 px-4">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• 一个团队仅允许 0 或 1 个 BDM；一个 BDM 可属于多个城市；一个 BD 可属于多个团队</p>
              <p>• 组织节点支持配置管辖区域（省/市/区），审核流程根据区域进行流转</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-6">
        {/* Left: Organization Tree */}
        <Card className="w-72 shrink-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FolderTree className="h-4 w-4" />
                组织结构
              </CardTitle>
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setShowOrgDialog(true)}>
                <Plus className="h-3 w-3 mr-1" /> 新增
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="border rounded-md p-2 max-h-[500px] overflow-y-auto">
              {orgTree.map((node) => (
                <TreeNode key={node.id} node={node} selected={selectedOrg} onSelect={setSelectedOrg} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right: User List */}
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                用户列表
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="搜索用户..."
                    className="pl-8 h-8 w-48 text-sm"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                  />
                </div>
                <Button size="sm" className="h-8" onClick={() => setShowUserDialog(true)}>
                  <Plus className="h-3.5 w-3.5 mr-1" /> 新建用户
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户名称</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>所属组织</TableHead>
                  <TableHead>所属城市</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.org}</TableCell>
                    <TableCell className="text-sm">{user.cities}</TableCell>
                    <TableCell>
                      <Badge className={user.status === "启用"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-muted text-muted-foreground"
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.created}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
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
      </div>

      {/* New User Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>新建用户</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>姓名</Label>
              <Input placeholder="请输入姓名" />
            </div>
            <div className="space-y-2">
              <Label>角色</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="选择角色" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bd">BD</SelectItem>
                  <SelectItem value="bdm">BDM</SelectItem>
                  <SelectItem value="admin">管理</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>所属团队（多选）</Label>
              <div className="flex flex-wrap gap-2">
                {["浦东团队", "浦西团队", "西湖团队", "南山团队", "福田团队"].map((t) => (
                  <label key={t} className="flex items-center gap-1.5 text-sm">
                    <Checkbox /> {t}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>所属城市（多选）</Label>
              <div className="flex flex-wrap gap-2">
                {["上海", "杭州", "深圳"].map((c) => (
                  <label key={c} className="flex items-center gap-1.5 text-sm">
                    <Checkbox /> {c}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>是否为 BDM</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>状态</Label>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>取消</Button>
            <Button onClick={() => setShowUserDialog(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Org Node Dialog */}
      <Dialog open={showOrgDialog} onOpenChange={setShowOrgDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>新增组织节点</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>节点名称</Label>
              <Input placeholder="请输入名称" />
            </div>
            <div className="space-y-2">
              <Label>节点类型</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="选择类型" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="department">部门</SelectItem>
                  <SelectItem value="region">大区</SelectItem>
                  <SelectItem value="city">城市</SelectItem>
                  <SelectItem value="team">团队</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>上级节点</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="选择上级" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">总部</SelectItem>
                  <SelectItem value="east">华东大区</SelectItem>
                  <SelectItem value="south">华南大区</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOrgDialog(false)}>取消</Button>
            <Button onClick={() => setShowOrgDialog(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
