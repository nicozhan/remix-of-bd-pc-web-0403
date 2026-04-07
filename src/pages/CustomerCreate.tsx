import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, MapPin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactItem {
  name: string;
  phone: string;
  position: string;
}

interface CompetitorItem {
  company: string;
  intro: string;
  projectIntro: string;
  proscons: string;
}

const CustomerCreate = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactItem[]>([{ name: "", phone: "", position: "" }]);
  const [competitors, setCompetitors] = useState<CompetitorItem[]>([{ company: "", intro: "", projectIntro: "", proscons: "" }]);

  const addContact = () => setContacts([...contacts, { name: "", phone: "", position: "" }]);
  const removeContact = (i: number) => setContacts(contacts.filter((_, idx) => idx !== i));
  const addCompetitor = () => setCompetitors([...competitors, { company: "", intro: "", projectIntro: "", proscons: "" }]);
  const removeCompetitor = (i: number) => setCompetitors(competitors.filter((_, idx) => idx !== i));

  return (
    <div className="mx-auto max-w-[900px] px-6 py-6">
      <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate("/customers")}>
        <ArrowLeft className="h-4 w-4 mr-1" />返回列表
      </Button>

      <h1 className="text-xl font-semibold text-foreground mb-6">新建客户</h1>

      <div className="space-y-6">
        {/* 基础信息 */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">基础信息</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">客户名称 <span className="text-destructive">*</span></label>
              <Input placeholder="请输入客户名称" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">客户编码</label>
              <Input value="KH-20260407-006" disabled className="bg-muted" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-sm text-muted-foreground">客户位置</label>
              <div className="flex gap-2">
                <Input placeholder="请输入详细地址" className="flex-1" />
                <Button variant="outline" size="sm"><MapPin className="h-4 w-4 mr-1" />地图选点</Button>
              </div>
              <div className="h-[160px] rounded-md bg-muted flex items-center justify-center text-sm text-muted-foreground border border-border">
                <MapPin className="h-5 w-5 mr-2" />地图选点区域
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">已激活设备数量</label>
              <Input value="0" disabled className="bg-muted" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">待激活设备数量</label>
              <Input value="0" disabled className="bg-muted" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">待安装设备数量</label>
              <Input value="0" disabled className="bg-muted" />
            </div>
          </div>
        </div>

        {/* 联系人 */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">联系人</h2>
            <Button variant="outline" size="sm" onClick={addContact}><Plus className="h-4 w-4 mr-1" />添加联系人</Button>
          </div>
          <div className="space-y-3">
            {contacts.map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 items-end p-3 rounded-md bg-accent/30">
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">姓名</label>
                  <Input placeholder="联系人姓名" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">电话</label>
                  <Input placeholder="联系人电话" />
                </div>
                <div className="flex gap-2 items-end">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs text-muted-foreground">职位</label>
                    <Input placeholder="联系人职位" />
                  </div>
                  {contacts.length > 1 && (
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-destructive hover:text-destructive" onClick={() => removeContact(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 客户等级 */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">客户等级</h2>
          <div className="w-[200px]">
            <Select>
              <SelectTrigger><SelectValue placeholder="选择客户等级" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="S">S级</SelectItem>
                <SelectItem value="A">A级</SelectItem>
                <SelectItem value="B">B级</SelectItem>
                <SelectItem value="C">C级</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 竞对信息 */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">竞对信息</h2>
            <Button variant="outline" size="sm" onClick={addCompetitor}><Plus className="h-4 w-4 mr-1" />添加竞对</Button>
          </div>
          <div className="space-y-4">
            {competitors.map((_, i) => (
              <div key={i} className="p-4 rounded-md bg-accent/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">竞对 {i + 1}</span>
                  {competitors.length > 1 && (
                    <Button variant="ghost" size="sm" className="h-7 text-destructive hover:text-destructive" onClick={() => removeCompetitor(i)}>
                      <Trash2 className="h-3.5 w-3.5 mr-1" />删除
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">竞对公司</label>
                    <Input placeholder="公司名称" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">公司介绍</label>
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
            ))}
          </div>
        </div>

        {/* 提示 */}
        <div className="rounded-md bg-primary/5 border border-primary/20 p-3 flex gap-2">
          <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">客户创建后，系统将根据客户位置自动关联所属区域和BD。设备数量数据将由昆仑智服和人人取系统同步更新。</p>
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

export default CustomerCreate;
