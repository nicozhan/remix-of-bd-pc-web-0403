import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, Info, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompetitorItem {
  company: string;
  intro: string;
  projectIntro: string;
  proscons: string;
  collapsed: boolean;
}

const mockCustomers = [
  { id: "C001", name: "星巴克（中国）" },
  { id: "C002", name: "瑞幸咖啡" },
  { id: "C003", name: "全家便利店" },
  { id: "C004", name: "海底捞火锅" },
  { id: "C005", name: "万达广场" },
];

const OpportunityCreate = () => {
  const navigate = useNavigate();
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [competitors, setCompetitors] = useState<CompetitorItem[]>([
    { company: "", intro: "", projectIntro: "", proscons: "", collapsed: false },
  ]);

  const filteredCustomers = customerSearch
    ? mockCustomers.filter((c) => c.name.includes(customerSearch))
    : [];

  const addCompetitor = () =>
    setCompetitors([...competitors, { company: "", intro: "", projectIntro: "", proscons: "", collapsed: false }]);
  const removeCompetitor = (i: number) => setCompetitors(competitors.filter((_, idx) => idx !== i));
  const toggleCompetitor = (i: number) =>
    setCompetitors(competitors.map((c, idx) => (idx === i ? { ...c, collapsed: !c.collapsed } : c)));

  return (
    <div className="mx-auto max-w-[900px] px-6 py-6">
      <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate("/customers")}>
        <ArrowLeft className="h-4 w-4 mr-1" />返回列表
      </Button>

      <h1 className="text-xl font-semibold text-foreground mb-6">新建商机</h1>

      <div className="space-y-6">
        {/* 模块1：基础信息 */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">基础信息</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">商机名称 <span className="text-destructive">*</span></label>
              <Input placeholder="请输入商机名称" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">商机编号</label>
              <Input value="SJ-20260407-007" disabled className="bg-muted" />
            </div>

            {/* 客户搜索联动 */}
            <div className="space-y-1.5 relative">
              <label className="text-sm text-muted-foreground">商机客户 <span className="text-destructive">*</span></label>
              {selectedCustomer ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center">
                    {selectedCustomer}
                  </div>
                  <Button variant="ghost" size="sm" className="h-10 text-muted-foreground" onClick={() => { setSelectedCustomer(null); setCustomerSearch(""); }}>
                    更换
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索已有客户..."
                    className="pl-9"
                    value={customerSearch}
                    onChange={(e) => { setCustomerSearch(e.target.value); setShowDropdown(true); }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  />
                  {showDropdown && customerSearch && (
                    <div className="absolute top-full left-0 right-0 mt-1 rounded-md border border-border bg-card shadow-lg z-10 max-h-[200px] overflow-y-auto">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((c) => (
                          <div
                            key={c.id}
                            className="px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                            onMouseDown={() => { setSelectedCustomer(c.name); setShowDropdown(false); }}
                          >
                            {c.name}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center">
                          <p className="text-sm text-muted-foreground mb-2">未找到匹配客户</p>
                          <Button variant="outline" size="sm" onMouseDown={() => navigate("/customers/new")}>
                            <Plus className="h-3.5 w-3.5 mr-1" />创建新客户
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">客户海域 <span className="text-destructive">*</span></label>
              <Select>
                <SelectTrigger><SelectValue placeholder="选择海域" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">公海</SelectItem>
                  <SelectItem value="private">私海</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">联系人姓名 <span className="text-destructive">*</span></label>
              <Input placeholder="联系人姓名" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">联系人电话 <span className="text-destructive">*</span></label>
              <Input placeholder="联系人电话" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">联系人职位</label>
              <Input placeholder="联系人职位" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">细分市场 <span className="text-destructive">*</span></label>
              <Select>
                <SelectTrigger><SelectValue placeholder="选择细分市场" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gov">公共类-政府部门</SelectItem>
                  <SelectItem value="city">公共类-城投平台</SelectItem>
                  <SelectItem value="school">商业类-高校</SelectItem>
                  <SelectItem value="factory">商业类-厂企</SelectItem>
                  <SelectItem value="scenic">商业类-景区</SelectItem>
                  <SelectItem value="hospital">商业类-医院</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">点位场景类型 <span className="text-destructive">*</span></label>
              <Select>
                <SelectTrigger><SelectValue placeholder="选择场景类型" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">一般商业场景</SelectItem>
                  <SelectItem value="project">项目类</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">商机等级 <span className="text-destructive">*</span></label>
              <Select>
                <SelectTrigger><SelectValue placeholder="选择商机等级" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A级（20台以上）</SelectItem>
                  <SelectItem value="B">B级（5~20台）</SelectItem>
                  <SelectItem value="C">C级（5台以下）</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <label className="text-sm text-muted-foreground">商机描述</label>
            <Textarea placeholder="请输入商机详细描述..." rows={3} />
          </div>
        </div>

        {/* 模块2：竞对介绍 */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">竞对介绍</h2>
            <Button variant="outline" size="sm" onClick={addCompetitor}><Plus className="h-4 w-4 mr-1" />添加竞对</Button>
          </div>
          <div className="space-y-3">
            {competitors.map((comp, i) => (
              <div key={i} className="rounded-md border border-border bg-accent/20 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-accent/40" onClick={() => toggleCompetitor(i)}>
                  <span className="text-sm font-medium">竞对 {i + 1}{comp.company ? ` - ${comp.company}` : ""}</span>
                  <div className="flex items-center gap-1">
                    {competitors.length > 1 && (
                      <Button variant="ghost" size="sm" className="h-7 text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); removeCompetitor(i); }}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {comp.collapsed ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronUp className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>
                {!comp.collapsed && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground">竞对公司</label>
                        <Input placeholder="公司名称" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground">公司整体介绍</label>
                        <Input placeholder="简要介绍" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">项目介绍</label>
                      <Textarea placeholder="竞对项目详情" rows={2} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">优劣势</label>
                      <Textarea placeholder="竞对优势与劣势分析" rows={2} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 提示 */}
        <div className="rounded-md bg-primary/5 border border-primary/20 p-3 flex gap-2">
          <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">商机客户支持搜索已有客户关联，若客户不存在可直接创建新客户。商机等级决定后续审批流程，A级商机需BDM审核。</p>
        </div>

        {/* 按钮 */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => navigate("/customers")}>取消</Button>
          <Button variant="outline">保存草稿</Button>
          <Button>提交</Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCreate;
