'use server';

import {getUserSessionServer} from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import {Todo} from "@prisma/client";
import {revalidatePath} from "next/cache";
import * as yup from 'yup';

const sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

    await sleep(3);

    const todo = await prisma.todo.findFirst({where: {id}});
    if (!todo) {
        throw `Todo ${id} not found`;
    }
    const updatedTodo = await prisma.todo.update({
        where: {id},
        data: {complete},
    });
    revalidatePath('/dashboard/server-todos');
    return updatedTodo;

};

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
});

export const addTodo = async (description: string) => {
    try {
        const user = await getUserSessionServer();
        if (!user) throw 'User not found';
        const todo = await prisma.todo.create({data: {description, userId: user?.id!}});

        revalidatePath('/dashboard/server-todos');
        return todo

    } catch (error) {
        return {
            message: 'Error creating todo',
        }
    }
};

export const deleteCompleted = async () => {
    try {

        const todos = await prisma.todo.deleteMany({where: {complete: true}});
        revalidatePath('/dashboard/server-todos');
        return todos;
    } catch (error) {
        return {
            message: 'Error deleting completed todos',
        }
    }
};