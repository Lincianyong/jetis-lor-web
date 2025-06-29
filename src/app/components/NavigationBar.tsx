import Image from "next/image"

export default function NavBar () {
    return (
        <div className="flex justify-between">
            <div>
                <Image 
                    src = "/JetisLor.png"
                    height = {200}
                    width = {200}
                    alt = "jetis lor"
                />
            </div>
        </div>
    )
}