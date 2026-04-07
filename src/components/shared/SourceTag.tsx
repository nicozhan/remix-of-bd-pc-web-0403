import { Badge } from "@/components/ui/badge";

type Source = "kunlun" | "renrenqu";

const sourceConfig: Record<Source, { label: string; className: string }> = {
  kunlun: { label: "昆仑智服", className: "bg-primary/10 text-primary border-primary/20" },
  renrenqu: { label: "人人取", className: "bg-green-50 text-green-700 border-green-200" },
};

const SourceTag = ({ source }: { source: Source }) => {
  const config = sourceConfig[source];
  return (
    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 font-normal ml-1 ${config.className}`}>
      {config.label}
    </Badge>
  );
};

export default SourceTag;
