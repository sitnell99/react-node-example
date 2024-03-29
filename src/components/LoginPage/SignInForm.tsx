import classes from "../../css/FormClasses.module.css";
import {ReactElement, useState} from "react";
import {useMutation} from "@apollo/client";
import LogIn from "../../api/mutations/LogIn";
import {Form, Input} from 'informed';
import {useFormValidation} from "../../util/useFormValidation";
import {useUserContext} from "../../context/UserContext";
import {resultMessages} from "../../types/resultMessages";

type signInFormProps = {
    switchButton: ReactElement
}
export const SignInForm = (props: signInFormProps) => {

    const { switchButton } = props;
    const {setUser} = useUserContext();

    const [resultMessage, setResultMessage] = useState<resultMessages>(resultMessages.empty);
    const [logIn, {error: mutationError}] = useMutation(LogIn);

    const {
        validatePhone,
        validatePassword,
        passwordError,
        phoneNumberError
    } = useFormValidation();

    const handleLogIn = async formValues => {
        try {
            const response = await logIn({variables: {...formValues.values}});
            if(response.data?.logIn) {
                localStorage.setItem('token', response.data.logIn.token)
                await setUser(response.data.logIn)
            }
             setResultMessage(resultMessages.successSignIn);
        } catch (e) {
            console.log(e)
        }
    };

    if (!resultMessage) {
        return (
        <div className={classes.formContainer}>
                <h1 className={'text-xl font-bold pb-3'}>Sign In</h1>
                <Form onSubmit={handleLogIn}>
                    <div className={classes.formItem}>
                        <Input
                            type="text"
                            name="phone"
                            placeholder='Phone number'
                            required
                            formatter="+380 (##) ## ## ###"
                            onChange={(value) => validatePhone(value.value)}
                        />
                        {phoneNumberError && <small>{'Incorrect Phone Number'}</small>}
                    </div>
                    <div className={classes.formItem}>
                        <Input
                            type="password"
                            name="password"
                            placeholder='Password'
                            required
                            onChange={(value) => validatePassword(value.value)}
                        />
                        {passwordError && <small>{'A password must contain at least 3 of the following: lowercase, uppercase, digits, special characters.'}</small>}
                    </div>
                    <div className={classes.formItem}>
                         {mutationError && <small>{mutationError.message}</small>}
                    </div>
                    <div className={`${classes.formItem} ${classes.formButton}`}>
                        <button className={classes.blackBtn} type="submit">Continue</button>
                        {switchButton}
                    </div>
                </Form>
            </div>
    )} else return <h1>{resultMessage}</h1>
}

export default SignInForm;
