import {z} from 'zod'

export const signUpSchema = z.object({
    username: z.string().min(3, {message: 'username must be atleast 3 letters long'}).max(10, {message: 'username cannot be more than 10 letters'}).trim(),
    email: z.string().email({message: 'Please enter a valid URL'}).trim(),
    password: z.string().min(8, {message: 'Password must be atleast 8 letters long'}).max(15)
              .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {message: 'Password must contain atleast one special char and one number'})
})  

export const signInSchema = z.object({
    email: z.string().email({message: 'Please enter a valid URL'}).trim(),
    password: z.string().min(8, {message: 'Password must be atleast 8 letters long'}).max(15)
              .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {message: 'Password must contain atleast one special char and one number'})
})
