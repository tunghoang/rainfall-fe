export default function({size = 16, filled=true, fill, ...props}) {
    return (
        <svg height={size} width={size} version="1.1" viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg" {...props}>
            <g>
                <path d="M31,0H17c-0.552,0-1,0.448-1,1s0.448,1,1,1h13v28H17c-0.552,0-1,0.448-1,1s0.448,1,1,1h14   c0.552,0,1-0.448,1-1V1C32,0.448,31.552,0,31,0z" fill={filled ? fill : "none"}/>
                <path d="M16.393,22.3c-0.391,0.395-0.391,1.034,0,1.428c0.391,0.395,1.024,0.395,1.414,0l6.899-6.999   c0.385-0.389,0.389-1.04,0-1.429l-6.9-6.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l5.2,5.275H1   c-0.552,0-1,0.452-1,1.01c0,0.558,0.448,1.01,1,1.01h20.593L16.393,22.3z" fill={filled ? fill : "none"}/>
            </g>
        </svg>
    )
}
