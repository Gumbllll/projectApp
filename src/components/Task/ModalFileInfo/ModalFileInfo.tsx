import { FC, useEffect, useRef, useState } from "react";
import { storage } from "../../../Firebase/firebase";
import { StorageReference, deleteObject, listAll, ref, uploadBytes } from "firebase/storage";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from './ModalFileInfo.module.scss'
import { FileItem } from "./FileItem/FileItem";

interface IModalFileInfo {
  id: string,
  openInfo: (item: any) => void
}

export const ModalFileInfo: FC<IModalFileInfo> = ({ id, openInfo }) => {
  const [ uploadFiles, setUploadFiles ] = useState<any>(null);
  const [ filesList, setFilesList ] = useState<StorageReference[]>([]);

  const refFile = useRef<any>(null);

  const listRef = ref(storage, `${id}`);

  const upload = async () => {
    for(let i = 0; i < uploadFiles.length; i++) {
      let file = uploadFiles[i];
      const filesRef = ref(storage, `${id}/${file.name}`)
      await uploadBytes(filesRef, file)
    }

    listAll(listRef).then((res) => {
      setFilesList(res.items)
    })

    alert('Файлы загружены')
    refFile.current.value = null;
    setUploadFiles(null)
  }

  
  const deleteFile = async (path: any) => {
    await deleteObject(path)

    listAll(listRef).then((res) => {
      setFilesList(res.items)
    })
  }

  useEffect(() => {
    listAll(listRef).then((res) => {
      setFilesList(res.items)
    })
  }, [])

  return (
    <div className={styles.Main}>
      <div className={styles.MainOverlay}></div>
      <div className={styles.MainWrapper}>
        <AiOutlineCloseCircle className={styles.MainWrapperClose} onClick={() => openInfo(false)}/>
        <h1 className={styles.MainWrapperTitle}>
          Файлы
        </h1>
        <div className={styles.MainWrapperUpload}>
          <input multiple ref={refFile} type="file"  onChange={e => setUploadFiles(e.target.files)}/>
          <button disabled={uploadFiles === null} className={styles.MainWrapperUploadAdd} onClick={upload}>Загрузить</button>
        </div>
        <div className={styles.MainWrapperInfo}>
          <div className={styles.MainWrapperInfoFeature}>
            <div>Название</div>
            <div>Тип файла</div>
            <div>Размер</div>
          </div>
          <div>
            {filesList.map(item => (
                <FileItem deleteFile={deleteFile} key={item.name} name={item.name} idTask={id}/>
              ))}
          </div>
          <div className={styles.MainWrapperInfoList}>
          </div>
        </div>
      </div>
    </div>
  );
};

