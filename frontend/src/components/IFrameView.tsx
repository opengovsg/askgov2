import React, { FC, useState } from 'react'

interface TermsViewProps {
  src: string
}

export const IFrameView: FC<TermsViewProps> = (props: TermsViewProps) => {
  return (
    <div
      // margin: vertical | horizontal
      style={{ textAlign: 'center', margin: '30px 0' }}
    >
      <iframe style={{ width: 850, height: 600 }} src={props.src}></iframe>
    </div>
  )
}
