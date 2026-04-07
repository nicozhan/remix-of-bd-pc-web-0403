import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin, Plus, ChevronDown, ChevronUp, Eye, Pencil, Trash2, Briefcase, Search as SearchIcon, ClipboardCheck, Truck, Wrench } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import StatusBadge from "@/components/shared/StatusBadge";
import SourceTag from "@/components/shared/SourceTag";
import ActivityTimeline from "@/components/shared/ActivityTimeline";

const customer = {
  id: "C001",
  name: "星巴克（中国）",
  code: "CUST-2025-0001",
  contact: "张经理",
  phone: "138****1234",
  email: "zhang@starbucks.cn",
  address: "北京市朝阳区建国路88号",
  bd: "李明",
  type: "连锁品牌",
  industry: "餐饮",
  source: "BD拓展",
  level: "A级",
  created: "2025-12-01",
  devices: { activated: 8, pending: 3, toInstall: 2 },
};

const contacts = [
  { id: 1, name: "张经理", role: "区域负责人", phone: "138****1234", email: "zhang@starbucks.cn" },
  { id: 2, name: "李助理", role: "行政对接", phone: "139****5678", email: "li@starbucks.cn" },
];

const activities = [
  { id: "1", user: "李明", action: "添加了跟进记录", time: "2026-04-02 14:30", content: "电话沟通设备入驻方案，客户有意向在国贸店试点", type: "visit" },
  { id: "2", user: "李明", action: "完成了现场拜访", time: "2026-03-28 10:00", content: "实地勘察国贸店，门店面积120㎡，可放置2台设备", type: "survey" },
  { id: "3", user: "周伟", action: "提交了安装工单", time: "2026-03-20 09:00", content: "三里屯店2台设备安装完成", type: "install" },
  { id: "4", user: "赵静", action: "创建了商机", time: "2026-03-15 11:00", content: "新建星巴克-西单大悦城店商机", type: "opportunity" },
  { id: "5", user: "赵静", action: "创建了客户", time: "2025-12-01 09:00", type: "create" },
];

const opportunities = [
  { id: "O001", name: "星巴克-国贸店设备入驻", status: "跟进中", bd: "李明", created: "2026-03-15" },
  { id: "O002", name: "星巴克-三里屯店设备入驻", status: "勘察中", bd: "李明", created: "2026-03-20" },
  { id: "O003", name: "星巴克-西单大悦城店", status: "签约中", bd: "赵静", created: "2026-03-25" },
];

const pointsData = [
  { id: 1, name: "国贸店-1号机", code: "PT-BJ-001", address: "北京市朝阳区建国路88号", status: "运营中", installTime: "2026-02-15", activateTime: "2026-02-18", revenue: "12,500", dailyRevenue: "420", totalRevenue: "45,000" },
  { id: 2, name: "三里屯店-1号机", code: "PT-BJ-002", address: "北京市朝阳区三里屯路19号", status: "运营中", installTime: "2026-03-01", activateTime: "2026-03-05", revenue: "8,200", dailyRevenue: "310", totalRevenue: "28,000" },
  { id: 3, name: "三里屯店-2号机", code: "PT-BJ-003", address: "北京市朝阳区三里屯路19号", status: "待激活", installTime: "2026-03-20", activateTime: "—", revenue: "—", dailyRevenue: "—", totalRevenue: "—" },
];

const contractsData = [
  { id: "HT-001", name: "星巴克国贸店设备入驻合同", status: "已签署", signDate: "2026-02-10", parties: "星巴克（中国） & 我方" },
  { id: "HT-002", name: "星巴克三里屯店设备入驻合同", status: "审批中", signDate: "—", parties: "星巴克（中国） & 我方" },
];

const competitors = [
  { id: 1, company: "友宝", intro: "国内领先的自动售货机运营商", project: "已在国贸店部署3台售货机", advantages: "品牌知名度高，网点密集", disadvantages: "设备型号老旧，补货不及时" },
  { id: 2, company: "农夫山泉", intro: "饮品巨头旗下智能零售", project: "计划在三里屯布局", advantages: "供应链强，产品成本低", disadvantages: "设备品类单一" },
];

const typeIconMap: Record<string, React.ReactNode> = {
  visit: <SearchIcon className="h-3.5 w-3.5 text-primary" />,
  survey: <ClipboardCheck className="h-3.5 w-3.5 text-primary" />,
  opportunity: <Briefcase className="h-3.5 w-3.5 text-primary" />,
  install: <Wrench className="h-3.5 w-3.5 text-primary" />,
  create: <Plus className="h-3.5 w-3.5 text-primary" />,
};

const CustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [expandedCompetitor, setExpandedCompetitor] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate("/customers")}>
        <ArrowLeft className="h-4 w-4 mr-1" />返回列表
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Info cards */}
        <div className="lg:col-span-1 space-y-4">
          {/* 基础信息 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">基础信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{customer.name}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">编码：{customer.code}</p>
                <StatusBadge status={customer.type} type="default" className="mt-1" />
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />{customer.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />{customer.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />{customer.address}
                </div>
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">所属BD</span><span>{customer.bd}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">行业</span><span>{customer.industry}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">来源</span><span>{customer.source}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">创建时间</span><span>{customer.created}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* 设备信息 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">设备信息</CardTitle>
                <SourceTag source="kunlun" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-md bg-green-50 border border-green-100">
                  <p className="text-xl font-bold text-green-600">{customer.devices.activated}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">已激活</p>
                </div>
                <div className="text-center p-3 rounded-md bg-amber-50 border border-amber-100">
                  <p className="text-xl font-bold text-amber-600">{customer.devices.pending}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">待激活</p>
                </div>
                <div className="text-center p-3 rounded-md bg-blue-50 border border-blue-100">
                  <p className="text-xl font-bold text-primary">{customer.devices.toInstall}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">待安装</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 客户等级 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">客户等级</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="A">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A级（核心客户）</SelectItem>
                  <SelectItem value="B">B级（重要客户）</SelectItem>
                  <SelectItem value="C">C级（一般客户）</SelectItem>
                  <SelectItem value="D">D级（潜在客户）</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">等级依据商机数据自动推荐，可手动调整</p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="follow" className="space-y-4">
            <TabsList className="flex-wrap">
              <TabsTrigger value="follow">跟进动态</TabsTrigger>
              <TabsTrigger value="contacts">联系人</TabsTrigger>
              <TabsTrigger value="opportunities">商机</TabsTrigger>
              <TabsTrigger value="compete">竞对信息</TabsTrigger>
              <TabsTrigger value="points">点位信息</TabsTrigger>
              <TabsTrigger value="contracts">合同</TabsTrigger>
            </TabsList>

            {/* 跟进动态 */}
            <TabsContent value="follow">
              <Card>
                <CardContent className="pt-5">
                  <div className="space-y-0">
                    {activities.map((act, i) => (
                      <div key={act.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                            {typeIconMap[act.type || "create"]}
                          </div>
                          {i < activities.length - 1 && <div className="w-0.5 flex-1 min-h-[16px] bg-border" />}
                        </div>
                        <div className="pb-5 pt-0.5">
                          <p className="text-sm text-foreground">
                            <span className="font-medium">{act.user}</span>{" "}
                            <span className="text-muted-foreground">{act.action}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{act.time}</p>
                          {act.content && (
                            <p className="text-sm text-muted-foreground mt-1 bg-muted rounded px-2 py-1">{act.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 联系人 */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader className="pb-3 flex-row items-center justify-between">
                  <CardTitle className="text-base">联系人列表</CardTitle>
                  <Button size="sm" onClick={() => setContactDialogOpen(true)}><Plus className="h-4 w-4 mr-1" />新增联系人</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contacts.map((c) => (
                      <div key={c.id} className="flex items-center justify-between p-3 rounded-md bg-accent/30">
                        <div>
                          <p className="text-sm font-medium">{c.name} <span className="text-xs text-muted-foreground ml-1">{c.role}</span></p>
                          <p className="text-xs text-muted-foreground mt-0.5">{c.phone} · {c.email}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 商机 */}
            <TabsContent value="opportunities">
              <Card>
                <CardContent className="pt-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>商机名称</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>所属BD</TableHead>
                        <TableHead>创建时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {opportunities.map((o) => (
                        <TableRow key={o.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/opportunities/${o.id}`)}>
                          <TableCell className="font-medium text-primary">{o.name}</TableCell>
                          <TableCell><StatusBadge status={o.status} /></TableCell>
                          <TableCell>{o.bd}</TableCell>
                          <TableCell className="text-muted-foreground">{o.created}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 竞对信息 */}
            <TabsContent value="compete">
              <Card>
                <CardHeader className="pb-3 flex-row items-center justify-between">
                  <CardTitle className="text-base">竞对信息</CardTitle>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" />新增竞对</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {competitors.map((comp) => (
                      <Collapsible key={comp.id} open={expandedCompetitor === comp.id} onOpenChange={(open) => setExpandedCompetitor(open ? comp.id : null)}>
                        <div className="rounded-md border border-border">
                          <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-accent/30">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{comp.company}</span>
                              <span className="text-xs text-muted-foreground">— {comp.intro}</span>
                            </div>
                            {expandedCompetitor === comp.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="px-3 pb-3 pt-0 space-y-2 text-sm border-t border-border">
                              <div className="pt-2"><span className="text-muted-foreground">项目介绍：</span>{comp.project}</div>
                              <div><span className="text-green-600 font-medium">优势：</span>{comp.advantages}</div>
                              <div><span className="text-destructive font-medium">劣势：</span>{comp.disadvantages}</div>
                              <div className="flex gap-1 pt-1">
                                <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5 mr-1" />编辑</Button>
                                <Button variant="outline" size="sm" className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-1" />删除</Button>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 点位信息 */}
            <TabsContent value="points">
              <Card>
                <CardContent className="pt-5">
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>点位名称 <SourceTag source="renrenqu" /></TableHead>
                          <TableHead>点位编码 <SourceTag source="renrenqu" /></TableHead>
                          <TableHead>地址 <SourceTag source="renrenqu" /></TableHead>
                          <TableHead>状态 <SourceTag source="renrenqu" /></TableHead>
                          <TableHead>安装时间 <SourceTag source="kunlun" /></TableHead>
                          <TableHead>激活时间 <SourceTag source="renrenqu" /></TableHead>
                          <TableHead className="text-right">营业额 <SourceTag source="renrenqu" /></TableHead>
                          <TableHead className="text-right">日均 <SourceTag source="renrenqu" /></TableHead>
                          <TableHead className="text-right">累计 <SourceTag source="renrenqu" /></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pointsData.map((p) => (
                          <TableRow key={p.id}>
                            <TableCell className="font-medium">{p.name}</TableCell>
                            <TableCell className="text-muted-foreground">{p.code}</TableCell>
                            <TableCell className="text-muted-foreground max-w-[160px] truncate">{p.address}</TableCell>
                            <TableCell><StatusBadge status={p.status} /></TableCell>
                            <TableCell className="text-muted-foreground">{p.installTime}</TableCell>
                            <TableCell className="text-muted-foreground">{p.activateTime}</TableCell>
                            <TableCell className="text-right">¥{p.revenue}</TableCell>
                            <TableCell className="text-right">¥{p.dailyRevenue}</TableCell>
                            <TableCell className="text-right">¥{p.totalRevenue}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 合同 */}
            <TabsContent value="contracts">
              <Card>
                <CardContent className="pt-5">
                  <div className="space-y-3">
                    {contractsData.map((ct) => (
                      <div key={ct.id} className="flex items-center justify-between p-4 rounded-md border border-border">
                        <div>
                          <p className="text-sm font-medium">{ct.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{ct.parties} · 签署日期：{ct.signDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={ct.status} />
                          <Button variant="outline" size="sm"><Eye className="h-3.5 w-3.5 mr-1" />查看合同</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 新增联系人弹窗 */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>新增联系人</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>姓名</Label>
              <Input placeholder="请输入联系人姓名" />
            </div>
            <div className="space-y-1.5">
              <Label>职位</Label>
              <Input placeholder="请输入职位" />
            </div>
            <div className="space-y-1.5">
              <Label>电话</Label>
              <Input placeholder="请输入电话" />
            </div>
            <div className="space-y-1.5">
              <Label>邮箱</Label>
              <Input placeholder="请输入邮箱" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>取消</Button>
            <Button onClick={() => setContactDialogOpen(false)}>确认</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerDetail;
