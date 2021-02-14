

interface UpdateUSerDTO{
    user_id: string;
    email: string;
    password?: string;
    old_password?: string;
    name: string;
}

export default UpdateUSerDTO;