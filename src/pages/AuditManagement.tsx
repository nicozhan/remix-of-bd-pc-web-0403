import { useState } from "react";
import { Search as SearchIcon, MapPin, Image, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeader from "@/components/shared/PageHeader";

interface AuditItem {
  id: string;
  bd: string;
  opportunity: string;
  visitTime: string;
  abnormal: boolean;
  auditStatus: "待抽检" | "已确认真实" | "虚假打卡";
}

const audits: AuditItem[] = [
  { id: "A001", bd: "周伟", opportunity: "海底捞-朝阳大悦城店", visitTime: "2026-04-01 16:00", abnormal: true, auditStatus: "待抽检" },
  { id: "A002", bd: "赵静", opportunity: "万达-杭州西溪店", visitTime: "2026-03-31 14:30", abnormal: true, auditStatus: "待抽检" },
  { id: "A003", bd: "李明", opportunity: "星巴克-国贸店", visitTime: "2026-04-02 14:00", abnormal: false, auditStatus: "已确认真实" },
  { id: "A004", bd: "周伟", opportunity: "瑞幸-中关村店", visitTime: "2026-03-28 10:00", abnormal: true, auditStatus: "虚假打卡" },
  { id: "A005", bd: "李明", opportunity: "全家-浦东新区", visitTime: "2026-04-01 09:00", abnormal: false, auditStatus: "待抽检" },
];

const AuditManagement = () => {
  const [detailItem, setDetailItem] = useState<AuditItem | null>(null);
  const [fakeDialog, setFakeDialog] = useState(false);
  const [fakeReason, setFakeReason] = useState("");

  const openDetail = (item: AuditItem) => setDetailItem(item);

  const handleMarkFake = () => {
    setFakeDialog(true);
  };

  const confirmFake = () => {
    if (fakeReason.trim()) {
      setFakeDialog(false);
      setFakeReason("");
      setDetailItem(null);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <PageHeader title="抽检管理" description="对拜访记录进行真实性抽检" />

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索BD / 商机名称" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[120px]"><SelectValue placeholder="抽检状态" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="pending">待抽检</SelectItem>
            <SelectItem value="real">已确认真实</SelectItem>
            <SelectItem value="fake">虚假打卡</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>BD名称</TableHead>
              <TableHead>商机名称</TableHead>
              <TableHead>拜访时间</TableHead>
              <TableHead>是否异常</TableHead>
              <TableHead>抽检状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audits.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.bd}</TableCell>
                <TableCell>{a.opportunity}</TableCell>
                <TableCell className="text-muted-foreground">{a.visitTime}</TableCell>
                <TableCell>
                  {a.abnormal ? <StatusBadge status="异常" type="danger" /> : <StatusBadge status="正常" type="default" />}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={a.auditStatus}
                    type={a.auditStatus === "已确认真实" ? "success" : a.auditStatus === "虚假打卡" ? "danger" : "warning"}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => openDetail(a)}>
                    查看详情
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
          <span>共 {audits.length} 条记录</span>
          <span>第 1 / 1 页</span>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!detailItem && !fakeDialog} onOpenChange={() => setDetailItem(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>抽检详情</DialogTitle>
          </DialogHeader>
          {detailItem && (
            <div className="space-y-4">
              {/* Visit info */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <div><span className="text-muted-foreground">BD</span><p className="mt-0.5 font-medium">{detailItem.bd}</p></div>
                <div><span className="text-muted-foreground">商机</span><p className="mt-0.5 font-medium">{detailItem.opportunity}</p></div>
                <div><span className="text-muted-foreground">拜访时间</span><p className="mt-0.5 font-medium">{detailItem.visitTime}</p></div>
                <div><span className="text-muted-foreground">是否异常</span><p className="mt-0.5 font-medium">{detailItem.abnormal ? "是" : "否"}</p></div>
              </div>

              {/* Location placeholder */}
              <div>
                <p className="text-sm font-medium mb-2">打卡位置</p>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground ml-2">地图位置展示区域</span>
                </div>
              </div>

              {/* Photos placeholder */}
              <div>
                <p className="text-sm font-medium mb-2">拜访照片</p>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Image className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            {detailItem?.auditStatus === "待抽检" && (
              <>
                <Button className="bg-success text-success-foreground hover:bg-success/90" onClick={() => setDetailItem(null)}>
                  标记为真实
                </Button>
                <Button variant="destructive" onClick={handleMarkFake}>
                  <AlertTriangle className="h-4 w-4 mr-1" />标记为虚假打卡
                </Button>
              </>
            )}
            {detailItem?.auditStatus !== "待抽检" && (
              <Button variant="outline" onClick={() => setDetailItem(null)}>关闭</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fake check confirmation dialog */}
      <Dialog open={fakeDialog} onOpenChange={() => { setFakeDialog(false); setFakeReason(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />确认标记为虚假打卡
            </DialogTitle>
          </DialogHeader>
          <div>
            <label className="text-sm font-medium">原因说明（必填）</label>
            <Textarea
              className="mt-1"
              placeholder="请说明判定为虚假打卡的原因..."
              value={fakeReason}
              onChange={(e) => setFakeReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setFakeDialog(false); setFakeReason(""); }}>取消</Button>
            <Button variant="destructive" disabled={!fakeReason.trim()} onClick={confirmFake}>
              确认标记
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditManagement;
