import React, { useState } from 'react'
import { IAttachment, ITask } from '../../../interfaces/tasks'
import { useAppDispatch } from '../../../hooks/store.hook'
import { IconButton, Tooltip, Grid } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Label from '../../layouts/Label';
import { uploadAttachment } from '../../../store/thunk-actions/task-actions';
import TaskAttachmentCard from './TaskAttachmentCard';
import { deleteAttachment } from '../../../utilities/api';
import SnackError from '../../common/SnackError';
import FullPageLoading from '../../common/loading/FullPageLoading';
import { apiErrorFormat } from '../../../utilities/error-format';

type props = {
    task: ITask,
    attachments: IAttachment[]
}


const TaskAttachment: React.FC<props> = ({ task, attachments }) => {
    const [files, setFiles] = useState(attachments);

    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState([]);

    const dispatch = useAppDispatch();

    const onChange = (e: any) => {
        console.log("files", e.target.files)
        dispatch(uploadAttachment({
            taskId: task.id,
            file: e.target.files
        })).unwrap()
            .then((data) => setFiles(s => [...s, ...data.attachments]))
    }

    const deleteFile = async (id: number) => {
        try {
            setLoading(true);
            await deleteAttachment(id)

            const newFiles = files.filter((file: IAttachment) => file.id !== id)

            setFiles(newFiles);
        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mb-4'>
            <SnackError errors={errors} />
            <FullPageLoading loading={loading} />

            <div className='w-4/12 flex items-center'>
                <Label text="Attachment" />
                <Tooltip
                    title="Attache"
                >
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" multiple onChange={onChange} />
                        <AttachFileIcon sx={{
                            width: "20px"
                        }} />
                    </IconButton>
                </Tooltip>
            </div>
            {files.length > 0 && <Grid
                wrap='wrap'
                justifyContent="flex-start"
                container
                mx="-5px"
            >
                {
                    files.map((file: IAttachment) => (
                        <Grid item xs={6} md={3} key={file.id} px="5px" pb={1}>
                            <TaskAttachmentCard file={file} deleteFile={deleteFile} />
                        </Grid>
                    ))
                }
            </Grid>}

        </div>
    )
}

export default TaskAttachment