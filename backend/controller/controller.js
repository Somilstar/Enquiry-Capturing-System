import { ZodError } from "zod"
import {enquirySchema} from "../helper/validator.js"
import { sheets } from "../service/googleSheet.js"
import appConfig from "../config/appConfig.js"
import dayjs from "dayjs"

const {GOOGLE_SHEET_ID} = appConfig


export const enquiryController  = (req,res)=>{
    try {
        //1
        const body = enquirySchema.parse(req.body)
        const {name, emailAddress, category, message} = body

        const currentdate = dayjs().format("DD-MM-YYYY")
        //2
        sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: 'Enquiry!A:E',
            insertDataOption: 'INSERT_ROWS',
            valueInputOption: 'RAW',
            requestBody:{
                values: [[name, emailAddress, category, message, currentdate]]
            }
        }).catch((error)=>{
            console.error(error.response.data.error)
        })
    


        res.status(201).json({
            success: true,
            message: 'Success'
        })
    } catch (error) {

        if(error instanceof ZodError){
            return res.status(422).json({
                success: false,
                message: error.errors
            })
        }

        res.sendStatus(500)
    }
}