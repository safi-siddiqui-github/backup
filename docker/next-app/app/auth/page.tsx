import { RegisterUser } from "@/actions/authActions";
import Form from 'next/form'

export default function Page() {

    return (
        <div className="p-6 flex flex-col gap-2">

            <div className="flex flex-col gap-2">
            
                <h2 className="text-xl">Register User</h2>

                <Form action={RegisterUser} className="flex flex-col gap-2 w-96">
                    
                    <input type="text" className=" rounded border px-2 py-1" name="firstname" defaultValue="safi" />

                    <button className="rounded bg-slate-100 px-2 py-1 cursor-pointer" type="submit">Register</button>
                    
                </Form>
            </div>


        </div>
    )
}