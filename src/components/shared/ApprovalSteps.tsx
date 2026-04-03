import { Check, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  name: string;
  status: "done" | "current" | "pending" | "rejected";
  person?: string;
  time?: string;
  remark?: string;
}

interface ApprovalStepsProps {
  steps: Step[];
}

const stepIcon = (status: Step["status"]) => {
  switch (status) {
    case "done":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground">
          <Check className="h-4 w-4" />
        </div>
      );
    case "current":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Clock className="h-4 w-4" />
        </div>
      );
    case "rejected":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
          <X className="h-4 w-4" />
        </div>
      );
    default:
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Clock className="h-4 w-4" />
        </div>
      );
  }
};

const ApprovalSteps = ({ steps }: ApprovalStepsProps) => (
  <div className="space-y-0">
    {steps.map((step, i) => (
      <div key={i} className="flex gap-3">
        <div className="flex flex-col items-center">
          {stepIcon(step.status)}
          {i < steps.length - 1 && (
            <div
              className={cn(
                "w-0.5 flex-1 min-h-[24px]",
                step.status === "done" ? "bg-success" : "bg-border"
              )}
            />
          )}
        </div>
        <div className="pb-6 pt-1">
          <p className="text-sm font-medium text-foreground">{step.name}</p>
          {step.person && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {step.person}
            </p>
          )}
          {step.time && (
            <p className="text-xs text-muted-foreground">{step.time}</p>
          )}
          {step.remark && (
            <p className="text-xs text-muted-foreground mt-1 bg-muted rounded px-2 py-1">
              {step.remark}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ApprovalSteps;
