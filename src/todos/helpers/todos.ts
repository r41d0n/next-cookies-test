import {Todo} from "@prisma/client";


export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
    const body = {complete};
    const todo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json());
    console.log({todo});

    return todo;
}
export const createTodo = async (description: string): Promise<Todo> => {
    const body = {description};
    const todo = await fetch(`/api/todos`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json());
    console.log({todo});

    return todo;
}

export const deleteCompleted = async (): Promise<void> => {
    await fetch(`/api/todos`, {
        method: 'delete',
    });
}