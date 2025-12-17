"use client"
import { deleteCookie, serverRedirect } from '@/libs/actions'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathName = usePathname()
  let path = pathName.split("/")[1]
  const router = useRouter()
  console.log(path)
  return (
    <div class="sidebar-panel">
    <div  onClick={()=>router.push("https://thecatsinn.net/")}  class="header-logo">
        <img src="/img/logo.png" alt=""/>
    </div>
    <div class="main-content-side">
        <a href="/cats/my-cats" onClick={()=>localStorage.removeItem("reservationId")}><span><img src="/img/mycat.png" alt=""/></span> <small className={path == "cats"?'active':""}>My
                Cat’s</small></a>
        <a href="/reservation" onClick={()=>localStorage.removeItem("reservationId")}><span><img src="/img/addcat.png" alt=""/></span><small className={path == "reservation"?'active':""}>Add My Reservation</small> </a>
        <a href="/history" onClick={()=>localStorage.removeItem("reservationId")}>
            <span><img src="/img/history.png" alt=""/><small className={path == "history"?'active':""}> Reservation
                    History</small> </span> </a>
        <a href="/profile"><span><img src="/img/profile.png" alt=""/></span><small  className={path == "profile"?'active':""}>Profile</small> </a>
        <a className=''  onClick={()=>{deleteCookie("token") ; serverRedirect()}}><span><img src="/img/logout.png" alt=""/></span><small>Logout</small> </a>
    </div>
    <div class="bottom-asset">
        <img src="/img/housecat.png" alt=""/>
    </div>
</div>

  )
}

export default Sidebar