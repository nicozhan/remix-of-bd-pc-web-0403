import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactItem { name: string; phone: string; role: string }
interface CompetitorItem { company: string; intro: string; project: string; advantages: string; disadvantages: string }

const CustomerCreate = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactItem[]>([{ name: "", phone: "", role: "" }]);
  const [competitors, setCompetitors] = useState<CompetitorItem[]>([]);

  const addContact = () => setContacts([...contacts, { name: "", phone: "", role: "" }]);
  const removeContact = (i: number) => setContacts(contacts.filter((_, idx) => idx !== i));

  const addCompetitor = () => setCompetitors([...competitors, { company: "", intro: "", project: "", advantages: "", disadvantages: "" }]);
  const removeCompetitor = (i: number) => setCompetitors(competitors.filter((_, idx) => idx !== i));

  return (
    <div className="mx-auto max-w-[900px] px-6 py-6">
      <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate("/customers")}>
        <ArrowLeft className="h-4 w-4 mr-1" />返回列表
      </Button>

      <h1 className="text-xl font-semibold mb-6">新建客户</h1>

      <div className="space-y-6">
        {/* 基础信息 */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">基础信息</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>客户名称 <span className="text-destructive">*</span></Label>
                <Input placeholder="请输入客户名称" />
              </div>
              <div className="space-y-1.5">
                <Label>客户编码</Label>
                <Input value="系统自动生成" disabled className="bg-muted" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>客户位置 <span className="text-destructive">*</span></Label>
              <Input placeholder="请输入详细地址" />
              <div className="h-[180px] rounded-md bg-muted flex items-center justify-center text-sm text-muted-foreground border border-border">
                地图组件占位区域
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 联系人 */}
        <Card>
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <CardTitle className="text-base">联系人</CardTitle>
            <Button size="sm" variant="outline" onClick={addContact}><Plus className="h-4 w-4 mr-1" />新增一条</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {contacts.map((_, i) => (
              <div key={i} className="p-3 rounded-md border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">联系人 {i + 1}</span>
                  {contacts.length > 1 && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeContact(i)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label>姓名</Label>
                    <Input placeholder="姓名" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>电话</Label>
                    <Input placeholder="电话" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>职位</Label>
                    <Input placeholder="职位" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 客户等级 */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">客户等级</CardTitle></CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger className="w-[240px]"><SelectValue placeholder="请选择客户等级" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A级（核心客户）</SelectItem>
                <SelectItem value="B">B级（重要客户）</SelectItem>
                <SelectItem value="C">C级（一般客户）</SelectItem>
                <SelectItem value="D">D级（潜在客户）</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* 竞对信息 */}
        <Card>
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <CardTitle className="text-base">竞对信息</CardTitle>
            <Button size="sm" variant="outline" onClick={addCompetitor}><Plus className="h-4 w-4 mr-1" />新增一条</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {competitors.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">暂无竞对信息，点击上方按钮添加</p>
            )}
            {competitors.map((_, i) => (
              <div key={i} className="p-3 rounded-md border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">竞对 {i + 1}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeCompetitor(i)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>竞对公司</Label>
                    <Input placeholder="公司名称" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>公司介绍</Label>
                    <Input placeholder="简要介绍" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>项目介绍</Label>
                  <Input placeholder="竞对项目情况" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>优势</Label>
                    <Textarea placeholder="竞对优势" className="min-h-[60px]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>劣势</Label>
                    <Textarea placeholder="竞对劣势" className="min-h-[60px]" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="flex justify-end gap-3 pb-6">
          <Button variant="outline" onClick={() => navigate("/customers")}>取消</Button>
          <Button variant="outline">保存草稿</Button>
          <Button>提交</Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCreate;
