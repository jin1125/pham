import React from 'react'
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default function emoji() {
  return (
    <div>
      <Picker onSelect={emoji => alert(JSON.stringify(emoji))} />
    </div>
  )
}
