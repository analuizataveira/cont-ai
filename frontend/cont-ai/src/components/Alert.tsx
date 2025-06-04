/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import ReactDOM from "react-dom";
import { motion } from "framer-motion"
import { useEffect } from "react";

interface AlertProps {
    children: React.ReactNode
    onClick: Function
    onTimeouted?: Function
    timeout?: number
    alertType: "alert-error" | "alert-info" | "alert-success" | "alert-warning"
}


export default function Alert(props: AlertProps) {
    useEffect(()=>{
        if(props.timeout){
            setTimeout(()=>{
                if(props.onTimeouted){
                    props.onTimeouted()
                }
            }, props.timeout)
        }
    })
    return ReactDOM.createPortal(
        <motion.div
            initial={{ opacity: 0, y: 0 }} 
            animate={{ opacity: 1, y: 0 }}  
            exit={{ opacity: 0, y: 0 }}    
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="fixed top-4 right-4 z-[9999]"
        >
            <div onClick={() => props.onClick()} role="alert" className={`alert ${props.alertType} relative top-4 right-4 z-[9999] w-auto opacity-90 hover:opacity-100 cursor-pointer`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <pre>{props.children}</pre>
            </div>
        </motion.div>
        ,
        document.body
    )
}