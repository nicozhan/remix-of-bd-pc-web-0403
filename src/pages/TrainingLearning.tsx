import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Search as SearchIcon, ArrowLeft, Award, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/components/shared/StatusBadge";
import ActivityTimeline from "@/components/shared/ActivityTimeline";
import PageHeader from "@/components/shared/PageHeader";

interface LearningRecord {
  id: string;
  user: string;
  course: string;
  type: "阶段课程" | "普通课程";
  currentStage: string;
  progress: number;
  status: "未开始" | "学习中" | "已完成";
  overdue: boolean;
  mentorScore: "未评分" | "已评分" | "—";
  certificate: "未发放" | "已发放" | "—";
}

const records: LearningRecord[] = [
  { id: "L001", user: "李明", course: "BD入职培训体系", type: "阶段课程", currentStage: "实战演练", progress: 72, status: "学习中", overdue: false, mentorScore: "已评分", certificate: "未发放" },
  { id: "L002", user: "赵静", course: "BD入职培训体系", type: "阶段课程", currentStage: "已完成", progress: 100, status: "已完成", overdue: false, mentorScore: "已评分", certificate: "已发放" },
  { id: "L003", user: "周伟", course: "BD入职培训体系", type: "阶段课程", currentStage: "产品学习", progress: 35, status: "学习中", overdue: true, mentorScore: "未评分", certificate: "未发放" },
  { id: "L004", user: "王总监", course: "BDM管理能力提升", type: "阶段课程", currentStage: "管理实践", progress: 60, status: "学习中", overdue: false, mentorScore: "未评分", certificate: "未发放" },
  { id: "L005", user: "陈磊", course: "产品知识培训", type: "普通课程", currentStage: "—", progress: 100, status: "已完成", overdue: false, mentorScore: "—", certificate: "已发放" },
  { id: "L006", user: "张晓", course: "合规与安全培训", type: "普通课程", currentStage: "—", progress: 0, status: "未开始", overdue: false, mentorScore: "—", certificate: "—" },
];

const detailStages = [
  { name: "基础认知", status: "done" as const, score: 95, days: "第1-7天" },
  { name: "产品学习", status: "done" as const, score: 88, days: "第8-14天" },
  { name: "实战演练", status: "current" as const, score: null, days: "第15-30天" },
];

const detailActivities = [
  { id: "1", user: "李明", action: "完成了《产品学习》阶段考试", time: "2026-04-02 16:00", content: "考试成绩：88分" },
  { id: "2", user: "李明", action: "上传了学习笔记", time: "2026-04-01 10:30" },
  { id: "3", user: "李明", action: "完成了《基础认知》阶段", time: "2026-03-25 14:00", content: "用时7天，导师评分：95分" },
  { id: "4", user: "系统", action: "自动分配课程《BD入职培训体系》", time: "2026-03-18 09:00" },
];

const statusColor = (s: string) => {
  if (s === "学习中") return "primary";
  if (s === "已完成") return "success";
  return "default";
};

const TrainingLearning = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [scoreDialog, setScoreDialog] = useState(false);
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<LearningRecord | null>(null);

  const openDetail = (r: LearningRecord) => {
    setSelectedRecord(r);
    setDetailOpen(true);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      {!detailOpen ? (
        <>
          <PageHeader
            title="培训学习"
            description="查看学员学习进度与考核情况"
            actions={<Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />导出</Button>}
          />

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索用户 / 课程名称" className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[100px]"><SelectValue placeholder="角色" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="bd">BD</SelectItem>
                <SelectItem value="bdm">BDM</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]"><SelectValue placeholder="学习状态" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="not-started">未开始</SelectItem>
                <SelectItem value="in-progress">学习中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户名称</TableHead>
                  <TableHead>课程名称</TableHead>
                  <TableHead>课程类型</TableHead>
                  <TableHead>当前阶段</TableHead>
                  <TableHead>学习进度</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>超期</TableHead>
                  <TableHead>导师评分</TableHead>
                  <TableHead>证书</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.user}</TableCell>
                    <TableCell className="text-primary">{r.course}</TableCell>
                    <TableCell><StatusBadge status={r.type} type={r.type === "阶段课程" ? "primary" : "default"} /></TableCell>
                    <TableCell>{r.currentStage}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Progress value={r.progress} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-8">{r.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={r.status} type={statusColor(r.status) as any} /></TableCell>
                    <TableCell>
                      {r.overdue ? <StatusBadge status="超期" type="warning" /> : <span className="text-sm text-muted-foreground">正常</span>}
                    </TableCell>
                    <TableCell>
                      {r.mentorScore === "已评分" ? <StatusBadge status="已评分" type="success" /> :
                       r.mentorScore === "未评分" ? <StatusBadge status="未评分" type="warning" /> :
                       <span className="text-sm text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      {r.certificate === "已发放" ? (
                        <span className="inline-flex items-center gap-1 text-xs text-success font-medium">
                          <Award className="h-3.5 w-3.5" />已发放
                        </span>
                      ) : r.certificate === "未发放" ? (
                        <span className="text-xs text-muted-foreground">未发放</span>
                      ) : <span className="text-sm text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => openDetail(r)}>
                        查看详情
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
              <span>共 {records.length} 条记录</span>
              <span>第 1 / 1 页</span>
            </div>
          </div>
        </>
      ) : (
        /* Detail View */
        <>
          <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => setDetailOpen(false)}>
            <ArrowLeft className="h-4 w-4 mr-1" />返回列表
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-lg font-semibold text-foreground">
              {selectedRecord?.user} — {selectedRecord?.course}
            </h1>
            {selectedRecord && <StatusBadge status={selectedRecord.status} type={statusColor(selectedRecord.status) as any} />}
            {selectedRecord?.overdue && <StatusBadge status="超期" type="warning" />}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Course info & progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overall progress */}
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">学习进度</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Progress value={selectedRecord?.progress ?? 0} className="h-3 flex-1" />
                  <span className="text-lg font-bold text-primary">{selectedRecord?.progress}%</span>
                </div>

                {/* Stages */}
                <div className="space-y-3">
                  {detailStages.map((stage) => (
                    <div key={stage.name} className="flex items-center justify-between p-3 rounded-md bg-accent/30">
                      <div className="flex items-center gap-3">
                        <StatusBadge
                          status={stage.status === "done" ? "已完成" : stage.status === "current" ? "进行中" : "未开始"}
                          type={stage.status === "done" ? "success" : stage.status === "current" ? "primary" : "default"}
                        />
                        <div>
                          <p className="text-sm font-medium">{stage.name}</p>
                          <p className="text-xs text-muted-foreground">{stage.days}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {stage.score !== null && (
                          <span className="text-sm font-medium">{stage.score}分</span>
                        )}
                        {stage.status === "done" && (
                          <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setScoreDialog(true)}>
                            <Star className="h-3.5 w-3.5 mr-1" />评分
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate */}
              {selectedRecord?.certificate === "已发放" && (
                <div className="rounded-lg border border-success/30 bg-success/5 p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-success" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">电子证书已发放</p>
                      <p className="text-xs text-muted-foreground">评分通过后系统自动发放</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">查看证书</Button>
                    <Button size="sm">下载证书</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Timeline & exam */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">学习日志</h3>
                <ActivityTimeline activities={detailActivities} />
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">考试成绩</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">基础认知</span><span className="font-medium">95分</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">产品学习</span><span className="font-medium">88分</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">实战演练</span><span className="text-muted-foreground">未考试</span></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Score Dialog */}
      <Dialog open={scoreDialog} onOpenChange={setScoreDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>导师 / BDM 评分</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm">分数（1-100）</Label>
              <Input type="number" min={1} max={100} className="mt-1" placeholder="请输入分数" value={score} onChange={(e) => setScore(e.target.value)} />
            </div>
            <div>
              <Label className="text-sm">评价</Label>
              <Textarea className="mt-1" placeholder="请输入评价内容..." value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setScoreDialog(false); setScore(""); setComment(""); }}>取消</Button>
            <Button disabled={!score.trim()} onClick={() => { setScoreDialog(false); setScore(""); setComment(""); }}>提交评分</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingLearning;
