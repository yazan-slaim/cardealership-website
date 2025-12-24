'use client'
import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
const PageContainer= styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    background: white;


    
`
const RAIN=styled (Link)`
    color: #bcd22d;
      font-family: "TrajanPro-Regular";
`
function page() {
  return (
    <PageContainer><RAIN href={"https://www.venusplc.com/water"}>Venus rain</RAIN></PageContainer>
  )
}

export default page