import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function VerifiedBadge({ size = "md", showLabel = false, className }: VerifiedBadgeProps) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const badge = (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="relative">
        <BadgeCheck className={cn(sizeClasses[size], "text-accent fill-accent/20")} />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-accent">Verified</span>
      )}
    </div>
  );

  if (showLabel) {
    return badge;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {badge}
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">Verified Lister - Identity & documents confirmed</p>
      </TooltipContent>
    </Tooltip>
  );
}
