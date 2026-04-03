import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  variant?: "default" | "danger" | "warning";
  trend?: { value: number; direction: "up" | "down" };
  onClick?: () => void;
}

const variantStyles = {
  default: { text: "text-card-foreground", iconBg: "bg-primary/10", iconColor: "text-primary" },
  danger: { text: "text-destructive", iconBg: "bg-destructive/10", iconColor: "text-destructive" },
  warning: { text: "text-warning", iconBg: "bg-warning/10", iconColor: "text-warning" },
};

const KpiCard = ({ title, value, unit, icon: Icon, variant = "default", trend, onClick }: KpiCardProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className={`text-[28px] font-bold leading-none ${styles.text}`}>{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          {trend && (
            <div className={`mt-2 flex items-center gap-1 text-xs ${trend.direction === "up" ? "text-success" : "text-destructive"}`}>
              {trend.direction === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{trend.direction === "up" ? "+" : ""}{trend.value}%</span>
              <span className="text-muted-foreground">环比</span>
            </div>
          )}
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.iconBg}`}>
          <Icon className={`h-5 w-5 ${styles.iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
