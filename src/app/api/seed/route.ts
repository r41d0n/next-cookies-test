import prisma from '@/lib/prisma'
import {NextResponse, NextRequest} from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany({});// delete all todos

    await prisma.todo.createMany({
        data: [
            {description: 'Learn React', complete: true},
            {description: 'Learn Next.js'},
            {description: 'Learn Prisma'},
            {description: 'Learn GraphQL'},
            {description: 'Learn TypeScript'},
        ]
    });
    return NextResponse.json({message: 'Seed Executed'})
}