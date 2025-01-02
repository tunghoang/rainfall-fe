import {useEffect, useState, useMemo} from 'react'
export const ColorScale = ({colormap}) => {
    const [marks, setMarks] = useState([])
    const period = useMemo(() => ( Math.floor(marks.length / 10)), [marks])
    useEffect(() => {
        fetch(`/colormap?stretch_range=[0,15]&num_values=15&colormap=${colormap}`).then( response => response.json() ).then(data => {
            setMarks(data.colormap)
        })
    }, [colormap])
    return <div className='bg-white text-tiny'>
        <div className='flex gap-0 text-white'>
            {marks.map((m,idx) => (idx%period === 0?<div style={{
                    background: `rgb(${m.rgba[0]}, ${m.rgba[1]}, ${m.rgba[2]})`,
                    padding: '2px 12px'
                }}>{m.value.toFixed(2)}</div>:null))}
        </div>
    </div>
}
