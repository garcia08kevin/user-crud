export const deleteUser = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const DeleteResult = await res.json();
    console.log(DeleteResult);
    return true;
}