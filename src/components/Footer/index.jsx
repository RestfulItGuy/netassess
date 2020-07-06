import React from 'react'
import packageJson from '../../../package.json';

const { ipcRenderer } = window.require('electron');
let electron_message = '';
let update_message = '';

export default function Footer() {
  console.log()
  ipcRenderer.on("checking-for-update", (event, message) => {
    electron_message = message;
    update_message = "checking-for-update";
    console.log(message)
  })
  ipcRenderer.on("update-available", (event, message) => {
    electron_message = message;
    update_message = "update-available";
    console.log(message)
  })
  ipcRenderer.on("update-not-available", (event, message) => {
    electron_message = message;
    update_message = "update-not-available";
    console.log(message)
  })
  ipcRenderer.on("update-downloaded", (event, message) => {
    electron_message = message;
    update_message = "update-downloaded";
    console.log(message)
  })
  ipcRenderer.on("error", (event, message) => {
    electron_message = message;
    update_message = "error";
    console.log(message)
  })
  return (
    <>
      <span className="footer">{packageJson.version} |{update_message}| {electron_message} | C 2020</span>
    </>
  )
}