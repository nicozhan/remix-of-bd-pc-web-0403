import { useState } from "react";
import { Megaphone, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  type: "通知" | "系统更新" | "活动";
}

const typeColors: Record<string, string> = {
  通知: "bg-primary/10 text-primary border-0",
  系统更新: "bg-warning/10 text-warning border-0",
  活动: "bg-success/10 text-success border-0",
};

const announcements: Announcement[] = [
  {
    id: "1",
    title: "关于点位拓展系统V2.5版本上线的通知",
    summary: "新版本已上线，新增批量导入功能和智能派工模块，请各团队尽快熟悉新流程。",
    content: "新版本已上线，新增批量导入功能和智能派工模块，请各团队尽快熟悉新流程。如有问题请联系系统管理员。",
    date: "2026-04-03",
    type: "系统更新",
  },
  {
    id: "2",
    title: "四月拓展冲刺活动启动",
    summary: "本月拓展目标提升20%，完成目标的团队将获得额外绩效奖励，详情请查看活动规则。",
    content: "本月拓展目标提升20%，完成目标的团队将获得额外绩效奖励。活动时间：4月1日-4月30日。详情请查看活动规则。",
    date: "2026-04-01",
    type: "活动",
  },
  {
    id: "3",
    title: "勘察报告模板更新通知",
    summary: "勘察报告模板已更新，新增现场照片必填项和设备安装条件评估项，请使用最新模板。",
    content: "勘察报告模板已更新，新增现场照片必填项和设备安装条件评估项。旧模板将于4月15日停用，请尽快切换。",
    date: "2026-03-28",
    type: "通知",
  },
];

const AnnouncementSection = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Announcement | null>(null);

  const prev = () => setCurrent((c) => (c === 0 ? announcements.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === announcements.length - 1 ? 0 : c + 1));
  const item = announcements[current];

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold text-card-foreground">公告</h2>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={prev} className="rounded p-1 hover:bg-accent transition-colors"><ChevronLeft className="h-4 w-4 text-muted-foreground" /></button>
            <span className="text-xs text-muted-foreground px-1">{current + 1} / {announcements.length}</span>
            <button onClick={next} className="rounded p-1 hover:bg-accent transition-colors"><ChevronRight className="h-4 w-4 text-muted-foreground" /></button>
          </div>
        </div>

        <div
          onClick={() => setSelected(item)}
          className="cursor-pointer rounded-md p-4 hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <Badge className={typeColors[item.type]}>{item.type}</Badge>
            <span className="text-xs text-muted-foreground">{item.date}</span>
          </div>
          <h3 className="text-sm font-medium text-card-foreground mb-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
            <DialogDescription>
              <span className="text-xs text-muted-foreground">{selected?.date}</span>
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-foreground leading-relaxed">{selected?.content}</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnnouncementSection;
