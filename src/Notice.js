import classnames from "https://cdn.skypack.dev/classnames";
import React, { useState } from "react";

function NotifyOnce({ children }) {
  const [visible, setVisible] = useState(false);
  const [workDone, setWorkDone] = useState(false);

  if (workDone == false) {
    setTimeout(function () {
      setVisible(true);
    }, 2000);

    setTimeout(function () {
      setVisible(false);
    }, 3000);
    setWorkDone(true);
  }
  return (
    <>
      <div
        className={classnames(
          "fixed transition-all right-[10px]",
          {
            "top-[-60px]": !visible,
          },
          { "top-[10px]": visible }
        )}
      >
        {children}
      </div>
    </>
  );
}

function Alert({ color: color_, children }) {
  const color = color_ ?? "red";
  return (
    <div className="alert alert-info shadow-lg">
      <div className={`text-[${color}]`}>
        <span>
          <i class="fa-solid fa-circle-info"></i>
        </span>
        <span>{children}</span>
      </div>
    </div>
  );
}

function Notice() {
  return (
    <>
      <NotifyOnce>
        <Alert>"안녕" 반가워</Alert>
      </NotifyOnce>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
        recusandae debitis a sequi laudantium soluta culpa, voluptas molestias
        eius adipisci nam repellat eveniet rem iure ullam architecto vitae ex
        consequuntur.
      </div>
    </>
  );
}

export default Notice;
