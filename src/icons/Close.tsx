export default function({size = 16, filled=true, fill, ...props}) {
    return (
        <svg height={size} width={size} version="1.1" viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg" {...props}>
            <polygon fill="currentColor" points="445.2,109.2 402.8,66.8 256,213.6 109.2,66.8 66.8,109.2 213.6,256 66.8,402.8 109.2,445.2 256,298.4 402.8,445.2   445.2,402.8 298.4,256 "/>
        </svg>
    )
}
