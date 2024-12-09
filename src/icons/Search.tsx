export default function({size = 16, filled=true, fill, color, ...props}) {
    return (
        <svg height={size} width={size} version="1.1" viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="21" cy="20" fill={filled ? fill: "none"} r="18" stroke={color || "#000000"} stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/>
            <line fill="none" stroke={color || "#000000"} stroke-miterlimit="10" stroke-width="6" x1="34.229" x2="45.5" y1="34.229" y2="45.5"/>
        </svg>
    )
}
