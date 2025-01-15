import React from "react";
import BackGround from "~/components/BackGround";

export default function AuthLayout({children} : {children: React.ReactNode}) {
    return <>
    <BackGround />
    {children}
    </>
}