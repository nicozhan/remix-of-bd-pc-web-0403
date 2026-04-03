import { useState } from "react";
import {
  Plus, Search as SearchIcon, Info, Upload, Trash2, GripVertical,
  FileText, Video, AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";

interface Stage {
  id: string;
  name: string;
  startDay: number;
  files: { name: string; type: "pdf" | "ppt" | "video" }[];
  hasExam: boolean;
}

interface Course {
  id: string;
  name: string;
  type: "阶段课程" | "普通课程";
  roles: string[];
  totalDays: number;
  hasMentor: boolean;
  created: string;
  status: "进行中" | "已结束";
}

const mockCourses: Course[] = [
  { id: "CR001", name: "BD入职培训体系", type: "阶段课程", roles: ["BD"], totalDays: 30, hasMentor: true, created: "2026-03-01", status: "进行中" },
  { id: "CR002", name: "BDM管理能力提升", type: "阶段课程", roles: ["BDM"], totalDays: 45, hasMentor: true, created: "2026-02-15", status: "进行中" },
  { id: "CR003", name: "产品知识培训", type: "普通课程", roles: ["BD", "BDM"], totalDays: 7, hasMentor: false, created: "2026-03-20", status: "进行中" },
  { id: "CR004", name: "合规与安全培训", type: "普通课程", roles: ["BD", "BDM"], totalDays: 3, hasMentor: false, created: "2026-01-10", status: "已结束" },
  { id: "CR005", name: "高级谈判技巧", type: "阶段课程", roles: ["BD"], totalDays: 21, hasMentor: true, created: "2026-04-01", status: "进行中" },
];

const defaultStages: Stage[] = [
  { id: "s1", name: "基础认知", startDay: 1, files: [{ name: "公司介绍.pdf", type: "pdf" }], hasExam: false },
  { id: "s2", name: "产品学习", startDay: 8, files: [{ name: "产品手册.pdf", type: "pdf" }, { name: "产品演示.mp4", type: "video" }], hasExam: true },
  { id: "s3", name: "实战演练", startDay: 15, files: [{ name: "话术指南.pptx", type: "ppt" }], hasExam: true },
];

const fileIcon = (type: string) => {
  if (type === "video") return <Video className="h-4 w-4 text-primary" />;
  return <FileText className="h-4 w-4 text-primary" />;
};

const CourseConfig = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courseType, setCourseType] = useState<"staged" | "normal">("staged");
  const [stages, setStages] = useState<Stage[]>(defaultStages);
  const [alertOverdue, setAlertOverdue] = useState(true);
  const [alertStage, setAlertStage] = useState(true);

  const addStage = () => {
    const lastDay = stages.length > 0 ? stages[stages.length - 1].startDay + 7 : 1;
    setStages([...stages, {
      id: `s${Date.now()}`,
      name: "",
      startDay: lastDay,
      files: [],
      hasExam: false,
    }]);
  };

  const removeStage = (id: string) => setStages(stages.filter((s) => s.id !== id));

  const openCreate = () => {
    setCourseType("staged");
    setStages(defaultStages);
    setDialogOpen(true);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader
        title="课程配置"
        description="创建和管理培训课程"
        actions={<Button size="sm" onClick={openCreate}><Plus className="h-4 w-4 mr-1" />新建课程</Button>}
      />

      {/* Alert rules tip */}
      <div className="rounded-lg border border-warning/30 bg-warning/5 p-4 flex gap-3 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-foreground mb-1">告警规则</p>
          <ul className="text-muted-foreground space-y-0.5">
            <li>• 超出总学习天数未完成 → 系统告警通知</li>
            <li>• 阶段学习未按时完成 → 阶段超期告警</li>
          </ul>
        </div>
      </div>

      {/* System logic tip */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex gap-3 mb-4">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">系统提示：</span>用户创建后，系统将根据角色自动分配关联课程。部分课程可配置为不需要评分。
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索课程名称" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[130px]"><SelectValue placeholder="课程类型" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="staged">阶段课程</SelectItem>
            <SelectItem value="normal">普通课程</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>课程名称</TableHead>
              <TableHead>课程类型</TableHead>
              <TableHead>关联角色</TableHead>
              <TableHead className="text-right">总学习天数</TableHead>
              <TableHead>导师配置</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCourses.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium text-primary">{c.name}</TableCell>
                <TableCell><StatusBadge status={c.type} type={c.type === "阶段课程" ? "primary" : "default"} /></TableCell>
                <TableCell>{c.roles.join(" / ")}</TableCell>
                <TableCell className="text-right">{c.totalDays}天</TableCell>
                <TableCell>{c.hasMentor ? <StatusBadge status="已配置" type="success" /> : <span className="text-muted-foreground text-sm">未配置</span>}</TableCell>
                <TableCell className="text-muted-foreground">{c.created}</TableCell>
                <TableCell><StatusBadge status={c.status} type={c.status === "进行中" ? "primary" : "default"} /></TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => setDialogOpen(true)}>编辑</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">删除</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
          <span>共 {mockCourses.length} 条记录</span>
          <span>第 1 / 1 页</span>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新建课程</DialogTitle>
          </DialogHeader>

          <Tabs value={courseType} onValueChange={(v) => setCourseType(v as "staged" | "normal")} className="space-y-4">
            <TabsList>
              <TabsTrigger value="staged">阶段课程</TabsTrigger>
              <TabsTrigger value="normal">普通课程</TabsTrigger>
            </TabsList>

            {/* Common fields */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm">课程名称</Label>
                <Input className="mt-1" placeholder="请输入课程名称" />
              </div>
              <div>
                <Label className="text-sm">关联角色</Label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="role-bd" defaultChecked />
                    <label htmlFor="role-bd" className="text-sm">BD</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="role-bdm" />
                    <label htmlFor="role-bdm" className="text-sm">BDM</label>
                  </div>
                </div>
              </div>

              <TabsContent value="staged" className="mt-0 space-y-4">
                <div>
                  <Label className="text-sm">总学习天数</Label>
                  <Input type="number" className="mt-1 w-32" placeholder="30" defaultValue={30} />
                </div>

                {/* Stages */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-semibold">阶段配置</Label>
                    <Button variant="outline" size="sm" onClick={addStage}><Plus className="h-3.5 w-3.5 mr-1" />添加阶段</Button>
                  </div>
                  <div className="space-y-3">
                    {stages.map((stage, i) => (
                      <div key={stage.id} className="rounded-lg border border-border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">阶段 {i + 1}</span>
                          </div>
                          {stages.length > 1 && (
                            <Button variant="ghost" size="sm" className="h-7 text-destructive" onClick={() => removeStage(stage.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">阶段名称</Label>
                            <Input className="mt-1" defaultValue={stage.name} placeholder="如：基础认知" />
                          </div>
                          <div>
                            <Label className="text-xs">开始天数</Label>
                            <Input type="number" className="mt-1" defaultValue={stage.startDay} placeholder="第N天" />
                          </div>
                        </div>
                        {/* Files */}
                        <div>
                          <Label className="text-xs">学习内容</Label>
                          <div className="mt-1 space-y-1.5">
                            {stage.files.map((f, fi) => (
                              <div key={fi} className="flex items-center gap-2 text-sm bg-accent/30 rounded px-2 py-1.5">
                                {fileIcon(f.type)}
                                <span className="flex-1 truncate">{f.name}</span>
                                <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" size="sm" className="mt-2 h-8 text-xs">
                            <Upload className="h-3.5 w-3.5 mr-1" />上传文件
                          </Button>
                        </div>
                        {/* Exam toggle */}
                        <div className="flex items-center gap-2">
                          <Switch id={`exam-${stage.id}`} defaultChecked={stage.hasExam} />
                          <Label htmlFor={`exam-${stage.id}`} className="text-xs">需要考试</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mentor config */}
                <div>
                  <Label className="text-sm font-semibold">导师配置</Label>
                  <Select>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="选择导师分配方式" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="specify">指定导师</SelectItem>
                      <SelectItem value="by-bd">按BD分配导师</SelectItem>
                      <SelectItem value="none">不配置导师</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Alert config */}
                <div className="rounded-lg border border-warning/30 bg-warning/5 p-3 space-y-2">
                  <p className="text-sm font-medium text-foreground">告警配置</p>
                  <div className="flex items-center gap-2">
                    <Switch id="alert-overdue" checked={alertOverdue} onCheckedChange={setAlertOverdue} />
                    <Label htmlFor="alert-overdue" className="text-xs text-muted-foreground">超出总学习天数未完成 → 告警</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="alert-stage" checked={alertStage} onCheckedChange={setAlertStage} />
                    <Label htmlFor="alert-stage" className="text-xs text-muted-foreground">阶段学习未按时完成 → 告警</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="normal" className="mt-0 space-y-4">
                <div>
                  <Label className="text-sm">学习内容上传</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center gap-2 text-center mt-1">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">点击或拖拽上传 PDF / PPT / 视频</p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button onClick={() => setDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseConfig;
