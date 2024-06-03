import { useState, useEffect } from "react";
import Mail from "@/components/mail";
import { accounts, mails } from "@/data/mails";
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

// const setCookie = (name, value, days) => {
//   let expires = "";
//   if (days) {
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = `; expires=${date.toUTCString()}`;
//   }
//   document.cookie = `${name}=${value || ""}${expires}; path=/`;
// };

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
    <>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
