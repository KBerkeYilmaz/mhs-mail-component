import { useState, useEffect } from "react";
import Mail from "@/components/mail";
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export default function Home() {
  const [defaultLayout, setDefaultLayout] = useState(undefined);
  const [defaultCollapsed, setDefaultCollapsed] = useState(undefined);

  useEffect(() => {
    const layout = getCookie("react-resizable-panels:layout");
    const collapsed = getCookie("react-resizable-panels:collapsed");

    setDefaultLayout(layout ? JSON.parse(layout) : undefined);
    setDefaultCollapsed(collapsed ? JSON.parse(collapsed) : undefined);
  }, []);

  return (
    <div className="overflow-hidden max-h-screen h-full">
      <nav className="h-14 bg-white flex justify-center items-center">
        <h1>teleloy productions</h1>
      </nav>
      <div className="hidden flex-col md:flex ">
        <Mail
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </div>
  );
}
