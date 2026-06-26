"use server"

import  { updateAnimalSchema } from "@lib/schemas/animals/animal";
import z from "zod";

export async function updateAnimal(ids, prevState, formData){
    const { name, description, age, file } = Object.fromEntries(formData)
    const { id, assetId, } = ids;

    //validering
    const validated = upddateAnimalSchema.safeParse({
        name, description, age, id, assetId, file

     });
     if(!validated.success){
        return {
            errors: z.flattenError(validated.error).fielsErrors,
            values: {name, description, age, file
            }
        }
        
    }
    
       
}