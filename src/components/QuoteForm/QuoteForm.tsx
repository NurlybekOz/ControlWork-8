import {useCallback, useEffect, useState} from "react";
import {IQuoteForm} from "../../types";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import {Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Props {
    isEdit?: boolean;
    idQuote?: string;
    onSubmitAction: (quote: IQuoteForm) => void;
}


const QuoteForm: React.FC<Props> = ({isEdit = false, onSubmitAction, idQuote}) => {
    const [form, setForm] = useState<IQuoteForm>({
        category: '',
        author: '',
        description: '',
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchOnePost = useCallback(async () => {
        if (!idQuote) return;

        try {
            setLoading(true)
            const response = await axiosApi<IQuoteForm>(`quotes/${idQuote}.json`);
            if (!response.data) {
                toast.error('Quote not found');
                navigate('/')
                return;
            }
            setForm(response.data);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }

    }, [idQuote, navigate])

    useEffect(() => {
        void fetchOnePost();
    }, [fetchOnePost])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.author || !form.description || !form.category) {
            toast.error('all fields are required');
            return;
        }
        onSubmitAction({...form})
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value})
    }
    return (
        <>
            {loading ? <Loader/> :
                <form onSubmit={onSubmit}>
                    <Typography variant='h4' sx={{flexGrow: 1, textAlign: 'center'}}>{isEdit ? 'Edit' : 'Add new quote'}</Typography>

                    <Grid container spacing={2} sx={{mx: 'auto', width: '50%', mt: 4}}>
                        <Grid size={12}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='category'
                                    value={form.category}
                                    label="Category"
                                    onChange={onInputChange}
                                >
                                    <MenuItem value='star-wars'>Star Wars</MenuItem>
                                    <MenuItem value='famous-people'>Famous People</MenuItem>
                                    <MenuItem value='saying'>Saying</MenuItem>
                                    <MenuItem value='humour'>Humour</MenuItem>
                                    <MenuItem value='motivational'>Motivational</MenuItem>
                                </Select>
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                sx={{width: '100%'}}
                                label="author"
                                name="author"
                                variant="outlined"
                                value={form.author}
                                onChange={onInputChange}
                            >

                            </TextField>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                sx={{width: '100%'}}
                                label="Description"
                                name="description"
                                variant="outlined"
                                value={form.description}
                                onChange={onInputChange}
                            >

                            </TextField>
                        </Grid>

                        <Grid size={12}>
                            <Button sx={{width: '100%'}} type='submit' variant='contained'>{isEdit ? 'Save' : 'Add'}</Button>
                        </Grid>
                    </Grid>

                </form>
            }
        </>

    );
};

export default QuoteForm;