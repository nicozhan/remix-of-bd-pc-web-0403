import { useState } from "react";
import {
  Plus, Search as SearchIcon, Info, Upload, Image, Video,
  Bold, Italic, List, AlignLeft, Eye, RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";

interface Announcement {
  id: string;
  title: string;
  status: "已发布" | "未发布" | "已下线";
  channels: string[];
  carousel: boolean;
  publishTime: string;
  creator: string;
}

const mockData: Announcement[] = [
  { id: "AN001", title: "关于点位拓展系统V2.5版本上线的通知", status: "已发布", channels: ["PC端", "小程序"], carousel: true, publishTime: "2026-04-03 10:00", creator: "管理员" },
  { id: "AN002", title: "四月拓展冲刺活动启动", status: "已发布", channels: ["PC端", "小程序"], carousel: true, publishTime: "2026-04-01 09:00", creator: "运营部" },
  { id: "AN003", title: "勘察报告模板更新通知", status: "已发布", channels: ["PC端"], carousel: false, publishTime: "2026-03-28 14:00", creator: "管理员" },
  { id: "AN004", title: "五一假期安排通知", status: "未发布", channels: ["PC端", "小程序"], carousel: false, publishTime: "—", creator: "人事部" },
  { id: "AN005", title: "2月份优秀BD表彰公告", status: "已下线", channels: ["PC端"], carousel: true, publishTime: "2026-03-05 10:00", creator: "运营部" },
  { id: "AN006", title: "系统维护通知（3月20日）", status: "已下线", channels: ["PC端", "小程序"], carousel: false, publishTime: "2026-03-18 16:00", creator: "技术部" },
];

const statusType = (s: string) => {
  if (s === "已发布") return "success" as const;
  if (s === "已下线") return "danger" as const;
  return "default" as const;
};

const AnnouncementManagement = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Announcement | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ action: string; item: Announcement } | null>(null);
  const [isCarousel, setIsCarousel] = useState(false);
  const [publishMode, setPublishMode] = useState("now");
  const [previewMode, setPreviewMode] = useState(false);

  const openCreate = () => {
    setEditItem(null);
    setIsCarousel(false);
    setPublishMode("now");
    setPreviewMode(false);
    setDialogOpen(true);
  };

  const openEdit = (item: Announcement) => {
    setEditItem(item);
    setIsCarousel(item.carousel);
    setPublishMode("now");
    setPreviewMode(false);
    setDialogOpen(true);
  };

  const openRepublish = (item: Announcement) => {
    setEditItem(item);
    setIsCarousel(item.carousel);
    setPublishMode("now");
    setPreviewMode(false);
    setDialogOpen(true);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader
        title="公告管理"
        description="创建和管理系统公告"
        actions={<Button size="sm" onClick={openCreate}><Plus className="h-4 w-4 mr-1" />新建公告</Button>}
      />

      {/* Tips */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex gap-3 mb-4">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">展示规则：</span>
          公告可在PC首页和小程序首页展示，最多展示3条（轮播），按排序权重优先展示。开启轮播后将在首页轮播区域自动切换展示。
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索公告标题" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[120px]"><SelectValue placeholder="状态" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="published">已发布</SelectItem>
            <SelectItem value="draft">未发布</SelectItem>
            <SelectItem value="offline">已下线</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>公告标题</TableHead>
              <TableHead>发布状态</TableHead>
              <TableHead>发布渠道</TableHead>
              <TableHead>轮播</TableHead>
              <TableHead>发布时间</TableHead>
              <TableHead>创建人</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                <TableCell><StatusBadge status={item.status} type={statusType(item.status)} /></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {item.channels.map((ch) => (
                      <StatusBadge key={ch} status={ch} type="default" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {item.carousel ? (
                    <span className="text-sm text-primary font-medium">是</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">否</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{item.publishTime}</TableCell>
                <TableCell>{item.creator}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => openEdit(item)}>编辑</Button>
                    {item.status === "未发布" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-success">发布</Button>
                    )}
                    {item.status === "已发布" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive"
                        onClick={() => setConfirmDialog({ action: "下线", item })}>下线</Button>
                    )}
                    {item.status === "已下线" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => openRepublish(item)}>
                        <RotateCcw className="h-3 w-3 mr-0.5" />重新发布
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
          <span>共 {mockData.length} 条记录</span>
          <span>第 1 / 1 页</span>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem ? (editItem.status === "已下线" ? "重新发布公告" : "编辑公告") : "新建公告"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {/* Basic info */}
            <div>
              <Label className="text-sm font-semibold">基础信息</Label>
              <div className="mt-3 space-y-3">
                <div>
                  <Label className="text-xs">公告标题</Label>
                  <Input className="mt-1" placeholder="请输入公告标题" defaultValue={editItem?.title ?? ""} />
                </div>
                <div>
                  <Label className="text-xs">发布渠道</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="ch-pc" defaultChecked />
                      <label htmlFor="ch-pc" className="text-sm">PC端首页</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="ch-mini" defaultChecked={editItem?.channels.includes("小程序")} />
                      <label htmlFor="ch-mini" className="text-sm">小程序首页</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content editor */}
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">内容编辑</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  {previewMode ? "编辑" : "预览"}
                </Button>
              </div>

              {!previewMode ? (
                <div className="mt-2 rounded-lg border border-border">
                  {/* Toolbar */}
                  <div className="flex items-center gap-1 border-b border-border px-2 py-1.5 flex-wrap">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Bold className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Italic className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><List className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><AlignLeft className="h-3.5 w-3.5" /></Button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                      <Image className="h-3.5 w-3.5" />图片
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                      <Video className="h-3.5 w-3.5" />视频
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                      <Upload className="h-3.5 w-3.5" />附件
                    </Button>
                  </div>
                  {/* Editor area */}
                  <Textarea
                    className="border-0 rounded-none min-h-[180px] resize-none focus-visible:ring-0"
                    placeholder="请输入公告内容，支持图文视频混排..."
                    defaultValue={editItem ? "新版本已上线，新增批量导入功能和智能派工模块，请各团队尽快熟悉新流程。" : ""}
                  />
                </div>
              ) : (
                <div className="mt-2 rounded-lg border border-border p-4 min-h-[180px] bg-accent/20">
                  <p className="text-sm text-foreground leading-relaxed">
                    {editItem?.title ?? "公告标题"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    新版本已上线，新增批量导入功能和智能派工模块，请各团队尽快熟悉新流程。
                  </p>
                  <div className="mt-3 aspect-video max-w-xs bg-muted rounded-lg flex items-center justify-center">
                    <Image className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>

            {/* Display config */}
            <div>
              <Label className="text-sm font-semibold">展示配置</Label>
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">开启轮播</p>
                    <p className="text-xs text-muted-foreground">开启后将在首页轮播区域展示</p>
                  </div>
                  <Switch checked={isCarousel} onCheckedChange={setIsCarousel} />
                </div>
                <div>
                  <Label className="text-xs">排序权重</Label>
                  <Input type="number" className="mt-1 w-32" placeholder="数值越大越靠前" defaultValue={10} />
                </div>
              </div>
            </div>

            {/* Publish time */}
            <div>
              <Label className="text-sm font-semibold">发布时间</Label>
              <Tabs value={publishMode} onValueChange={setPublishMode} className="mt-2">
                <TabsList>
                  <TabsTrigger value="now">立即发布</TabsTrigger>
                  <TabsTrigger value="scheduled">定时发布</TabsTrigger>
                </TabsList>
                <TabsContent value="scheduled" className="mt-2">
                  <Input type="datetime-local" className="w-64" />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>保存草稿</Button>
            <Button onClick={() => setDialogOpen(false)}>
              {editItem?.status === "已下线" ? "重新发布" : "发布公告"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog open={!!confirmDialog} onOpenChange={() => setConfirmDialog(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>确认{confirmDialog?.action}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            确定要{confirmDialog?.action}公告「{confirmDialog?.item.title}」吗？
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog(null)}>取消</Button>
            <Button variant="destructive" onClick={() => setConfirmDialog(null)}>确认{confirmDialog?.action}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementManagement;
