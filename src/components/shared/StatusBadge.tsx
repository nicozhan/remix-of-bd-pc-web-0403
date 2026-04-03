import { cn } from "@/lib/utils";

type StatusType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface StatusBadgeProps {
  status: string;
  type?: StatusType;
  className?: string;
}

const typeStyles: Record<StatusType, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-destructive/10 text-destructive",
  info: "bg-primary/10 text-primary",
};

// Auto-detect type from common status strings
const autoType = (status: string): StatusType => {
  if (["已签约", "已通过", "正常", "已提交", "已完成"].includes(status)) return "success";
  if (["审批中", "待审核", "跟进中", "勘察中", "签约中"].includes(status)) return "primary";
  if (["待处理", "待签约", "待激活", "即将转公海"].includes(status)) return "warning";
  if (["已驳回", "异常", "失败"].includes(status)) return "danger";
  return "default";
};

const StatusBadge = ({ status, type, className }: StatusBadgeProps) => {
  const resolvedType = type || autoType(status);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        typeStyles[resolvedType],
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
