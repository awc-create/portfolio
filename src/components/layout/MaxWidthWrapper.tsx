import React from "react";

const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
