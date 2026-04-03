import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ApprovalSteps from "@/components/shared/ApprovalSteps";

const contractInfo = {
  opportunity: "全家-浦东新区5店",
  customer: "全家便利店",
  bd: "李明",
  strategy: "分账模式：平台70% / 商户30%",
  duration: "2年",
  devices: 5,
  points: "浦东新区5家门店",
  deposit: "¥5,000 / 店",
};

const approvalSteps = [
  { name: "BD提交签约", status: "done" as const, person: "李明", time: "2026-03-29 11:00" },
  { name: "区域经理审核", status: "done" as const, person: "王总监", time: "2026-03-30 09:00", remark: "分账比例合理，同意" },
  { name: "法务审核", status: "current" as const, person: "陈律师" },
  { name: "运营总监终审", status: "pending" as const, person: "张总" },
  { name: "合同签订", status: "pending" as const },
];

const ContractDetail = () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<"approve" | "reject" | null>(null);
  const [remark, setRemark] = useState("");

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-6">
      <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" onClick={() => navigate("/contracts")}>
        <ArrowLeft className="h-4 w-4 mr-1" />返回列表
      </Button>

      <h1 className="text-lg font-semibold text-foreground mb-6">签约审批 — {contractInfo.opportunity}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Contract info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">签约信息</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div><span className="text-muted-foreground">商机名称</span><p className="mt-0.5 font-medium">{contractInfo.opportunity}</p></div>
              <div><span className="text-muted-foreground">客户名称</span><p className="mt-0.5 font-medium">{contractInfo.customer}</p></div>
              <div><span className="text-muted-foreground">BD</span><p className="mt-0.5 font-medium">{contractInfo.bd}</p></div>
              <div><span className="text-muted-foreground">合作策略</span><p className="mt-0.5 font-medium">{contractInfo.strategy}</p></div>
              <div><span className="text-muted-foreground">合同期限</span><p className="mt-0.5 font-medium">{contractInfo.duration}</p></div>
              <div><span className="text-muted-foreground">设备数量</span><p className="mt-0.5 font-medium">{contractInfo.devices} 台</p></div>
              <div><span className="text-muted-foreground">点位信息</span><p className="mt-0.5 font-medium">{contractInfo.points}</p></div>
              <div><span className="text-muted-foreground">保证金</span><p className="mt-0.5 font-medium">{contractInfo.deposit}</p></div>
            </div>
          </div>

          {/* Contract upload */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">合同文件</h3>
            <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center gap-2 text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">点击或拖拽上传合同文件</p>
              <p className="text-xs text-muted-foreground">支持 PDF、Word 格式</p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>合同_全家浦东5店_v1.pdf</span>
              <span className="text-xs text-success ml-2">已上传</span>
            </div>
          </div>

          {/* Dispatch rule tip */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">派单规则提示</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• 签约率 &lt; 80%：客户签约完成后推送人人取</li>
                <li>• 签约率 ≥ 80%：内部审核完成后推送人人取</li>
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button className="bg-success text-success-foreground hover:bg-success/90" onClick={() => setDialog("approve")}>
              审核通过
            </Button>
            <Button variant="destructive" onClick={() => setDialog("reject")}>
              驳回
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

      {/* Dialog */}
      <Dialog open={!!dialog} onOpenChange={() => { setDialog(null); setRemark(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialog === "approve" ? "确认通过" : "确认驳回"}</DialogTitle>
          </DialogHeader>
          <div>
            <label className="text-sm font-medium">{dialog === "reject" ? "驳回原因（必填）" : "审批意见（选填）"}</label>
            <Textarea className="mt-1" placeholder="请输入..." value={remark} onChange={(e) => setRemark(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialog(null); setRemark(""); }}>取消</Button>
            <Button
              className={dialog === "approve" ? "bg-success text-success-foreground hover:bg-success/90" : ""}
              variant={dialog === "reject" ? "destructive" : "default"}
              disabled={dialog === "reject" && !remark.trim()}
            >
              确认
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContractDetail;
