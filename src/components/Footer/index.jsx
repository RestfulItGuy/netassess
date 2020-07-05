import React from 'react'
import packageJson from '../../../package.json';

const { ipcRenderer } = window.require('electron');
let electron_message = '';

export default function Footer() {
  console.log()
  ipcRenderer.on("checking-for-update", (event, message) => {
    electron_message = message;
    console.log(message)
  })
  ipcRenderer.on("update-available", (event, message) => {
    electron_message = message;
    console.log(message)
  })
  ipcRenderer.on("update-not-available", (event, message) => {
    electron_message = message;
    console.log(message)
  })
  ipcRenderer.on("update-downloaded", (event, message) => {
    electron_message = message;
    console.log(message)
  })
  ipcRenderer.on("error", (event, message) => {
    electron_message = message;
    console.log(message)
  })
  return (
    <>
      <span className="footer">{packageJson.version} | {electron_message} | C 2020</span>
    </>
  )
}