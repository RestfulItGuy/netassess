import React from 'react'
import packageJson from '../../../package.json';

export default function Footer() {
  return (
    <>
      <span className="footer">{packageJson.version}</span>
    </>
  )
}