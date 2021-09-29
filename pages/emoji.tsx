import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React from "react";

export default function emoji() {
  return (
    <div>
      <Picker onSelect={(emoji) => alert(JSON.stringify(emoji))} />
    </div>
  );
}
