export default function({size = 16, filled=true, fill, ...props}) {
    return (
        <svg height={size} width={size} version="1.1" viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg" {...props}>
            <polygon fill="currentColor" points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288 "/>
        </svg>
    )
}
