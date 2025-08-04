import React, { Suspense } from "react";
import BrowsePageContent from "./BrowsePageContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowsePageContent />
    </Suspense>
  );
}

//React Suspense для ленивой (отложенной) загрузки компонента BrowsePageContent