import React from "react";

import ubuntu from "../assets/imgs/os/ubuntu.svg"
import windows from "../assets/imgs/os/windows.svg"
import fedora from "../assets/imgs/os/fedora.svg"
import freebsd from "../assets/imgs/os/freebsd.svg"
import rockylinux from "../assets/imgs/os/rockylinux.svg"
import debian from "../assets/imgs/os/debian.svg"
import archlinux from "../assets/imgs/os/archlinux.svg"
import centos from "../assets/imgs/os/centos.svg"
import flatcar from "../assets/imgs/os/flatcar.svg"
import opensuse from "../assets/imgs/os/opensuse.svg"
import openbsd from "../assets/imgs/os/openbsd.svg"
import alpinelinux from "../assets/imgs/os/alpinelinux.svg"


const osLogs ={
"ubuntu": ubuntu,
"windows":windows,
"fedora":fedora,
"freebsd":freebsd,
"rockylinux":rockylinux,
"almalinux":archlinux,
"debian":debian,
"archlinux":archlinux,
"centos":centos,
"flatcar":flatcar,
"opensuse":opensuse,
"openbsd":openbsd,
"alpinelinux":alpinelinux
}



function DepolyCard({ icon, family, fullName, checked,code,onCheck }) {

  const handleCheck = ()=>{
    onCheck(code)
  }
 
  return (
    <label className="relative bg-gray-800 rounded-lg p-4 cursor-pointer transition-shadow duration-200 hover:shadow-lg hover:shadow-purple-500 w-64"  onClick={handleCheck}> 
      <input
        name="plan"
        className="absolute right-4 top-4 w-5 h-5 cursor-pointer rounded-full appearance-none border-2 border-gray-800 checked:bg-purple-600 checked:border-purple-600 transition-all duration-200"
        type="radio"
        defaultChecked={checked}
      />
      {/* Container for the card content */}
      <div className="flex flex-col items-center justify-center border-2 border-gray-600 p-4 rounded-lg transition-all duration-200 text-center ">
        <img className="w-15 h-12 mb-4" src={osLogs[icon]} alt="os" />
        <span className="text-purple-600 font-bold text-xl mb-2 capitalize line-clamp-2">{family}</span> 
        <span className="text-gray-400 capitalize">{fullName}</span>
        
      </div>
    </label>
  );
}

export default DepolyCard;
