import React from "react";
import * as LucideIcons from "lucide-react";

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  onClick,
  style = {},
}) => {
  // Get the icon component from lucide-react
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    />
  );
};

export default Icon;
