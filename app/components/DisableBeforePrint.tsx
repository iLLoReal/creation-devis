import { useEffect } from "react"

export const DisableBeforePrint = ({children}: {children: React.ReactElement}) => {
    return (
        <div>
            {children}
        </div>
    )
}