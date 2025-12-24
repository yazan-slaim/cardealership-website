import React from "react";

const TextSplitter = ({ text, maxWidth }) => {
  const splitParagraphIntoLines = (paragraphText, maxWidth) => {
    const words = paragraphText.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine === "" ? word : `${currentLine} ${word}`;
      const testWidth = getTextWidth(testLine);

      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine !== "") {
      lines.push(currentLine);
    }

    return lines;
  };

  const getTextWidth = (text) => {
    // Create a temporary element to measure text width
    const element = document.createElement("span");
    element.style.whiteSpace = "nowrap"; // Ensure text doesn't wrap
    element.style.visibility = "hidden"; // Hide element from view
    element.textContent = text;

    // Add to the document to get accurate width measurement
    document.body.appendChild(element);
    const width = element.offsetWidth;
    document.body.removeChild(element);

    return width;
  };

  const lines = splitParagraphIntoLines(text, maxWidth);

  return (
    <div>
      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default TextSplitter;
