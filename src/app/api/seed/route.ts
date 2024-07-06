import prisma from '@/lib/prisma'
import {NextResponse, NextRequest} from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

    await prisma.todo.deleteMany({});// delete all todos
    await prisma.user.deleteMany({});// delete all users

    const user = await prisma.user.create({
        data: {
            email: 'test1@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'client', 'super-user'],
            todos: {
                create: [
                    {description: 'Learn React', complete: true},
                    {description: 'Learn Next.js'},
                    {description: 'Learn Prisma'},
                    {description: 'Learn GraphQL'},
                    {description: 'Learn TypeScript'},
                ]
            
            }
        }
    });

    return NextResponse.json({message: 'Seed Executed'})
}