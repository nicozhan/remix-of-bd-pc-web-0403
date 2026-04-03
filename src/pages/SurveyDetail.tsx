import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ApprovalSteps from "@/components/shared/ApprovalSteps";

const surveyInfo = {
  opportunity: "星巴克-国贸店设备入驻",
  customer: "星巴克（中国）",
  applicant: "李明",
  address: "北京市朝阳区建国路88号 国贸商城B1",
  area: "120㎡",
  devices: 2,
  power: "有220V插座",
  network: "店内Wi-Fi覆盖",
  note: "门店靠近电梯口，人流量大，适合放置充电宝和售货机。",
};

const approvalSteps = [
  { name: "BD提交申请", status: "done" as const, person: "李明", time: "2026-04-02 10:30" },
  { name: "区域经理审核", status: "current" as const, person: "王总监" },
  { name: "运营总监审核", status: "pending" as const, person: "张总" },
  { name: "审批完成", status: "pending" as const },
];

const SurveyDetail = () => {
  const navigate = useNavigate();
  const [approveDialog, setApproveDialog] = useState<"approve" | "reject" | "concession" | null>(null);
  const [remark, setRemark] = useState("");

  const dialogConfig = {
    approve: { title: "符合画像 — 通过", required: false, action: "确认通过", color: "bg-success text-success-foreground hover:bg-success/90" },
    reject: { title: "不符合画像 — 驳回", required: true, action: "确认驳回", color: "bg-destructive text-destructive-foreground hover:bg-destructive/90" },
    concession: { title: "不符合但让步通过", required: true, action: "确认让步通过", color: "bg-warning text-warning-foreground hover:bg-warning/90" },
  };

  const current = approveDialog ? dialogConfig[approveDialog] : null;

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate("/surveys")}>
        <ArrowLeft className="h-4 w-4 mr-1" />返回列表
      </Button>

      <h1 className="text-lg font-semibold text-foreground mb-6">勘察审批 — {surveyInfo.opportunity}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Survey info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">勘察信息</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div><span className="text-muted-foreground">商机名称</span><p className="mt-0.5 font-medium">{surveyInfo.opportunity}</p></div>
              <div><span className="text-muted-foreground">客户名称</span><p className="mt-0.5 font-medium">{surveyInfo.customer}</p></div>
              <div><span className="text-muted-foreground">申请人</span><p className="mt-0.5 font-medium">{surveyInfo.applicant}</p></div>
              <div><span className="text-muted-foreground">勘察地址</span><p className="mt-0.5 font-medium">{surveyInfo.address}</p></div>
              <div><span className="text-muted-foreground">场地面积</span><p className="mt-0.5 font-medium">{surveyInfo.area}</p></div>
              <div><span className="text-muted-foreground">建议设备数</span><p className="mt-0.5 font-medium">{surveyInfo.devices} 台</p></div>
              <div><span className="text-muted-foreground">电源条件</span><p className="mt-0.5 font-medium">{surveyInfo.power}</p></div>
              <div><span className="text-muted-foreground">网络条件</span><p className="mt-0.5 font-medium">{surveyInfo.network}</p></div>
            </div>
            <div className="mt-4 text-sm">
              <span className="text-muted-foreground">备注</span>
              <p className="mt-0.5">{surveyInfo.note}</p>
            </div>
          </div>

          {/* Attachments */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">现场照片 / 附件</h3>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Paperclip className="h-4 w-4" />
              <span>勘察报告_国贸店.pdf</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button className="bg-success text-success-foreground hover:bg-success/90" onClick={() => setApproveDialog("approve")}>
              符合画像（通过）
            </Button>
            <Button variant="destructive" onClick={() => setApproveDialog("reject")}>
              不符合画像（驳回）
            </Button>
            <Button className="bg-warning text-warning-foreground hover:bg-warning/90" onClick={() => setApproveDialog("concession")}>
              不符合但让步通过
            </Button>
          </div>
        </div>

        {/* Right: Approval flow */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">审批流程</h3>
            <ApprovalSteps steps={approvalSteps} />
          </div>
        </div>
      </div>

      {/* Approval Dialog */}
      <Dialog open={!!approveDialog} onOpenChange={() => { setApproveDialog(null); setRemark(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{current?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">
                {current?.required ? "原因说明（必填）" : "补充说明（选填）"}
              </label>
              <Textarea className="mt-1" placeholder="请输入说明..." value={remark} onChange={(e) => setRemark(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setApproveDialog(null); setRemark(""); }}>取消</Button>
            <Button className={current?.color} disabled={current?.required && !remark.trim()}>
              {current?.action}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurveyDetail;
