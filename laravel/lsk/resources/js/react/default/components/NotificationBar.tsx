import { PageDataType } from '@/types/session';
import { usePage } from '@inertiajs/react';
import { CheckCircle, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export default function NotificationBar() {
    const { session } = usePage<PageDataType>().props;

    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [showMessage, setShowMessage] = useState<boolean>(false);

    useEffect(() => {
        handleSession();
    }, [session?.flash]);

    const handleSession = useCallback(() => {
        switch (session?.flash) {
            case 'LOGIN_SUCCESS':
                setTitle('Login Success');
                setMessage('User Logged In Successfully');
                setShowMessage(true);
                break;

            case 'REGISTER_SUCCESS':
                setTitle('Register Success');
                setMessage('User Registered Successfully');
                setShowMessage(true);
                break;

            case 'LOGOUT_SUCCESS':
                setTitle('Logout Success');
                setMessage('User Logged Out');
                setShowMessage(true);
                break;

            case 'VERIFICATION_SUCCESS':
                setTitle('Verification Success');
                setMessage('Email Verified Successfully');
                setShowMessage(true);
                break;

            case 'PASSWORD_REQUEST':
                setTitle('Password Requested');
                setMessage('Password Request Email Sent');
                setShowMessage(true);
                break;

            case 'PASSWORD_RESET':
                setTitle('Password Reset');
                setMessage('Password Updated Succesfully');
                setShowMessage(true);
                break;

            default:
                setTitle('Success');
                setMessage('Success');
                break;
        }

        const a = setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    }, [session, message]);

    return (
        <div className='fixed right-0 bottom-0 w-full'>
            <div className='flex flex-col items-end p-2'>
                <div className={`w-full max-w-80 rounded border p-2 gap-2 sm:w-80 items-center ${showMessage ? 'flex' : 'hidden'}`}>
                    <CheckCircle />

                    <div className='flex flex-1 flex-col'>
                        <p className=''>{title}</p>
                        <p className='text-xs'>{message}</p>
                    </div>

                    <button
                        onClick={() => setShowMessage(false)}
                        type='button'
                        className='flex items-center justify-center p-2 rounded'
                    >
                        <Trash2 />
                    </button>
                </div>
            </div>
        </div>
    );
}
