import {z} from 'zod'
import axios from 'axios'

export const signUpSchema = z.object({
    username: z.string().min(3, {message: 'username must be atleast 3 letters long'}).max(10, {message: 'username cannot be more than 10 letters'}).trim(),
    email: z.string().email({message: 'Please enter a valid URL'}).trim(),
    password: z.string().min(8, {message: 'Password must be atleast 8 letters long'}).max(15)
              .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {message: 'Password must contain atleast one special char and one number'})
})  

export const signInSchema = z.object({
    email: z.string().email({message: 'Please enter a valid URL'}).trim(),
    password: z.string().min(8, {message: 'Password must be atleast 8 letters long'}).max(15, { message: 'Password cannot exceed 15 characters'})
              .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {message: 'Password must contain atleast one special char and one number'})
})

export const quizCreationSchema = z.object({
    topic: z.string().min(4, { message: 'Topic must be at least 4 characters long.'}).max(25).refine(async (topic) => {
        // try {
        //     const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${topic}`)
        //     return res.status === 200
        //  } catch(err) {
        //      return false
        //  }
        return true
    }, { message: 'Topic is not a valid word'}),
    type: z.enum(['mcq', 'open_ended']),
    amount: z.number().int({message: 'Enter a integer value'}).min(1).max(25),
    level: z.enum(['easy','medium','hard'], {message: 'Please select a difficulty first'})
})

export const checkAnswerSchema = z.object({
    questionId: z.string(),
    userAnswer: z.string()
})