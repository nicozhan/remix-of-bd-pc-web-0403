import { LucideIcon } from "lucide-react";

interface TodoCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  variant: "warning" | "primary";
  onClick?: () => void;
}

const variantStyles = {
  warning: {
    border: "border-l-warning",
    text: "text-warning",
    bg: "bg-warning/5",
    iconBg: "bg-warning/10",
  },
  primary: {
    border: "border-l-primary",
    text: "text-primary",
    bg: "bg-primary/5",
    iconBg: "bg-primary/10",
  },
};

const TodoCard = ({ title, count, icon: Icon, variant, onClick }: TodoCardProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-lg border border-border bg-card p-5 border-l-4 ${styles.border} transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${styles.iconBg}`}>
          <Icon className={`h-6 w-6 ${styles.text}`} />
        </div>
        <div>
          <p className={`text-3xl font-bold ${styles.text}`}>{count}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
