import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
};

export default Loading;
