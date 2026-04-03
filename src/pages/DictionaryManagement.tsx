import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Plus, ArrowLeft, BookMarked, Search } from "lucide-react";

interface DictType {
  id: string;
  name: string;
  code: string;
  created: string;
  items: DictItem[];
}

interface DictItem {
  id: string;
  label: string;
  value: string;
  sort: number;
  status: "启用" | "禁用";
}

const dictTypes: DictType[] = [
  {
    id: "1", name: "细分市场", code: "market_segment", created: "2024-01-01",
    items: [
      { id: "1-1", label: "公共类-政府部门", value: "gov", sort: 1, status: "启用" },
      { id: "1-2", label: "公共类-城投平台", value: "city_invest", sort: 2, status: "启用" },
      { id: "1-3", label: "商业类-高校", value: "university", sort: 3, status: "启用" },
      { id: "1-4", label: "商业类-厂企", value: "factory", sort: 4, status: "启用" },
      { id: "1-5", label: "商业类-景区", value: "scenic", sort: 5, status: "启用" },
      { id: "1-6", label: "商业类-医院", value: "hospital", sort: 6, status: "启用" },
      { id: "1-7", label: "其他", value: "other", sort: 7, status: "启用" },
    ],
  },
  {
    id: "2", name: "设备合作模式", code: "cooperation_mode", created: "2024-01-01",
    items: [
      { id: "2-1", label: "自营", value: "self", sort: 1, status: "启用" },
      { id: "2-2", label: "合作", value: "partner", sort: 2, status: "启用" },
      { id: "2-3", label: "租赁", value: "lease", sort: 3, status: "启用" },
    ],
  },
  {
    id: "3", name: "对账周期", code: "billing_cycle", created: "2024-01-01",
    items: [
      { id: "3-1", label: "月结", value: "monthly", sort: 1, status: "启用" },
      { id: "3-2", label: "季结", value: "quarterly", sort: 2, status: "启用" },
      { id: "3-3", label: "年结", value: "yearly", sort: 3, status: "禁用" },
    ],
  },
  {
    id: "4", name: "电费承担方", code: "electricity_payer", created: "2024-01-01",
    items: [
      { id: "4-1", label: "甲方承担", value: "party_a", sort: 1, status: "启用" },
      { id: "4-2", label: "乙方承担", value: "party_b", sort: 2, status: "启用" },
      { id: "4-3", label: "各自承担", value: "split", sort: 3, status: "启用" },
    ],
  },
  {
    id: "5", name: "推荐机型", code: "device_model", created: "2024-01-05",
    items: [
      { id: "5-1", label: "标准型", value: "standard", sort: 1, status: "启用" },
      { id: "5-2", label: "高端型", value: "premium", sort: 2, status: "启用" },
    ],
  },
  {
    id: "6", name: "商机场景", code: "opportunity_scene", created: "2024-01-05",
    items: [
      { id: "6-1", label: "室内", value: "indoor", sort: 1, status: "启用" },
      { id: "6-2", label: "室外", value: "outdoor", sort: 2, status: "启用" },
      { id: "6-3", label: "半开放", value: "semi_open", sort: 3, status: "启用" },
    ],
  },
];

export default function DictionaryManagement() {
  const [selectedDict, setSelectedDict] = useState<DictType | null>(null);
  const [searchDict, setSearchDict] = useState("");
  const [showItemDialog, setShowItemDialog] = useState(false);

  const filteredDicts = dictTypes.filter((d) => d.name.includes(searchDict) || d.code.includes(searchDict));

  if (selectedDict) {
    return (
      <div className="space-y-6">
        <PageHeader title="字典管理" description={`${selectedDict.name} - 字典项管理`} />
        <Button variant="outline" size="sm" onClick={() => setSelectedDict(null)}>
          <ArrowLeft className="h-3.5 w-3.5 mr-1" /> 返回字典列表
        </Button>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{selectedDict.name}（{selectedDict.code}）</CardTitle>
              <Button size="sm" className="h-8" onClick={() => setShowItemDialog(true)}>
                <Plus className="h-3.5 w-3.5 mr-1" /> 新增字典项
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>字典项名称</TableHead>
                  <TableHead>值（value）</TableHead>
                  <TableHead>排序</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedDict.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.label}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">{item.value}</TableCell>
                    <TableCell>{item.sort}</TableCell>
                    <TableCell>
                      <Badge className={item.status === "启用"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-muted text-muted-foreground"
                      }>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>新增字典项</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>字典项名称</Label>
                <Input placeholder="请输入名称" />
              </div>
              <div className="space-y-2">
                <Label>值（value）</Label>
                <Input placeholder="请输入值" />
              </div>
              <div className="space-y-2">
                <Label>排序</Label>
                <Input type="number" placeholder="排序数字" />
              </div>
              <div className="flex items-center justify-between">
                <Label>状态</Label>
                <Switch defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowItemDialog(false)}>取消</Button>
              <Button onClick={() => setShowItemDialog(false)}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="字典管理" description="管理系统字典配置项" />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <BookMarked className="h-4 w-4" /> 字典列表
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="搜索字典..."
                className="pl-8 h-8 w-48 text-sm"
                value={searchDict}
                onChange={(e) => setSearchDict(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>字典名称</TableHead>
                <TableHead>字段标识</TableHead>
                <TableHead>字典项数量</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDicts.map((dict) => (
                <TableRow key={dict.id} className="cursor-pointer" onClick={() => setSelectedDict(dict)}>
                  <TableCell className="font-medium">{dict.name}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">{dict.code}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{dict.items.length} 项</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{dict.created}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={(e) => { e.stopPropagation(); setSelectedDict(dict); }}>
                      管理字典项
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
