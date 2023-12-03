import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai'
import styles from './FileItem.module.scss'
import { FC, useEffect, useState } from 'react'
import { getDownloadURL, getMetadata, ref } from 'firebase/storage'
import { storage } from '../../../../Firebase/firebase'
import { sizeConverter } from '../../../../utils/sizeConverter'

interface IFileItem {
    name: string,
    idTask: string,
    deleteFile: (item: any) => void,
}

export const FileItem: FC<IFileItem> = ({ name, idTask, deleteFile }) => {
    const [ type, setType ] = useState('');
    const [ size, setSize ] = useState(0);

    const fileRef = ref(storage, `${idTask}/${name}`)

    useEffect(() => {
        getMetadata(fileRef).then((meta) => {  
            setType(meta.contentType!);
            setSize(meta.size!);
        })
    }, [])

    const download = () => {
        getDownloadURL(ref(storage, `${idTask}/${name}`))
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = () => {
                const blob = xhr.response;
                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", name);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            xhr.send();
        })
    }

    return(
        <div className={styles.Main}>
            <div className={styles.MainWrapper}>
                <div>{name}</div>
                <div>{type}</div>
                <div>{sizeConverter(size)}</div>
                <div className={styles.MainWrapperOptions}>
                    <AiOutlineDownload onClick={download} cursor='pointer'/>
                    <AiFillDelete onClick={() => deleteFile(fileRef)} cursor='pointer' className={styles.MainWrapperDelete}/>
                </div>
            </div>
        </div>
    )
}