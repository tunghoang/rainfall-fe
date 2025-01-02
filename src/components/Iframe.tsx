import {useMemo} from 'react'
export const Iframe = () => {
    return <div dangerouslySetInnerHTML={{__html: `<iframe src='/workflow/' style='width: 100%; height: calc(100vh - 44px);'></iframe>`}}></div>
}
