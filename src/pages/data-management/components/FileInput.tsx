import {useState} from 'react'
import { Input } from '@nextui-org/react';

export const FileInput = ({label, onChange}) => {
    return <Input variant='faded' label={label} accept="image/tiff" type='file' onChange={onChange} />
}
export default FileInput
