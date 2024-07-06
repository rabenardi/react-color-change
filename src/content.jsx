import React, { useEffect, useRef, useState } from "react";
import "./css/content.css";

function Content() {
  const [bgColor, setBgColor] = useState("white");
  const divCheck = useRef();
  const canvasCheck = useRef();

  function getFormalColorName(color) {
    let ctx = canvasCheck.current;
    if (!ctx) return "#ffffff";

    ctx = ctx.getContext("2d");
    ctx.fillStyle = color;

    return color != "black" && ctx.fillStyle == "#000000"
      ? color
      : ctx.fillStyle;
  }

  function isColorNormal(color) {
    const e = divCheck.current;
    if (!e) return true;

    e.style.borderColor = "";
    e.style.borderColor = color;
    return !!e.style.borderColor.length;
  }

  function isFormalSame(color) {
    const normalizedColor = getFormalColorName(color).replace(/\s/g, "");
    return (
      normalizedColor == color.toLowerCase() ||
      normalizedColor == (color + ")").toLowerCase()
    );
  }

  function isDark(color) {
    if (!isColorNormal(color)) return false;

    const normalizedColor = getFormalColorName(color).substring(1);
    const rgb = parseInt(normalizedColor, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma < 40;
  }
  console.log(isFormalSame(bgColor), isColorNormal(bgColor));
  return (
    <div className="content">
      <div ref={divCheck} style={{ width: 0, height: 0 }}></div>
      <canvas ref={canvasCheck} style={{ width: 0, height: 0 }}></canvas>
      <div
        className="output-box"
        style={{
          backgroundColor: isColorNormal(bgColor) ? bgColor : "white",
          color: isDark(bgColor) ? "white" : "black",
        }}
      >
        <p id="output-text">
          {CSS.supports("color", bgColor) ? bgColor : "..."}
        </p>

        {isFormalSame(bgColor) ? null : isColorNormal(bgColor) ? (
          <p>{getFormalColorName(bgColor)}</p>
        ) : null}
      </div>
      <input
        required
        type="text"
        placeholder="Any colors..."
        onChange={(e) => {
          setBgColor(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default Content;
