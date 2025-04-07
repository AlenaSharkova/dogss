import postgres from 'postgres'
import breeds from "@/demoData/new_breeds.json"
import connection from "express";


export function usePostgres() {

    const POSTGRES_URL = 'postgres://postgres:AsDe159!F8.@localhost:5432/postgres'
    console.log('start', POSTGRES_URL);

    if (!POSTGRES_URL) {
        throw createError('Missing `NUXT_POSTGRES_URL` environment variable')
    }

    return postgres(POSTGRES_URL)
}