import { MessageSquare } from "lucide-react";

interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  content?: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => (
  <div className="space-y-0">
    {activities.map((act, i) => (
      <div key={act.id} className="flex gap-3">
        <div className="flex flex-col items-center">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
            <MessageSquare className="h-3.5 w-3.5 text-primary" />
          </div>
          {i < activities.length - 1 && (
            <div className="w-0.5 flex-1 min-h-[16px] bg-border" />
          )}
        </div>
        <div className="pb-5 pt-0.5">
          <p className="text-sm text-foreground">
            <span className="font-medium">{act.user}</span>{" "}
            <span className="text-muted-foreground">{act.action}</span>
          </p>
          <p className="text-xs text-muted-foreground">{act.time}</p>
          {act.content && (
            <p className="text-sm text-muted-foreground mt-1 bg-muted rounded px-2 py-1">
              {act.content}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ActivityTimeline;
